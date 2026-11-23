import React, { useState } from 'react';

/**
 * ManageParticipantsModal
 * Allows the Lorde to register participants who are physically present,
 * and trigger the automatic role Shuffle button.
 */
const ManageParticipantsModal = ({
  isOpen,
  onClose,
  session,
  onRegisterParticipant,
  onShuffleRoles,
  onRemoveParticipant
}) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [shuffledSuccess, setShuffledSuccess] = useState(false);

  if (!isOpen || !session) return null;

  const participants = session.participants || [];
  const total = participants.length;

  // Mafia Role Calculation logic:
  // Imposters: 2 to 5 according to crew size
  // Chief: 1
  // Doctor: scales (1 for <=14, 2 for >=15)
  // Villagers: majority
  let imposterCount = 2;
  let doctorCount = 1;
  let chiefCount = 1;

  if (total <= 7) {
    imposterCount = 2;
  } else if (total <= 11) {
    imposterCount = 2;
  } else if (total <= 14) {
    imposterCount = 3;
  } else if (total <= 18) {
    imposterCount = 4;
    doctorCount = 2;
  } else {
    imposterCount = 5;
    doctorCount = 2;
  }
  const villagerCount = Math.max(1, total - (imposterCount + chiefCount + doctorCount));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onRegisterParticipant(session.gameSessionId, {
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '.')}@campus.edu`
    });
    setNewName('');
    setNewEmail('');
  };

  const handleShuffleClick = () => {
    if (total < 5) {
      alert('You need at least 5 registered participants to shuffle Mafia roles.');
      return;
    }
    onShuffleRoles(session.gameSessionId);
    setShuffledSuccess(true);
    setTimeout(() => setShuffledSuccess(false), 3000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card" style={{ maxWidth: '680px' }}>
        <div className="modal-header flex-between mb-2">
          <div>
            <h2>Manage Participants & Assign Roles</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Session: <strong>{session.title}</strong> ({session.location})
            </p>
          </div>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        {/* Dynamic Quota Info */}
        <div className="p-2 mb-3" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid #334155' }}>
          <div className="flex-between mb-1">
            <strong>Crew Size: {total} Registered</strong>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Dynamic Quotas (Mafia Engine)</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <span className="badge-imposter p-1" style={{ borderRadius: '4px' }}>🔴 {imposterCount} Imposters</span>
            <span className="badge-chief p-1" style={{ borderRadius: '4px', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>⭐ 1 The Chief</span>
            <span className="badge-doctor p-1" style={{ borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>💉 {doctorCount} Doctor</span>
            <span className="badge-villager p-1" style={{ borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>🧑‍🌾 {villagerCount} Villagers</span>
          </div>
        </div>

        {/* Lorde Register Participant Form */}
        <form onSubmit={handleAdd} className="mb-3" style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Participant full name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 2, padding: '0.6rem' }}
            required
          />
          <input
            type="email"
            placeholder="Email (optional)..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={{ flex: 2, padding: '0.6rem' }}
          />
          <button type="submit" className="btn-primary" style={{ flex: 1, whiteSpace: 'nowrap' }}>
            + Register
          </button>
        </form>

        {/* The Lorde Shuffle Button */}
        <div className="mb-3">
          <button
            type="button"
            onClick={handleShuffleClick}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontWeight: '700',
              fontSize: '1rem',
              background: shuffledSuccess ? '#22c55e' : 'linear-gradient(135deg, #eab308, #ca8a04)',
              borderColor: shuffledSuccess ? '#22c55e' : '#ca8a04',
              color: '#000',
              cursor: 'pointer'
            }}
          >
            {shuffledSuccess ? '✅ Roles Automatically Shuffled & Assigned!' : '🔀 Automatically Assign Roles (Shuffle)'}
          </button>
        </div>

        {/* Participant Roster Table */}
        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>#</th>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Assigned Secret Role</th>
                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8' }}>
                    No participants registered yet. Use the form above to add players.
                  </td>
                </tr>
              ) : (
                participants.map((p, idx) => (
                  <tr key={p.id || idx} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.5rem', color: '#94a3b8' }}>{idx + 1}</td>
                    <td style={{ padding: '0.5rem' }}><strong>{p.name}</strong></td>
                    <td style={{ padding: '0.5rem' }}>
                      {p.role ? (
                        <span style={{ fontWeight: '600', color: p.role === 'Imposter' ? '#f87171' : p.role === 'The Chief' ? '#facc15' : p.role === 'Doctor' ? '#38bdf8' : '#4ade80' }}>
                          {p.role}
                        </span>
                      ) : (
                        <span style={{ color: '#64748b', fontStyle: 'italic' }}>Pending Shuffle</span>
                      )}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                      <button
                        onClick={() => onRemoveParticipant && onRemoveParticipant(session.gameSessionId, p.id || idx)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        title="Remove participant"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex-between mt-3">
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            Roles will become immediately visible on players' personal student dashboards upon shuffle.
          </span>
          <button onClick={onClose} className="btn-outline">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageParticipantsModal;
