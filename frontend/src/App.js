import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LordeDashboard from './pages/LordeDashboard';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and restore auth state
      // This will be implemented in auth slice
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lorde"
            element={
              <ProtectedRoute requiredRole="LORDE">
                <LordeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect to dashboard if authenticated, else to login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                user?.role === 'ADMIN' ? (
                  <Navigate to="/admin" replace />
                ) : user?.role === 'LORDE' ? (
                  <Navigate to="/lorde" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;