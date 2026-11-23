import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const storedUser = user || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'badge-admin';
      case 'LORDE':
        return 'badge-lorde';
      default:
        return 'badge-student';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚔️</span> Campus Quiz Battle
        </Link>

        {storedUser && (
          <ul className="navbar-menu">
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Student Arena
              </Link>
            </li>

            {(storedUser.role === 'LORDE' || storedUser.role === 'ADMIN') && (
              <li>
                <Link
                  to="/lorde"
                  className={location.pathname === '/lorde' ? 'active' : ''}
                >
                  Lorde Chamber
                </Link>
              </li>
            )}

            {storedUser.role === 'ADMIN' && (
              <li>
                <Link
                  to="/admin"
                  className={location.pathname === '/admin' ? 'active' : ''}
                >
                  Admin Control
                </Link>
              </li>
            )}
          </ul>
        )}

        <div className="navbar-actions">
          {storedUser ? (
            <div className="user-profile-menu">
              <span className={`role-pill ${getRoleBadgeClass(storedUser.role)}`}>
                {storedUser.role}
              </span>
              <span className="user-name">{storedUser.name}</span>
              <button
                onClick={handleLogout}
                className="btn-logout"
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-nav-links">
              <Link to="/login" className="btn-login-link">
                Sign In
              </Link>
              <Link to="/register" className="btn-register-link">
                Join Battle
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
