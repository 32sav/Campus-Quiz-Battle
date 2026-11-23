import React, { useState, useEffect, useRef } from 'react';

const QuizTaker = ({ quiz, onSubmit, onCancel, submitting }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: { answer: 'a', timeTaken: 12 } }
  const [timeLeft, setTimeLeft] = useState((quiz.timeLimit || 10) * 60);

  const questionStartTime = useRef(Date.now());

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (optionKey) => {
    const currentQ = quiz.questions[currentIdx];
    const duration = Math.round((Date.now() - questionStartTime.current) / 1000);

    setAnswers((prev) => ({
      ...prev,
      [currentQ.questionId]: {
        questionId: currentQ.questionId,
        answer: optionKey,
        timeTaken: (prev[currentQ.questionId]?.timeTaken || 0) + duration,
      },
    }));
    questionStartTime.current = Date.now();
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      questionStartTime.current = Date.now();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      questionStartTime.current = Date.now();
    }
  };

  const handleAutoSubmit = () => {
    // Fill any missing answers with blank and submit
    const finalAnswers = quiz.questions.map((q) => ({
      questionId: q.questionId,
      answer: answers[q.questionId]?.answer || '',
      timeTaken: answers[q.questionId]?.timeTaken || 10,
    }));
    onSubmit(finalAnswers);
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < quiz.questions.length) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${quiz.questions.length} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    const finalAnswers = quiz.questions.map((q) => ({
      questionId: q.questionId,
      answer: answers[q.questionId]?.answer || '',
      timeTaken: answers[q.questionId]?.timeTaken || 10,
    }));
    onSubmit(finalAnswers);
  };

  const currentQ = quiz.questions[currentIdx];
  const selectedAnswer = answers[currentQ?.questionId]?.answer;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeUrgent = timeLeft < 120; // less than 2 mins

  const progressPercent = Math.round(
    (Object.keys(answers).length / (quiz.questions.length || 1)) * 100
  );

  return (
    <div className="quiz-taker-wrapper card">
      {/* Quiz Top bar */}
      <div className="quiz-taker-header">
        <div>
          <span className="course-badge">{quiz.courseName}</span>
          <h2 className="quiz-title mt-1">{quiz.title}</h2>
        </div>

        <div className={`quiz-timer ${isTimeUrgent ? 'urgent' : ''}`}>
          <span className="timer-icon">⏳</span>
          <span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-section mt-2">
        <div className="progress-info flex-between mb-1">
          <span className="text-muted">
            Question {currentIdx + 1} of {quiz.questions.length}
          </span>
          <span className="text-muted">
            {Object.keys(answers).length} answered ({progressPercent}%)
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Body */}
      {currentQ && (
        <div className="question-body mt-4">
          <h3 className="question-text">
            {currentIdx + 1}. {currentQ.questionText}
          </h3>

          <div className="options-grid mt-3">
            {[
              { key: 'a', text: currentQ.optionA },
              { key: 'b', text: currentQ.optionB },
              { key: 'c', text: currentQ.optionC },
              { key: 'd', text: currentQ.optionD },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelectOption(opt.key)}
                className={`option-btn ${selectedAnswer === opt.key ? 'selected' : ''}`}
              >
                <span className="option-label">{opt.key.toUpperCase()}</span>
                <span className="option-text">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer navigation */}
      <div className="quiz-footer flex-between mt-4">
        <button
          onClick={onCancel}
          className="btn-outline"
          disabled={submitting}
        >
          Abandon Quiz
        </button>

        <div className="nav-buttons flex" style={{ gap: '1rem' }}>
          <button
            onClick={handlePrev}
            className="btn-secondary"
            disabled={currentIdx === 0 || submitting}
          >
            ← Previous
          </button>

          {currentIdx < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="btn-primary"
              disabled={submitting}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-submit-quiz"
              disabled={submitting}
            >
              {submitting ? 'Scoring Answers...' : 'Submit Final Answers 🎯'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;
