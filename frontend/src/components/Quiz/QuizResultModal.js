import React from 'react';

const QuizResultModal = ({ result, onClose, onViewLeaderboard }) => {
  if (!result) return null;

  const percentage = Number(result.percentage || 0);
  const isHighScorer = percentage >= 80;
  const isPassing = percentage >= 50;

  return (
    <div className="modal-backdrop">
      <div className="modal-content card result-card">
        <div className="result-header text-center">
          <div className="result-trophy">
            {isHighScorer ? '🏆' : isPassing ? '🎖️' : '📝'}
          </div>
          <h2>Quiz Completed!</h2>
          <p className="text-muted">{result.quizTitle}</p>
        </div>

        <div className="result-score-box text-center mt-3">
          <div className="score-number">
            {result.score} / {result.totalQuestions}
          </div>
          <div className={`percentage-pill ${isHighScorer ? 'high' : isPassing ? 'pass' : 'low'}`}>
            {percentage.toFixed(1)}% Accuracy
          </div>
        </div>

        {/* Newly earned badges section */}
        {result.newlyEarnedBadges && result.newlyEarnedBadges.length > 0 && (
          <div className="new-badges-section mt-4">
            <h4 className="badges-title">✨ New Badges Unlocked!</h4>
            <div className="earned-badges-list">
              {result.newlyEarnedBadges.map((badge) => (
                <div key={badge.badgeId || badge.code} className="badge-unlock-item">
                  <div className="badge-icon">🏅</div>
                  <div className="badge-details">
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-desc">{badge.description}</div>
                    <div className="badge-points">+{badge.badgePoints} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-actions flex mt-4" style={{ gap: '1rem' }}>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
            Back to Quizzes
          </button>
          <button onClick={onViewLeaderboard} className="btn-primary" style={{ flex: 1 }}>
            View Leaderboard 📊
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultModal;
