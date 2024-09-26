// src/components/Rules.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/challenge');
  };

  return (
    <div className="rules-container">
      <h1>Rules of the Challenge</h1>
      <div className="rules-box">
        <ul>
          <li>Rule 1: Lorem ipsum dolor sit amet.</li>
          <li>Rule 2: Consectetur adipiscing elit.</li>
          {/* Add 8 more rules */}
        </ul>
        <button onClick={handleStart}>Start Challenge</button>
      </div>
    </div>
  );
};

export default Rules;
