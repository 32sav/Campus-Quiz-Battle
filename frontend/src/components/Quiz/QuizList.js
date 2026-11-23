import React, { useState } from 'react';

const QuizList = ({ quizzes, onSelectQuiz, loading }) => {
  const [selectedCourse, setSelectedCourse] = useState('ALL');

  if (loading) {
    return (
      <div className="card text-center" style={{ padding: '3rem' }}>
        <div className="loading" style={{ width: '40px', height: '40px' }}></div>
        <p className="mt-2 text-muted">Loading quizzes from academic database...</p>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '3rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
        <h3>No Quizzes Available Yet</h3>
        <p className="text-muted mt-1">
          Courses and quizzes will be uploaded shortly by faculty and administrators.
        </p>
      </div>
    );
  }

  // Extract unique courses for filtering
  const courses = ['ALL', ...new Set(quizzes.map((q) => q.courseName).filter(Boolean))];

  const filteredQuizzes =
    selectedCourse === 'ALL'
      ? quizzes
      : quizzes.filter((q) => q.courseName === selectedCourse);

  return (
    <div className="quiz-list-wrapper">
      {/* Course filter pill tabs */}
      <div className="filter-bar mb-3">
        <span className="filter-label">Filter by Course:</span>
        <div className="filter-pills">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`filter-pill ${selectedCourse === course ? 'active' : ''}`}
            >
              {course}
            </button>
          ))}
        </div>
      </div>

      {/* Quizzes grid */}
      <div className="quizzes-grid grid-3">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.quizId} className="quiz-card card">
            <div className="quiz-card-tags">
              <span className="tag-course">{quiz.courseName || 'General'}</span>
              {quiz.categoryName && (
                <span className="tag-category">{quiz.categoryName}</span>
              )}
            </div>

            <h3 className="quiz-card-title mt-2">{quiz.title}</h3>
            <p className="quiz-card-description">
              {quiz.description || 'Test your knowledge and compete on the academic leaderboard.'}
            </p>

            <div className="quiz-card-meta">
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <span>{quiz.timeLimit} mins</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">❓</span>
                <span>{quiz.totalQuestions || 5} Questions</span>
              </div>
            </div>

            <button
              onClick={() => onSelectQuiz(quiz.quizId)}
              className="btn-primary btn-start-quiz mt-3"
            >
              Start Quiz 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
