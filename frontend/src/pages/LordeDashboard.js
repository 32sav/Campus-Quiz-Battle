import React, { useState, useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import GameSessionCard from '../components/Games/GameSessionCard';
import CreateGameModal from '../components/Games/CreateGameModal';
import RecordResultsModal from '../components/Games/RecordResultsModal';
import ManageParticipantsModal from '../components/Games/ManageParticipantsModal';
import DualLeaderboard from '../components/Leaderboard/DualLeaderboard';
import gameService from '../services/gameService';
import adminService from '../services/adminService';

const LordeDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);

  const [activeSessionForResults, setActiveSessionForResults] = useState(null);
  const [resultsSubmitting, setResultsSubmitting] = useState(false);

  // Manage participants modal state
  const [activeSessionForParticipants, setActiveSessionForParticipants] = useState(null);

  // Available students list for results roster
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchSessions();
    fetchUsersList();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await gameService.getUpcomingGames();
      setSessions(res.data || []);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      const res = await adminService.getUsers();
      setUsers(res || []);
    } catch {
      // In case Lorde doesn't have full admin user permission
      setUsers([]);
    }
  };

  const notify = (msg, duration = 4000) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), duration);
  };

  // Handle Lorde Registering a Participant
  const handleRegisterParticipant = (sessionId, participantData) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.gameSessionId === sessionId) {
          const parts = s.participants || [];
          const newPart = {
            id: parts.length > 0 ? Math.max(...parts.map((p) => p.id || 0)) + 1 : 1,
            name: participantData.name,
            email: participantData.email,
            role: null,
          };
          const updatedParts = [...parts, newPart];
          return {
            ...s,
            participants: updatedParts,
            currentParticipantsCount: updatedParts.length,
          };
        }
        return s;
      })
    );

    setActiveSessionForParticipants((prev) => {
      if (!prev || prev.gameSessionId !== sessionId) return prev;
      const parts = prev.participants || [];
      const updatedParts = [
        ...parts,
        {
          id: parts.length > 0 ? Math.max(...parts.map((p) => p.id || 0)) + 1 : 1,
          name: participantData.name,
          email: participantData.email,
          role: null,
        },
      ];
      return {
        ...prev,
        participants: updatedParts,
        currentParticipantsCount: updatedParts.length,
      };
    });

    notify(`👤 Registered ${participantData.name} for this session!`);
  };

  // Handle Lorde Removing a Participant
  const handleRemoveParticipant = (sessionId, partId) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.gameSessionId === sessionId) {
          const updatedParts = (s.participants || []).filter((p) => p.id !== partId);
          return {
            ...s,
            participants: updatedParts,
            currentParticipantsCount: updatedParts.length,
          };
        }
        return s;
      })
    );

    setActiveSessionForParticipants((prev) => {
      if (!prev || prev.gameSessionId !== sessionId) return prev;
      const updatedParts = (prev.participants || []).filter((p) => p.id !== partId);
      return {
        ...prev,
        participants: updatedParts,
        currentParticipantsCount: updatedParts.length,
      };
    });
  };

  // Handle Lorde Pressing Shuffle Button
  const handleShuffleRoles = (sessionId) => {
    const session = sessions.find((s) => s.gameSessionId === sessionId);
    const parts = (session && session.participants) || [];
    const total = parts.length;
    if (total < 5) {
      alert('At least 5 participants are needed to distribute Mafia roles.');
      return;
    }

    // Role calculations based on user specifications:
    // Imposters (2 to 5), Chief (1), Doctor (scales), Villagers (majority)
    let imposterCount = 2;
    let doctorCount = 1;
    let chiefCount = 1;

    if (total <= 7) {
      imposterCount = 2;
    } else if (total <= 11) {
      imposterCount = 2;
    } else if (total <= 14) {
      imposterCount = 3;
    } else if (total <= 18) {
      imposterCount = 4;
      doctorCount = 2;
    } else {
      imposterCount = 5;
      doctorCount = 2;
    }
    const villagerCount = Math.max(1, total - (imposterCount + chiefCount + doctorCount));

    const pool = [];
    for (let i = 0; i < imposterCount; i++) pool.push('Imposter');
    for (let i = 0; i < chiefCount; i++) pool.push('The Chief');
    for (let i = 0; i < doctorCount; i++) pool.push('Doctor');
    for (let i = 0; i < villagerCount; i++) pool.push('Villager');

    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const updatedParts = parts.map((p, idx) => ({
      ...p,
      role: pool[idx] || 'Villager',
    }));

    setSessions((prev) =>
      prev.map((s) => {
        if (s.gameSessionId === sessionId) {
          return {
            ...s,
            participants: updatedParts,
            rolesAssigned: true,
          };
        }
        return s;
      })
    );

    setActiveSessionForParticipants((prev) => {
      if (!prev || prev.gameSessionId !== sessionId) return prev;
      return {
        ...prev,
        participants: updatedParts,
        rolesAssigned: true,
      };
    });

    notify('🔀 Roles automatically shuffled and distributed to all participants!');
  };

  // Handle Game Creation
  const handleCreateGame = async (gameData) => {
    setCreateSubmitting(true);
    try {
      await gameService.createGameSession(gameData);
      setIsCreateModalOpen(false);
      notify('🎲 Game session successfully published for campus students!');
      fetchSessions();
    } catch (err) {
      alert('Error creating game session: ' + err.message);
    } finally {
      setCreateSubmitting(false);
    }
  };

  // Handle Starting a Game Session
  const handleStartGame = async (sessionId) => {
    if (!window.confirm('Start this game session? Roles will be randomly assigned to all signed-up participants.')) return;
    try {
      await gameService.startGameSession(sessionId);
      notify('▶ Game session started! Roles assigned to all participants.');
      fetchSessions();
    } catch (err) {
      alert('Error starting game: ' + err.message);
    }
  };

  // Handle Ending a Game Session
  const handleEndGame = async (sessionId) => {
    if (!window.confirm('End this game session? You will then be able to record results.')) return;
    try {
      await gameService.endGameSession(sessionId);
      notify('⏹ Game session ended. Please record the final match results.');
      fetchSessions();
    } catch (err) {
      alert('Error ending game: ' + err.message);
    }
  };

  // Handle Recording Results
  const handleCommitResults = async (sessionId, resultsPayload) => {
    setResultsSubmitting(true);
    try {
      await gameService.recordGameResults(sessionId, resultsPayload);
      setActiveSessionForResults(null);
      notify('🏆 Match results recorded! Points and gaming badges awarded.');
      fetchSessions();
    } catch (err) {
      alert('Error recording game results: ' + err.message);
    } finally {
      setResultsSubmitting(false);
    }
  };

  return (
    <div className="lorde-dashboard-page">
      <Navbar />

      <main className="container page-container">
        {notification && (
          <div className="alert alert-success mb-3 flex-between">
            <span>{notification}</span>
            <button onClick={() => setNotification('')} className="btn-close">✕</button>
          </div>
        )}

        {/* Lorde Hero Banner */}
        <div className="card hero-banner lorde-banner mb-4">
          <div className="flex-between">
            <div>
              <div className="badge-welcome">👑 Lorde Headquarters</div>
              <h1 className="hero-title mt-1">Game Master Chamber</h1>
              <p className="hero-subtitle text-muted mt-1">
                Organize campus gatherings, schedule physical team games, and record match outcomes with role points.
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary btn-lg"
            >
              + Host New Game Session 🎲
            </button>
          </div>
        </div>

        {/* Active Game Sessions Management */}
        <section className="lorde-sessions-section mb-4">
          <div className="flex-between mb-3">
            <div>
              <h2>Managed Game Sessions ({sessions.length})</h2>
              <p className="text-muted">
                Track RSVP capacity, start/end sessions, and commit match results.
              </p>
            </div>
            <button onClick={fetchSessions} className="btn-outline">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <div className="loading"></div>
              <p className="mt-2 text-muted">Loading your managed game sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
              <h3>No Sessions Created Yet</h3>
              <p className="text-muted mt-1 mb-3">
                As a Lorde, you can create physical campus gatherings for Mafia, Werewolf, and Among Us.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-primary"
              >
                Create Your First Session ⚔️
              </button>
            </div>
          ) : (
            <div className="games-grid grid-3">
              {sessions.map((session) => (
                <GameSessionCard
                  key={session.gameSessionId}
                  session={session}
                  isSignedUp={false}
                  onSignUp={() => {}}
                  isLorde={true}
                  onStartGame={handleStartGame}
                  onEndGame={handleEndGame}
                  onRecordResults={(s) => setActiveSessionForResults(s)}
                  onManageParticipants={(s) => setActiveSessionForParticipants(s)}
                  loading={false}
                />
              ))}
            </div>
          )}
        </section>

        {/* Standings preview */}
        <section className="lorde-standings-section mt-4">
          <DualLeaderboard />
        </section>

        {/* Create Game Modal */}
        <CreateGameModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGame}
          submitting={createSubmitting}
        />

        {/* Manage Participants & Shuffle Roles Modal */}
        <ManageParticipantsModal
          isOpen={!!activeSessionForParticipants}
          onClose={() => setActiveSessionForParticipants(null)}
          session={activeSessionForParticipants}
          onRegisterParticipant={handleRegisterParticipant}
          onShuffleRoles={handleShuffleRoles}
          onRemoveParticipant={handleRemoveParticipant}
        />

        {/* Record Results Modal */}
        <RecordResultsModal
          session={activeSessionForResults}
          isOpen={!!activeSessionForResults}
          onClose={() => setActiveSessionForResults(null)}
          onSubmit={handleCommitResults}
          submitting={resultsSubmitting}
          availableUsers={users}
        />
      </main>
    </div>
  );
};

export default LordeDashboard;
