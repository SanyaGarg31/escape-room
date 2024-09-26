// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Basic validation
    if (!name || !personalEmail || !officialEmail) {
      setError('All fields are required');
      return;
    }

    // Save to local storage
    localStorage.setItem('user', JSON.stringify({ name, personalEmail, officialEmail }));
    // Redirect to Rules page
    navigate('/rules');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Personal Email"
        value={personalEmail}
        onChange={(e) => setPersonalEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Official Email"
        value={officialEmail}
        onChange={(e) => setOfficialEmail(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
