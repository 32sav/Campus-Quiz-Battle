import React from 'react';

const UserManager = ({ users = [], onRoleChange, onDeleteUser }) => {
  return (
    <div className="user-manager-wrapper card">
      <div className="flex-between mb-3">
        <div>
          <h3>User Management & Role Promotion ({users.length})</h3>
          <p className="text-muted">
            Promote active students to Lordes (game masters) or platform Administrators.
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No registered users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.userId}>
                  <td>#{u.userId}</td>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`role-pill ${
                        u.role === 'ADMIN'
                          ? 'badge-admin'
                          : u.role === 'LORDE'
                          ? 'badge-lorde'
                          : 'badge-student'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.userId, e.target.value)}
                      style={{ padding: '0.3rem 0.5rem', marginBottom: 0 }}
                    >
                      <option value="STUDENT">STUDENT</option>
                      <option value="LORDE">LORDE (Game Host)</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => onDeleteUser(u.userId)}
                      className="btn-danger"
                      style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
