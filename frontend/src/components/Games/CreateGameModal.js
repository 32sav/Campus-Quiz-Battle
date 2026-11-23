import React, { useState } from 'react';

const CreateGameModal = ({ isOpen, onClose, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    gameTypeId: 1, // 1: Mafia, 2: Werewolf, 3: Among Us
    title: '',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '17:00:00',
    location: '',
    maxParticipants: 12,
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gameTypeId' || name === 'maxParticipants' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) {
      setError('Title and Campus Location are required.');
      return;
    }

    // Format scheduledTime to HH:mm:ss if needed
    const formattedTime =
      formData.scheduledTime.length === 5
        ? `${formData.scheduledTime}:00`
        : formData.scheduledTime;

    onSubmit({
      ...formData,
      scheduledTime: formattedTime,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card" style={{ maxWidth: '540px' }}>
        <div className="modal-header flex-between mb-2">
          <h2>Host Community Game Session</h2>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>
        <p className="text-muted mb-3">
          Schedule an in-person campus battle (Mafia, Werewolf, or IRL Among Us).
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game Type</label>
            <select
              name="gameTypeId"
              value={formData.gameTypeId}
              onChange={handleChange}
            >
              <option value={1}>Mafia (Deception & Deductions)</option>
              <option value={2}>Werewolf (Night Hunting & Trials)</option>
              <option value={3}>IRL Among Us (Tasks & Impostor)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Session Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Friday Night Hall Mafia Showdown"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description & Rules</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Brief details about the meeting point, ground rules, and prizes..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Scheduled Date</label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Scheduled Time</label>
              <input
                type="time"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Campus Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Student Center Room 102"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Max Player Capacity</label>
              <input
                type="number"
                name="maxParticipants"
                min={4}
                max={50}
                value={formData.maxParticipants}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions flex-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Creating Game...' : 'Publish Game Session ⚔️'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGameModal;
