import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'LORDE') {
        navigate('/lorde');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;
    dispatch(login(credentials));
  };

  const handleQuickDemo = (demoEmail) => {
    setCredentials({
      email: demoEmail,
      password: 'password123',
    });
    dispatch(login({ email: demoEmail, password: 'password123' }));
  };

  return (
    <div className="auth-page flex-center" style={{ minHeight: '90vh', padding: '2rem 1rem' }}>
      <div className="card auth-card" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="auth-header text-center mb-3">
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚔️</div>
          <h1>Campus Quiz Battle</h1>
          <p className="text-muted mt-1">
            Where Academic Excellence meets Team Gaming Strategy.
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. student@campus.edu"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Arena 🚀'}
          </button>
        </form>

        {/* Quick Demo Login Helpers */}
        <div className="demo-login-box card mt-3" style={{ background: '#f8fafc', padding: '1rem' }}>
          <div className="text-muted mb-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            ⚡ Instant Demo Accounts:
          </div>
          <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('student@campus.edu')}
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', flex: 1 }}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('lorde@campus.edu')}
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', flex: 1 }}
            >
              👑 Lorde
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin@campus.edu')}
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', flex: 1 }}
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        <div className="auth-footer text-center mt-3">
          <p className="text-muted">
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
              Join the Battle
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
