import React from 'react';

const GameSessionCard = ({
  session,
  isSignedUp,
  onSignUp,
  onCancelSignUp,
  isLorde,
  onStartGame,
  onEndGame,
  onRecordResults,
  onManageParticipants,
  loading,
}) => {
  const currentCount = session.currentParticipantsCount || 0;
  const maxCount = session.maxParticipants || 10;
  const isFull = currentCount >= maxCount;
  const status = session.status || 'WAITING';

  // Format date and time
  const formattedDate = session.scheduledDate
    ? new Date(session.scheduledDate).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : 'Upcoming';

  const formattedTime = session.scheduledTime ? session.scheduledTime.substring(0, 5) : '';

  const getStatusClass = (s) => {
    if (!s) return 'waiting';
    return s.toLowerCase().replace(/ /g, '_');
  };

  return (
    <div className="game-card card">
      <div className="game-card-badge-row flex-between">
        <span className="game-type-pill">
          🎲 {session.gameTypeName || 'Community Game'}
        </span>
        <span className={`status-pill ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>

      <h3 className="game-card-title mt-2">{session.title}</h3>
      <p className="game-card-desc">
        {session.description || 'Join your fellow students for real-world strategy, social deduction, and leaderboard glory.'}
      </p>

      <div className="game-card-details">
        <div className="detail-item">
          <span className="detail-icon">📅</span>
          <span>{formattedDate} {formattedTime ? `at ${formattedTime}` : ''}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span>{session.location || 'Campus Quad'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">👑</span>
          <span>Host: {session.lordeName || 'Campus Lorde'}</span>
        </div>
      </div>

      {/* Participants Capacity Bar */}
      <div className="capacity-section mt-3">
        <div className="capacity-labels flex-between mb-1">
          <span className="text-muted">Spots Claimed</span>
          <span className="capacity-count">
            {currentCount} / {maxCount} players
          </span>
        </div>
        <div className="capacity-track">
          <div
            className={`capacity-fill ${isFull ? 'full' : ''}`}
            style={{ width: `${Math.min(100, (currentCount / maxCount) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Actions — Lorde view */}
      {isLorde ? (
        <div className="lorde-game-actions mt-3">
          <button
            onClick={() => onManageParticipants && onManageParticipants(session)}
            className="btn-secondary mb-1"
            style={{ width: '100%' }}
          >
            👥 Register & Shuffle Roles ({currentCount})
          </button>
          {status === 'WAITING' || status === 'SCHEDULED' ? (
            <button
              onClick={() => onStartGame && onStartGame(session.gameSessionId)}
              className="btn-start-game"
              disabled={loading || currentCount === 0}
              style={{ width: '100%' }}
            >
              ▶ Start Game Session
            </button>
          ) : status === 'IN_PROGRESS' || status === 'IN PROGRESS' ? (
            <>
              <button
                onClick={() => onEndGame && onEndGame(session.gameSessionId)}
                className="btn-end-game"
                disabled={loading}
                style={{ width: '100%' }}
              >
                ⏹ End Game Session
              </button>
              <button
                onClick={() => onRecordResults(session)}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                Record Match Results 📝
              </button>
            </>
          ) : status === 'COMPLETED' ? (
            <button
              onClick={() => onRecordResults(session)}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              View / Edit Results 📋
            </button>
          ) : null}
        </div>
      ) : (
        /* Student view */
        <div className="game-card-actions mt-3">
          {status === 'COMPLETED' ? (
            <button className="btn-signed-up" disabled style={{ width: '100%' }}>
              Match Finished
            </button>
          ) : isSignedUp ? (
            <div className="lorde-game-actions">
              <button className="btn-signed-up" disabled style={{ width: '100%' }}>
                ✓ Signed Up & Ready
              </button>
              {(status === 'WAITING' || status === 'SCHEDULED') && onCancelSignUp && (
                <button
                  onClick={() => onCancelSignUp(session.gameSessionId)}
                  className="btn-cancel-signup"
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  Cancel Sign-Up
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => onSignUp(session.gameSessionId)}
              className="btn-primary"
              disabled={isFull || loading || status === 'IN_PROGRESS' || status === 'IN PROGRESS'}
              style={{ width: '100%' }}
            >
              {isFull
                ? 'Session Full'
                : status === 'IN_PROGRESS' || status === 'IN PROGRESS'
                ? 'Game In Progress'
                : 'Join Game Session 🎟️'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GameSessionCard;
