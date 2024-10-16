import React, { useState, useContext } from 'react'
import './NoteComponent.css'
import note from '../assets/note.jpeg'
import Button from 'react-bootstrap/Button';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge4.png'
import { useNavigate} from 'react-router-dom';

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
      if (direction === "left") {
        setRotation(rotation - 90);
      } else if (direction === "right") {
        setRotation(rotation + 90);
      } else if (direction === "up") {
        setRotation(0);
      } else if (direction === "down") {
        setRotation(180);
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
        {!isCompleted ? ((
            <div className="App">
        
            <div className="image-container">
              <div className="arrows">
                <button onClick={() => rotateImage("up")}>⬆️</button>
                <button onClick={() => rotateImage("right")}>➡️</button>
                <button onClick={() => rotateImage("down")}>⬇️</button>
                <button onClick={() => rotateImage("left")}>⬅️</button>
              </div>
      
              <div className="rotating-image" >
                <img
                  src={note}
                  alt="Rotatable"
                  style={{ transform: `rotate(${rotation}deg)`   }}
                />
              </div>
            </div>
      
            <div className="code-input-container">
              <h2>Enter the 4-digit code:</h2>
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
        )) : ((
            <>
          <p style={{ color: "green" }}>Congratulations! You've earned the badge for this challenge.</p>
          <p>You're awarded: <img src={badge} alt={`Badge for challenge`} style={{ height: "50px" }} /></p>
          <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
        </>
        )) }
      </div>
    );
}
