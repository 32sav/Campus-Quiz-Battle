import React, { useState } from 'react';

const QuizBuilderModal = ({
  isOpen,
  onClose,
  onSubmit,
  courses = [],
  categories = [],
  submitting,
}) => {
  const [quizMeta, setQuizMeta] = useState({
    title: '',
    description: '',
    courseId: courses[0]?.courseId || 1,
    categoryId: categories[0]?.categoryId || 1,
    timeLimit: 10,
  });

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'a',
      questionOrder: 1,
    },
  ]);

  if (!isOpen) return null;

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setQuizMeta((prev) => ({
      ...prev,
      [name]: name === 'courseId' || name === 'categoryId' || name === 'timeLimit' ? Number(value) : value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'a',
        questionOrder: prev.length + 1,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions((prev) =>
      prev.filter((_, i) => i !== index).map((q, i) => ({ ...q, questionOrder: i + 1 }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizMeta.title) {
      alert('Quiz title is required');
      return;
    }

    const payload = {
      ...quizMeta,
      questions,
    };
    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card" style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header flex-between mb-2">
          <h2>Create New Educational Quiz</h2>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>
        <p className="text-muted mb-3">
          Configure a timed academic quiz with multiple choice questions.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Metadata */}
          <div className="quiz-meta-section mb-4">
            <div className="form-group">
              <label>Quiz Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Data Structures & Algorithms Midterm Quiz"
                value={quizMeta.title}
                onChange={handleMetaChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows={2}
                placeholder="Outline the topic or syllabus coverage..."
                value={quizMeta.description}
                onChange={handleMetaChange}
              />
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label>Course</label>
                <select
                  name="courseId"
                  value={quizMeta.courseId}
                  onChange={handleMetaChange}
                >
                  {courses.map((c) => (
                    <option key={c.courseId} value={c.courseId}>
                      {c.name}
                    </option>
                  ))}
                  {courses.length === 0 && <option value={1}>General Studies</option>}
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="categoryId"
                  value={quizMeta.categoryId}
                  onChange={handleMetaChange}
                >
                  {categories.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.name}
                    </option>
                  ))}
                  {categories.length === 0 && <option value={1}>Midterms</option>}
                </select>
              </div>

              <div className="form-group">
                <label>Time Limit (Minutes)</label>
                <input
                  type="number"
                  name="timeLimit"
                  min={1}
                  max={120}
                  value={quizMeta.timeLimit}
                  onChange={handleMetaChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Question Builder */}
          <div className="questions-builder-section">
            <div className="flex-between mb-2">
              <h3>Questions ({questions.length})</h3>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                + Add Question
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="card question-builder-item mb-3" style={{ background: '#f8fafc' }}>
                <div className="flex-between mb-2">
                  <span className="font-bold">Question {qIndex + 1}</span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="btn-remove-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter question text..."
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem' }}>Option A</label>
                    <input
                      type="text"
                      placeholder="Option A text"
                      value={q.optionA}
                      onChange={(e) => handleQuestionChange(qIndex, 'optionA', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem' }}>Option B</label>
                    <input
                      type="text"
                      placeholder="Option B text"
                      value={q.optionB}
                      onChange={(e) => handleQuestionChange(qIndex, 'optionB', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem' }}>Option C</label>
                    <input
                      type="text"
                      placeholder="Option C text"
                      value={q.optionC}
                      onChange={(e) => handleQuestionChange(qIndex, 'optionC', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem' }}>Option D</label>
                    <input
                      type="text"
                      placeholder="Option D text"
                      value={q.optionD}
                      onChange={(e) => handleQuestionChange(qIndex, 'optionD', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ maxWidth: '200px' }}>
                  <label style={{ fontSize: '0.8rem' }}>Correct Answer</label>
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                  >
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
                    <option value="c">Option C</option>
                    <option value="d">Option D</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-actions flex-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Creating Quiz...' : 'Save & Publish Quiz 🎯'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizBuilderModal;
