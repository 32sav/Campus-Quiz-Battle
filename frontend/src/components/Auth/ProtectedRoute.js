import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fallback to localStorage check in case of page reload before state rehydration
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const authed = isAuthenticated || !!token;
  const currentUser = user || storedUser;

  if (!authed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && currentUser && currentUser.role !== requiredRole) {
    // If Admin, grant access to everything
    if (currentUser.role === 'ADMIN') {
      return children;
    }

    // Lordes can also participate in the student educational arena
    if (requiredRole === 'STUDENT' && currentUser.role === 'LORDE') {
      return children;
    }

    // Role mismatch, route to role-appropriate home
    if (currentUser.role === 'LORDE') {
      return <Navigate to="/lorde" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
