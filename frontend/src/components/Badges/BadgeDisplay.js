import React from 'react';

const BadgeDisplay = ({ summary, loading }) => {
  if (loading) {
    return (
      <div className="card text-center" style={{ padding: '2rem' }}>
        <div className="loading"></div>
        <p className="mt-2 text-muted">Loading your battle ranks and badges...</p>
      </div>
    );
  }

  const academicRank = summary?.academicRank || '-';
  const academicPoints = summary?.totalAcademicPoints || 0;
  const academicBadges = summary?.totalAcademicBadges || 0;
  const academicTier = summary?.academicTierTitle || 'Academic Novice';

  const gameRank = summary?.communityGameRank || '-';
  const gamePoints = summary?.totalGamePoints || 0;
  const gameBadges = summary?.totalGameBadges || 0;
  const gameTier = summary?.gameTierTitle || 'Game Initiate';

  return (
    <div className="dual-track-profile-wrapper">
      <div className="grid-2">
        {/* Academic Studies Track Card */}
        <div className="track-card card academic-track">
          <div className="track-header flex-between">
            <div className="flex-center" style={{ gap: '0.75rem' }}>
              <div className="track-avatar">🎓</div>
              <div>
                <h3 className="track-title">Studies & Academic Track</h3>
                <span className="tier-label academic">{academicTier}</span>
              </div>
            </div>
            <div className="rank-circle">
              <span className="rank-hash">#</span>
              <span className="rank-value">{academicRank}</span>
            </div>
          </div>

          <div className="track-stats-grid grid-2 mt-3">
            <div className="stat-box">
              <div className="stat-label">Academic Points</div>
              <div className="stat-number">⭐ {academicPoints}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Badges Collected</div>
              <div className="stat-number">🏅 {academicBadges}</div>
            </div>
          </div>

          <div className="track-perks mt-3">
            <div className="perk-item">✓ Earn points by scoring high on timed course quizzes</div>
            <div className="perk-item">✓ Unlock Dean's List and Subject Scholar achievements</div>
          </div>
        </div>

        {/* Community Games Track Card */}
        <div className="track-card card community-track">
          <div className="track-header flex-between">
            <div className="flex-center" style={{ gap: '0.75rem' }}>
              <div className="track-avatar">🎲</div>
              <div>
                <h3 className="track-title">Community Games Track</h3>
                <span className="tier-label gaming">{gameTier}</span>
              </div>
            </div>
            <div className="rank-circle gaming">
              <span className="rank-hash">#</span>
              <span className="rank-value">{gameRank}</span>
            </div>
          </div>

          <div className="track-stats-grid grid-2 mt-3">
            <div className="stat-box">
              <div className="stat-label">Gaming Points</div>
              <div className="stat-number">⚔️ {gamePoints}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Badges Collected</div>
              <div className="stat-number">🏆 {gameBadges}</div>
            </div>
          </div>

          <div className="track-perks mt-3">
            <div className="perk-item">✓ Earn role-weighted points in Mafia, Werewolf & Among Us</div>
            <div className="perk-item">✓ Compete in campus gatherings and physical team battles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDisplay;
