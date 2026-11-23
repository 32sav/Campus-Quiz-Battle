import React, { useState } from 'react';

const RecordResultsModal = ({
  session,
  isOpen,
  onClose,
  onSubmit,
  submitting,
  availableUsers = [],
}) => {
  const [results, setResults] = useState([]);

  const [newPlayerId, setNewPlayerId] = useState('');
  const [newRole, setNewRole] = useState('Villager');
  const [newWinner, setNewWinner] = useState(false);

  if (!isOpen || !session) return null;

  const handleAddPlayer = () => {
    if (!newPlayerId) return;
    setResults((prev) => [
      ...prev,
      {
        userId: Number(newPlayerId),
        assignedRole: newRole,
        isWinner: newWinner,
      },
    ]);
    setNewPlayerId('');
  };

  const handleRemove = (index) => {
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleWinner = (index) => {
    setResults((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isWinner: !item.isWinner } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length === 0) {
      alert('Please add at least one participant result.');
      return;
    }
    onSubmit(session.gameSessionId, { results });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card" style={{ maxWidth: '640px' }}>
        <div className="modal-header flex-between mb-2">
          <h2>Record Results: {session.title}</h2>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>
        <p className="text-muted mb-3">
          Assign player roles and victory status. The system will calculate role-weighted points and evaluate gaming badges automatically.
        </p>

        {/* Quick Add Player Form */}
        <div className="add-participant-bar card mb-3" style={{ background: '#f8fafc', padding: '1rem' }}>
          <h4>Add Participant Match Entry</h4>
          <div className="grid-3 mt-2" style={{ gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem' }}>User ID / Player</label>
              {availableUsers.length > 0 ? (
                <select
                  value={newPlayerId}
                  onChange={(e) => setNewPlayerId(e.target.value)}
                >
                  <option value="">Select Student...</option>
                  {availableUsers.map((u) => (
                    <option key={u.userId} value={u.userId}>
                      {u.name} (ID: {u.userId})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  placeholder="Enter User ID"
                  value={newPlayerId}
                  onChange={(e) => setNewPlayerId(e.target.value)}
                />
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.85rem' }}>Assigned Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="Mafia">Mafia</option>
                <option value="Villager">Villager</option>
                <option value="Detective">Detective</option>
                <option value="Doctor">Doctor</option>
                <option value="Werewolf">Werewolf</option>
                <option value="Seer">Seer</option>
                <option value="Impostor">Impostor</option>
                <option value="Crewmate">Crewmate</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem' }}>Victory Outcome</label>
              <select
                value={newWinner ? '1' : '0'}
                onChange={(e) => setNewWinner(e.target.value === '1')}
              >
                <option value="1">Winner 🏆</option>
                <option value="0">Defeated ❌</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddPlayer}
            className="btn-secondary mt-2"
            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
          >
            + Add To Match Roster
          </button>
        </div>

        {/* Current Results Roster */}
        <div className="results-roster mb-3">
          <h4>Match Roster ({results.length} Players)</h4>
          <table className="leaderboard-table mt-2">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Role</th>
                <th>Outcome</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx}>
                  <td>Player #{r.userId}</td>
                  <td>
                    <span className="badge-role">{r.assignedRole}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleWinner(idx)}
                      className={`pill-btn ${r.isWinner ? 'win' : 'lose'}`}
                    >
                      {r.isWinner ? 'Won (+Pts)' : 'Lost'}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="btn-remove-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions flex-between mt-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary"
            disabled={submitting || results.length === 0}
          >
            {submitting ? 'Calculating...' : 'Commit Results & Award Points 🏆'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultsModal;
