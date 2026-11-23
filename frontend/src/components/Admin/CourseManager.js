import React, { useState } from 'react';

const CourseManager = ({
  courses = [],
  categories = [],
  onAddCourse,
  onDeleteCourse,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseName.trim()) return;
    onAddCourse({ name: courseName.trim(), description: courseDesc.trim() });
    setCourseName('');
    setCourseDesc('');
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    onAddCategory({ name: categoryName.trim(), description: categoryDesc.trim() });
    setCategoryName('');
    setCategoryDesc('');
  };

  return (
    <div className="course-manager-wrapper grid-2">
      {/* Course management */}
      <div className="card">
        <h3>Academic Courses ({courses.length})</h3>
        <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
          Organize quizzes by university course subjects.
        </p>

        <form onSubmit={handleCreateCourse} className="mb-4">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              placeholder="e.g. Computer Science 101"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Brief course summary"
              value={courseDesc}
              onChange={(e) => setCourseDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            + Create Course
          </button>
        </form>

        <div className="items-list">
          {courses.length === 0 ? (
            <p className="text-muted text-center py-4">No courses created yet.</p>
          ) : (
            courses.map((c) => (
              <div
                key={c.courseId}
                className="item-row flex-between p-2 mb-1"
                style={{ borderBottom: '1px solid #e2e8f0' }}
              >
                <div>
                  <strong>{c.name}</strong>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {c.description || 'No description'}
                  </p>
                </div>
                {onDeleteCourse && (
                  <button
                    type="button"
                    onClick={() => onDeleteCourse(c.courseId)}
                    className="btn-danger"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Categories management */}
      <div className="card">
        <h3>Quiz Categories ({categories.length})</h3>
        <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
          Categorize by quiz format (Weekly Quiz, Midterms, Final Battle, Sprint).
        </p>

        <form onSubmit={handleCreateCategory} className="mb-4">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              placeholder="e.g. Midterm Exams"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Brief category description"
              value={categoryDesc}
              onChange={(e) => setCategoryDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-secondary" style={{ width: '100%' }}>
            + Create Category
          </button>
        </form>

        <div className="items-list">
          {categories.length === 0 ? (
            <p className="text-muted text-center py-4">No categories created yet.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.categoryId}
                className="item-row flex-between p-2 mb-1"
                style={{ borderBottom: '1px solid #e2e8f0' }}
              >
                <div>
                  <strong>{cat.name}</strong>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {cat.description || 'No description'}
                  </p>
                </div>
                {onDeleteCategory && (
                  <button
                    type="button"
                    onClick={() => onDeleteCategory(cat.categoryId)}
                    className="btn-danger"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManager;
