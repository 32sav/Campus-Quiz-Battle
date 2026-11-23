import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/slices/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });

  const [validationError, setValidationError] = useState('');

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    const { confirmPassword, ...registerPayload } = formData;
    dispatch(register(registerPayload));
  };

  return (
    <div className="auth-page flex-center" style={{ minHeight: '90vh', padding: '2rem 1rem' }}>
      <div className="card auth-card" style={{ maxWidth: '460px', width: '100%' }}>
        <div className="auth-header text-center mb-3">
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h1>Join Campus Battle</h1>
          <p className="text-muted mt-1">
            Create your account to take academic quizzes and compete in campus games.
          </p>
        </div>

        {(validationError || error) && (
          <div className="alert alert-error">{validationError || error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Johnson"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. alex@campus.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Initial Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student (Quiz taker & Game participant)</option>
              <option value="LORDE">Lorde (Game Creator & Match Host)</option>
            </select>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 chars"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account & Enter ⚔️'}
          </button>
        </form>

        <div className="auth-footer text-center mt-3">
          <p className="text-muted">
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
