import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Common/Navbar';
import QuizList from '../components/Quiz/QuizList';
import QuizTaker from '../components/Quiz/QuizTaker';
import QuizResultModal from '../components/Quiz/QuizResultModal';
import GameSessionCard from '../components/Games/GameSessionCard';
import DualLeaderboard from '../components/Leaderboard/DualLeaderboard';
import BadgeDisplay from '../components/Badges/BadgeDisplay';
import quizService from '../services/quizService';
import gameService from '../services/gameService';
import leaderboardService from '../services/leaderboardService';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const storedUser = user || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const [activeTab, setActiveTab] = useState('quizzes'); // 'quizzes' | 'games' | 'leaderboards' | 'badges' | 'history'

  // Quizzes state
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Games state
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [signedUpGameIds, setSignedUpGameIds] = useState(new Set());
  const [gameActionLoading, setGameActionLoading] = useState(false);

  // Badge summary state
  const [badgeSummary, setBadgeSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  // Quiz history state
  const [quizHistory, setQuizHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Notification alert
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const notify = (msg, duration = 4000) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), duration);
  };

  const loadAllData = async () => {
    fetchQuizzes();
    fetchGames();
    fetchBadgeSummary();
  };

  const fetchQuizzes = async () => {
    setQuizzesLoading(true);
    try {
      const res = await quizService.getAllQuizzes();
      setQuizzes(res.data || []);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    } finally {
      setQuizzesLoading(false);
    }
  };

  const fetchGames = async () => {
    setGamesLoading(true);
    try {
      const res = await gameService.getUpcomingGames();
      setGames(res.data || []);
    } catch (err) {
      console.error('Error fetching game sessions:', err);
    } finally {
      setGamesLoading(false);
    }
  };

  const fetchBadgeSummary = async () => {
    setSummaryLoading(true);
    try {
      const res = await leaderboardService.getMyBadgeSummary();
      setBadgeSummary(res);
    } catch (err) {
      console.error('Error fetching badge summary:', err);
    } finally {
      setSummaryLoading(false);
    }
  };

  const fetchQuizHistory = async () => {
    setHistoryLoading(true);
    try {
      // Use the leaderboard/my attempts endpoint or quiz history endpoint
      const res = await quizService.getMyAttempts ? await quizService.getMyAttempts() : { data: [] };
      setQuizHistory(res.data || []);
    } catch (err) {
      console.error('Error fetching quiz history:', err);
      setQuizHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'history' && quizHistory.length === 0) {
      fetchQuizHistory();
    }
  };

  // Start Quiz flow
  const handleStartQuiz = async (quizId) => {
    try {
      const res = await quizService.startQuiz(quizId);
      setActiveQuiz(res.data.quiz);
    } catch (err) {
      alert('Failed to load quiz: ' + err.message);
    }
  };

  // Submit Quiz flow
  const handleSubmitQuiz = async (answers) => {
    if (!activeQuiz) return;
    setQuizSubmitting(true);
    try {
      const res = await quizService.submitQuiz(activeQuiz.quizId, answers);
      setQuizResult(res.data);
      setActiveQuiz(null);
      // Refresh badge summary to reflect new scores and unlocked badges
      fetchBadgeSummary();
    } catch (err) {
      alert('Error submitting quiz: ' + err.message);
    } finally {
      setQuizSubmitting(false);
    }
  };

  // Sign up for community game session
  const handleSignUpForGame = async (sessionId) => {
    setGameActionLoading(true);
    try {
      await gameService.signUpForGame(sessionId);
      setSignedUpGameIds((prev) => new Set([...prev, sessionId]));
      notify('🎉 Successfully signed up for the match session!');
      fetchGames();
    } catch (err) {
      alert(err.message || 'Could not sign up for game session');
    } finally {
      setGameActionLoading(false);
    }
  };

  // Cancel game signup
  const handleCancelSignUp = async (sessionId) => {
    if (!window.confirm('Are you sure you want to cancel your sign-up for this game?')) return;
    setGameActionLoading(true);
    try {
      await gameService.cancelSignUp(sessionId);
      setSignedUpGameIds((prev) => {
        const updated = new Set(prev);
        updated.delete(sessionId);
        return updated;
      });
      notify('↩️ Sign-up cancelled. Your slot is now available to others.');
      fetchGames();
    } catch (err) {
      alert(err.message || 'Could not cancel sign-up');
    } finally {
      setGameActionLoading(false);
    }
  };

  const getScoreBadgeClass = (percentage) => {
    if (percentage >= 80) return 'high';
    if (percentage >= 50) return 'mid';
    return 'low';
  };

  return (
    <div className="student-dashboard-page">
      <Navbar />

      <main className="container page-container">
        {notification && (
          <div className="alert alert-success mb-3 flex-between">
            <span>{notification}</span>
            <button onClick={() => setNotification('')} className="btn-close">✕</button>
          </div>
        )}

        {/* Hero Banner with Student Dual Stats */}
        <div className="card hero-banner mb-4">
          <div className="hero-content flex-between">
            <div>
              <div className="badge-welcome">⚔️ Arena Combatant</div>
              <h1 className="hero-title mt-1">
                Welcome back, {storedUser?.name || 'Scholar'}!
              </h1>
              <p className="hero-subtitle text-muted mt-1">
                Take course quizzes to climb the Academic Honor Roll, or join physical strategy games to conquer the Community Leaderboard.
              </p>
            </div>

            <div className="quick-stats-strip flex" style={{ gap: '1rem' }}>
              <div className="stat-pill academic">
                <span className="pill-icon">🎓</span>
                <div>
                  <div className="pill-label">Academic Rank</div>
                  <div className="pill-val">
                    #{badgeSummary?.academicRank || '-'} ({badgeSummary?.totalAcademicPoints || 0} pts)
                  </div>
                </div>
              </div>

              <div className="stat-pill gaming">
                <span className="pill-icon">🎲</span>
                <div>
                  <div className="pill-label">Gaming Rank</div>
                  <div className="pill-val">
                    #{badgeSummary?.communityGameRank || '-'} ({badgeSummary?.totalGamePoints || 0} pts)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quiz Runner or Dashboard Tabs */}
        {activeQuiz ? (
          <QuizTaker
            quiz={activeQuiz}
            onSubmit={handleSubmitQuiz}
            onCancel={() => setActiveQuiz(null)}
            submitting={quizSubmitting}
          />
        ) : (
          <>
            {/* Dashboard Tabs navigation */}
            <div className="dashboard-nav-tabs mb-4">
              <button
                className={`dash-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
                onClick={() => handleTabChange('quizzes')}
              >
                📚 Educational Quizzes ({quizzes.length})
              </button>
              <button
                className={`dash-tab-btn ${activeTab === 'games' ? 'active' : ''}`}
                onClick={() => handleTabChange('games')}
              >
                🎲 Community Games ({games.length})
              </button>
              <button
                className={`dash-tab-btn ${activeTab === 'leaderboards' ? 'active' : ''}`}
                onClick={() => handleTabChange('leaderboards')}
              >
                📊 Dual Leaderboards
              </button>
              <button
                className={`dash-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => handleTabChange('history')}
              >
                📋 Quiz History
              </button>
              <button
                className={`dash-tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
                onClick={() => handleTabChange('badges')}
              >
                🏅 My Badges & Dual Rank
              </button>
            </div>

            {/* Tab 1: Educational Quizzes */}
            {activeTab === 'quizzes' && (
              <section className="quizzes-section">
                <div className="section-header flex-between mb-3">
                  <div>
                    <h2>Academic Course Quizzes</h2>
                    <p className="text-muted">
                      Select your course, take timed multiple-choice challenges, and test your knowledge.
                    </p>
                  </div>
                </div>
                <QuizList
                  quizzes={quizzes}
                  onSelectQuiz={handleStartQuiz}
                  loading={quizzesLoading}
                />
              </section>
            )}

            {/* Tab 2: Community Games */}
            {activeTab === 'games' && (
              <section className="games-section">
                <div className="section-header flex-between mb-3">
                  <div>
                    <h2>Campus Gatherings & Team Games</h2>
                    <p className="text-muted">
                      Physical campus battles (Mafia, Werewolf, IRL Among Us) digitally coordinated by Lordes.
                    </p>
                  </div>
                </div>

                {gamesLoading ? (
                  <div className="card text-center" style={{ padding: '3rem' }}>
                    <div className="loading"></div>
                    <p className="mt-2 text-muted">Loading upcoming game sessions...</p>
                  </div>
                ) : games.length === 0 ? (
                  <div className="card text-center" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎲</div>
                    <h3>No Sessions Currently Scheduled</h3>
                    <p className="text-muted mt-1">
                      Campus Lordes will post new sessions soon. Check back before weekends!
                    </p>
                  </div>
                ) : (
                  <div className="games-grid grid-3">
                    {games.map((session) => (
                      <GameSessionCard
                        key={session.gameSessionId}
                        session={session}
                        isSignedUp={signedUpGameIds.has(session.gameSessionId)}
                        onSignUp={handleSignUpForGame}
                        onCancelSignUp={handleCancelSignUp}
                        isLorde={false}
                        loading={gameActionLoading}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Tab 3: Dual Leaderboards */}
            {activeTab === 'leaderboards' && (
              <section className="leaderboards-section">
                <DualLeaderboard />
              </section>
            )}

            {/* Tab 4: Quiz History */}
            {activeTab === 'history' && (
              <section className="history-section">
                <div className="section-header mb-3">
                  <h2>My Quiz Attempt History</h2>
                  <p className="text-muted">
                    Track all your past quiz attempts and see your progress over time.
                  </p>
                </div>

                {historyLoading ? (
                  <div className="card text-center" style={{ padding: '3rem' }}>
                    <div className="loading"></div>
                    <p className="mt-2 text-muted">Loading your quiz history...</p>
                  </div>
                ) : quizHistory.length === 0 ? (
                  <div className="card text-center" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                    <h3>No Quiz Attempts Yet</h3>
                    <p className="text-muted mt-1 mb-3">
                      Take your first quiz to start tracking your academic progress!
                    </p>
                    <button
                      onClick={() => handleTabChange('quizzes')}
                      className="btn-primary"
                    >
                      Browse Quizzes 📚
                    </button>
                  </div>
                ) : (
                  <div className="card">
                    {quizHistory.map((attempt, idx) => {
                      const pct = Number(attempt.percentage || 0);
                      const badgeClass = getScoreBadgeClass(pct);
                      return (
                        <div key={attempt.attemptId || idx} className="attempt-row">
                          <div>
                            <div className="attempt-quiz-title">
                              {attempt.quizTitle || `Quiz #${attempt.quizId}`}
                            </div>
                            <div className="attempt-meta">
                              {attempt.courseName && (
                                <span className="tag-course" style={{ marginRight: '0.5rem' }}>
                                  {attempt.courseName}
                                </span>
                              )}
                              {attempt.submittedAt
                                ? new Date(attempt.submittedAt).toLocaleDateString(undefined, {
                                    month: 'short', day: 'numeric', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                  })
                                : ''}
                            </div>
                          </div>
                          <div className={`score-badge ${badgeClass}`}>
                            {attempt.score}/{attempt.totalQuestions} · {pct.toFixed(0)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Tab 5: My Badges & Profile */}
            {activeTab === 'badges' && (
              <section className="badges-section">
                <div className="section-header mb-3">
                  <h2>Personal Dual-Track Progression</h2>
                  <p className="text-muted">
                    Compare your achievements in Studies vs Community Social Gaming.
                  </p>
                </div>
                <BadgeDisplay summary={badgeSummary} loading={summaryLoading} />
              </section>
            )}
          </>
        )}

        {/* Quiz Result Modal */}
        {quizResult && (
          <QuizResultModal
            result={quizResult}
            onClose={() => setQuizResult(null)}
            onViewLeaderboard={() => {
              setQuizResult(null);
              setActiveTab('leaderboards');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
