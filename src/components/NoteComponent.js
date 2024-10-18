import React, { useState, useContext } from 'react';
import './NoteComponent.css';
import note from '../assets/note.jpeg';
import Button from 'react-bootstrap/Button';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge4.png';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

export default function NoteComponent() {
  const [rotation, setRotation] = useState(0); // To handle image rotation
  const [code, setCode] = useState(["", "", "", ""]); // To handle input code
  const [isCorrect, setIsCorrect] = useState(null); // To check if the code is correct
  const correctCode = ["0", "7", "7", "3"];
  const { earnedBadges, addBadge } = useContext(BadgeContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  // Rotate image based on direction
  const rotateImage = (direction) => {
    switch (direction) {
      case "left":
        setRotation((prevRotation) => prevRotation - 90);
        break;
      case "right":
        setRotation((prevRotation) => prevRotation + 90);
        break;
      case "up":
        setRotation(0);
        break;
      case "down":
        setRotation(180);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    navigate(`/challenge/5`);
  };

  // Handle input change
  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  // Check the code when the Check button is clicked
  const validateCode = () => {
    if (code.join("") === correctCode.join("")) {
      setIsCorrect(true);
      addBadge(badge);
      setIsCompleted(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      {!isCompleted ? (
        <div className="App">
          <div className="image-container">
            <div className="arrows">
              <button onClick={() => rotateImage("up")}>⬆️</button>
              <button onClick={() => rotateImage("right")}>➡️</button>
              <button onClick={() => rotateImage("down")}>⬇️</button>
              <button onClick={() => rotateImage("left")}>⬅️</button>
            </div>

            <div className="rotating-image">
              <img
                src={note}
                alt="Rotatable"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
          </div>

          <div className="code-input-container">
            <div className="input-boxes">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  className={isCorrect === false ? "incorrect" : ""}
                />
              ))}
            </div>
          </div>

          <button className="check-button" onClick={validateCode}>Check</button>

          {isCorrect === true && <h3 className="success">That's Correct!</h3>}
          {isCorrect === false && <h3 className="error">Sorry, that's incorrect!</h3>}

          <footer>Use the arrows to rotate the image and enter the correct code!</footer>
        </div>
      ) : (
        <>
          <Confetti />
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'green', fontSize: '48px' }}>Congratulations!</h1>
            <p style={{ fontSize: '24px' }}>You've earned the badge for this challenge.</p>
            <img
              src={badge} // Use badge instead of currentChallenge.badge
              alt={`Badge for challenge 4`}
              style={{ height: '200px', margin: '20px auto', display: 'block' }}
            />
            <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
          </div>
        </>
      )}
    </div>
  );
}
