import React, { useState, useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import QuizBuilderModal from '../components/Admin/QuizBuilderModal';
import CourseManager from '../components/Admin/CourseManager';
import UserManager from '../components/Admin/UserManager';
import adminService from '../services/adminService';
import quizService from '../services/quizService';
import gameService from '../services/gameService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'quizzes' | 'courses' | 'users' | 'games'
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const notify = (msg, duration = 4000) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), duration);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, coursesRes, catsRes, quizzesRes, usersRes, gamesRes] = await Promise.allSettled([
        adminService.getStats(),
        adminService.getCourses(),
        adminService.getCategories(),
        quizService.getAllQuizzes(),
        adminService.getUsers(),
        gameService.getUpcomingGames(),
      ]);

      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (coursesRes.status === 'fulfilled') setCourses(coursesRes.value || []);
      if (catsRes.status === 'fulfilled') setCategories(catsRes.value || []);
      if (quizzesRes.status === 'fulfilled') setQuizzes(quizzesRes.value?.data || []);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value || []);
      if (gamesRes.status === 'fulfilled') setGames(gamesRes.value?.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add course
  const handleAddCourse = async (courseData) => {
    try {
      await adminService.createCourse(courseData);
      notify('✓ Course created successfully!');
      const updated = await adminService.getCourses();
      setCourses(updated);
    } catch (err) {
      alert('Error creating course: ' + err.message);
    }
  };

  // Add category
  const handleAddCategory = async (catData) => {
    try {
      await adminService.createCategory(catData);
      notify('✓ Category created successfully!');
      const updated = await adminService.getCategories();
      setCategories(updated);
    } catch (err) {
      alert('Error creating category: ' + err.message);
    }
  };

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Delete this course? Quizzes belonging to it might be affected.')) return;
    try {
      await adminService.deleteCourse(courseId);
      notify('✓ Course deleted successfully!');
      setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
    } catch (err) {
      alert('Error deleting course: ' + err.message);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Delete this quiz category?')) return;
    try {
      await adminService.deleteCategory(categoryId);
      notify('✓ Category deleted successfully!');
      setCategories((prev) => prev.filter((c) => c.categoryId !== categoryId));
    } catch (err) {
      alert('Error deleting category: ' + err.message);
    }
  };

  // Create quiz
  const handleCreateQuiz = async (quizData) => {
    setSubmittingQuiz(true);
    try {
      await adminService.createQuiz(quizData);
      setIsQuizModalOpen(false);
      notify('🎯 Quiz & Questions published successfully!');
      const updated = await quizService.getAllQuizzes();
      setQuizzes(updated.data || []);
    } catch (err) {
      alert('Error creating quiz: ' + err.message);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  // Delete quiz
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await adminService.deleteQuiz(quizId);
      notify('✓ Quiz removed.');
      setQuizzes((prev) => prev.filter((q) => q.quizId !== quizId));
    } catch (err) {
      alert('Error deleting quiz: ' + err.message);
    }
  };

  // Change user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      notify(`✓ User #${userId} role changed to ${newRole}`);
      setUsers((prev) =>
        prev.map((u) => (u.userId === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert('Error updating user role: ' + err.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Delete user #${userId}? This cannot be undone.`)) return;
    try {
      await adminService.deleteUser(userId);
      notify(`✓ User #${userId} deleted`);
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  const getStatusClass = (s) => {
    if (!s) return 'waiting';
    return s.toLowerCase().replace(/ /g, '_');
  };

  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <main className="container page-container">
        {notification && (
          <div className="alert alert-success mb-3 flex-between">
            <span>{notification}</span>
            <button onClick={() => setNotification('')} className="btn-close">✕</button>
          </div>
        )}

        {/* Hero Admin Header */}
        <div className="card hero-banner admin-banner mb-4">
          <div className="flex-between">
            <div>
              <div className="badge-welcome">🛡️ System Administration</div>
              <h1 className="hero-title mt-1">Platform Control Hub</h1>
              <p className="hero-subtitle text-muted mt-1">
                Oversee academic courses, create quizzes with questions, manage campus Lordes and analytics.
              </p>
            </div>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="btn-primary btn-lg"
            >
              + Create New Quiz 🎯
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-nav-tabs mb-4">
          <button
            className={`dash-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Analytics & Stats
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            📝 Quizzes ({quizzes.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Courses & Categories
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            🎲 Community Games ({games.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 User Management ({users.length})
          </button>
        </div>

        {/* Tab 1: Analytics Overview */}
        {activeTab === 'overview' && (
          <section className="admin-overview-section">
            <div className="stats-metric-grid grid-3 mb-4">
              <div className="card stat-metric-card">
                <div className="metric-icon">🎓</div>
                <div className="metric-body">
                  <div className="metric-label">Enrolled Students</div>
                  <div className="metric-value">{stats?.totalStudents || 0}</div>
                </div>
              </div>

              <div className="card stat-metric-card">
                <div className="metric-icon">👑</div>
                <div className="metric-body">
                  <div className="metric-label">Campus Lordes</div>
                  <div className="metric-value">{stats?.totalLordes || 0}</div>
                </div>
              </div>

              <div className="card stat-metric-card">
                <div className="metric-icon">📚</div>
                <div className="metric-body">
                  <div className="metric-label">Active Courses</div>
                  <div className="metric-value">{stats?.totalCourses || courses.length}</div>
                </div>
              </div>

              <div className="card stat-metric-card">
                <div className="metric-icon">❓</div>
                <div className="metric-body">
                  <div className="metric-label">Published Quizzes</div>
                  <div className="metric-value">{stats?.totalQuizzes || quizzes.length}</div>
                </div>
              </div>

              <div className="card stat-metric-card">
                <div className="metric-icon">📝</div>
                <div className="metric-body">
                  <div className="metric-label">Quiz Submissions</div>
                  <div className="metric-value">{stats?.totalAttempts || 0}</div>
                </div>
              </div>

              <div className="card stat-metric-card">
                <div className="metric-icon">🎲</div>
                <div className="metric-body">
                  <div className="metric-label">Game Sessions Hosted</div>
                  <div className="metric-value">{stats?.totalGameSessions || games.length}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Quizzes */}
        {activeTab === 'quizzes' && (
          <section className="admin-quizzes-section">
            <div className="flex-between mb-3">
              <div>
                <h2>Academic Quizzes ({quizzes.length})</h2>
                <p className="text-muted">
                  Create, review, or decommission multiple-choice quizzes across university subjects.
                </p>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="btn-primary"
              >
                + New Quiz
              </button>
            </div>

            <div className="table-responsive card">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Quiz Title</th>
                    <th>Course</th>
                    <th>Category</th>
                    <th>Time Limit</th>
                    <th>Questions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No quizzes found. Click "+ New Quiz" to author one.
                      </td>
                    </tr>
                  ) : (
                    quizzes.map((q) => (
                      <tr key={q.quizId}>
                        <td>#{q.quizId}</td>
                        <td>
                          <strong>{q.title}</strong>
                        </td>
                        <td>
                          <span className="tag-course">{q.courseName}</span>
                        </td>
                        <td>{q.categoryName}</td>
                        <td>{q.timeLimit} mins</td>
                        <td>{q.totalQuestions || 0}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteQuiz(q.quizId)}
                            className="btn-danger"
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 3: Courses & Categories */}
        {activeTab === 'courses' && (
          <section className="admin-courses-section">
            <CourseManager
              courses={courses}
              categories={categories}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </section>
        )}

        {/* Tab 4: Community Games */}
        {activeTab === 'games' && (
          <section className="admin-games-section">
            <div className="flex-between mb-3">
              <div>
                <h2>All Community Game Sessions ({games.length})</h2>
                <p className="text-muted">
                  View, monitor, and manage all community game sessions created by Lordes.
                </p>
              </div>
              <button onClick={loadAdminData} className="btn-outline">
                🔄 Refresh
              </button>
            </div>

            <div className="table-responsive card">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Game Type</th>
                    <th>Lorde</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Participants</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {games.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No game sessions found yet.
                      </td>
                    </tr>
                  ) : (
                    games.map((g) => (
                      <tr key={g.gameSessionId}>
                        <td>#{g.gameSessionId}</td>
                        <td><strong>{g.title}</strong></td>
                        <td><span className="game-type-pill">🎲 {g.gameTypeName || '-'}</span></td>
                        <td>{g.lordeName || '-'}</td>
                        <td>
                          {g.scheduledDate
                            ? new Date(g.scheduledDate).toLocaleDateString()
                            : '-'}
                        </td>
                        <td>{g.location || '-'}</td>
                        <td>{g.currentParticipantsCount || 0} / {g.maxParticipants || '-'}</td>
                        <td>
                          <span className={`status-pill ${getStatusClass(g.status)}`}>
                            {g.status || 'WAITING'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 5: User Management */}
        {activeTab === 'users' && (
          <section className="admin-users-section">
            <UserManager
              users={users}
              onRoleChange={handleRoleChange}
              onDeleteUser={handleDeleteUser}
            />
          </section>
        )}

        {/* Quiz Builder Modal */}
        <QuizBuilderModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          onSubmit={handleCreateQuiz}
          courses={courses}
          categories={categories}
          submitting={submittingQuiz}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
