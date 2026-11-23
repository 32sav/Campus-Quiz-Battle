import React, { useState, useEffect } from 'react';
import leaderboardService from '../../services/leaderboardService';

const DualLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' | 'community' | 'badges'
  const [academicData, setAcademicData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [academicBadges, setAcademicBadges] = useState([]);
  const [communityBadges, setCommunityBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const [edu, games, eduBadges, gameBadges] = await Promise.allSettled([
        leaderboardService.getEducationLeaderboard(25),
        leaderboardService.getCommunityGamesLeaderboard(25),
        leaderboardService.getAcademicBadges(20),
        leaderboardService.getCommunityBadges(20),
      ]);

      if (edu.status === 'fulfilled') setAcademicData(edu.value || []);
      if (games.status === 'fulfilled') setCommunityData(games.value || []);
      if (eduBadges.status === 'fulfilled') setAcademicBadges(eduBadges.value || []);
      if (gameBadges.status === 'fulfilled') setCommunityBadges(gameBadges.value || []);
    } catch (err) {
      console.error('Error fetching leaderboards:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="rank-badge gold">🥇</span>;
    if (rank === 2) return <span className="rank-badge silver">🥈</span>;
    if (rank === 3) return <span className="rank-badge bronze">🥉</span>;
    return <span className="rank-badge default">{rank}</span>;
  };

  return (
    <div className="leaderboard-wrapper card">
      <div className="leaderboard-header-row flex-between mb-3">
        <div>
          <h2>Campus Honor Roll & Standings</h2>
          <p className="text-muted">
            Track top academic scholars and tactical gaming champions across campus.
          </p>
        </div>
        <button onClick={fetchLeaderboardData} className="btn-outline btn-refresh">
          🔄 Refresh Standings
        </button>
      </div>

      {/* Tabs */}
      <div className="leaderboard-tabs mb-4">
        <button
          className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          🎓 Academic Quiz Rank
        </button>
        <button
          className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          🎲 Community Games Rank
        </button>
        <button
          className={`tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          🏅 Badge Hall of Fame
        </button>
      </div>

      {loading ? (
        <div className="text-center" style={{ padding: '3rem' }}>
          <div className="loading"></div>
          <p className="mt-2 text-muted">Calculating rankings...</p>
        </div>
      ) : activeTab === 'academic' ? (
        <div className="table-responsive">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Student</th>
                <th>Quizzes Taken</th>
                <th>Avg Accuracy</th>
                <th>Total Academic XP</th>
              </tr>
            </thead>
            <tbody>
              {academicData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No academic quiz scores recorded yet. Be the first to take a quiz!
                  </td>
                </tr>
              ) : (
                academicData.map((item, index) => {
                  const rank = item.rank || index + 1;
                  return (
                    <tr key={item.userId || index} className={rank <= 3 ? 'top-tier-row' : ''}>
                      <td>{getRankBadge(rank)}</td>
                      <td>
                        <span className="player-name">{item.name || `Student #${item.userId}`}</span>
                      </td>
                      <td>{item.totalAttempts || item.quizzesTaken || 1}</td>
                      <td>
                        <span className="accuracy-pill">
                          {Number(item.averageScore || item.averagePercentage || 0).toFixed(0)}%
                        </span>
                      </td>
                      <td>
                        <span className="points-pill academic">
                          ⭐ {item.totalPoints || item.score || 0} pts
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : activeTab === 'community' ? (
        <div className="table-responsive">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Player</th>
                <th>Games Played</th>
                <th>Wins</th>
                <th>Win Rate</th>
                <th>Gaming Points</th>
              </tr>
            </thead>
            <tbody>
              {communityData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No community match results recorded yet. Join upcoming game sessions!
                  </td>
                </tr>
              ) : (
                communityData.map((item, index) => {
                  const rank = item.rank || index + 1;
                  const gamesPlayed = item.gamesPlayed || item.totalGames || 0;
                  const gamesWon = item.gamesWon || item.wins || 0;
                  const winRate =
                    gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(0) : 0;

                  return (
                    <tr key={item.userId || index} className={rank <= 3 ? 'top-tier-row' : ''}>
                      <td>{getRankBadge(rank)}</td>
                      <td>
                        <span className="player-name">{item.name || `Player #${item.userId}`}</span>
                      </td>
                      <td>{gamesPlayed}</td>
                      <td>{gamesWon}</td>
                      <td>
                        <span className="winrate-pill">{winRate}%</span>
                      </td>
                      <td>
                        <span className="points-pill gaming">
                          ⚔️ {item.totalPoints || item.gamePoints || 0} pts
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Badges Showcase Tab */
        <div className="badge-hall-grid grid-2">
          <div className="badge-hall-card card" style={{ background: '#f8fafc' }}>
            <h3>📜 Top Academic Badge Scholars</h3>
            <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
              Students with highest academic milestones in coursework and quizzes.
            </p>
            {academicBadges.length === 0 ? (
              <p className="text-muted">No academic badges recorded yet.</p>
            ) : (
              <div className="badge-rank-list">
                {academicBadges.slice(0, 10).map((b, i) => (
                  <div key={i} className="badge-rank-item flex-between">
                    <div className="flex-center" style={{ gap: '0.75rem' }}>
                      <span className="rank-num">#{i + 1}</span>
                      <span className="badge-item-name">{b.name || b.userName}</span>
                    </div>
                    <span className="badge-count-pill">
                      🏅 {b.badgeCount || b.totalBadges || 1} badges
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="badge-hall-card card" style={{ background: '#f8fafc' }}>
            <h3>🐺 Top Gaming Badges Masters</h3>
            <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
              Players with legendary Mafia, Werewolf & Impostor triumphs.
            </p>
            {communityBadges.length === 0 ? (
              <p className="text-muted">No gaming badges recorded yet.</p>
            ) : (
              <div className="badge-rank-list">
                {communityBadges.slice(0, 10).map((b, i) => (
                  <div key={i} className="badge-rank-item flex-between">
                    <div className="flex-center" style={{ gap: '0.75rem' }}>
                      <span className="rank-num">#{i + 1}</span>
                      <span className="badge-item-name">{b.name || b.userName}</span>
                    </div>
                    <span className="badge-count-pill gaming">
                      🏆 {b.badgeCount || b.totalBadges || 1} badges
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DualLeaderboard;
