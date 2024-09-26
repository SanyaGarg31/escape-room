// src/components/Challenge.js
import React from 'react';
import ReusableContainer from './ReusableContainer';

const Challenge = () => {
  // Generate random 5 alphanumeric words
  const generateRandomWords = () => {
    return Array.from({ length: 5 }, () =>
      Math.random().toString(36).substring(2, 10)
    );
  };

  return (
    <div className="challenge-container">
      <h1>First Challenge</h1>
      <ReusableContainer title="Description">
        <div className="description-content">
          <div className="text-section">
            <p>This is the challenge description text.</p>
          </div>
          <div className="image-section">
            <img src="https://via.placeholder.com/150" alt="Challenge" />
          </div>
        </div>
      </ReusableContainer>
      <ReusableContainer title="Code Word">
        <div className="codeword-container">
          {generateRandomWords().map((word, index) => (
            <p key={index} style={{ fontWeight: 'bold' }}>
              {word}
            </p>
          ))}
        </div>
      </ReusableContainer>
      <ReusableContainer title="Answer">
        <div className="input-container">
          <input type="text" placeholder="Enter your answer" />
          <button>Submit</button>
        </div>
      </ReusableContainer>
    </div>
  );
};

export default Challenge;
