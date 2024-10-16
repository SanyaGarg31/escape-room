import React, {useState, useContext} from 'react'
import './MatchsetComponent.css'

import icon1 from '../assets/icon1.jpeg'; // Example icon imports
import icon2 from '../assets/icon2.jpeg';
import icon3 from '../assets/icon3.jpeg';
import icon4 from '../assets/icon4.jpeg';

import Button from 'react-bootstrap/Button';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge5.png'
import { useNavigate } from 'react-router-dom';

export default function MatchsetComponent() {
    const [matches, setMatches] = useState({}); // To keep track of matches
    const [isCorrect, setIsCorrect] = useState(null); // For validation status
    const [isCompleted, setIsCompleted] = useState(false);
    const { earnedBadges, addBadge } = useContext(BadgeContext);
    const navigate = useNavigate();
  
    const descriptions = [
      "Malicious packets flood the server. ",
      "Unable to detect traffic on one side of the network",
      "Traffic from multiple IP addresses is overwhelming the server’s bandwidth",
      "Attempts to inject malicious SQL commands into the web application’s login form",
    ];

    const handleNext = () => {
        navigate(`/challenge/6`);
      };
  
    const icons = [
      { id: 1, src: icon1 },
      { id: 2, src: icon2 },
      { id: 3, src: icon3 },
      { id: 4, src: icon4 }
    ];
  
    const handleDrop = (event, index) => {
      event.preventDefault();
      const iconId = event.dataTransfer.getData("iconId");
      setMatches((prevMatches) => ({ ...prevMatches, [index]: iconId }));
    };
  
    const handleDragStart = (event, iconId) => {
      event.dataTransfer.setData("iconId", iconId);
    };
  
    const checkMatches = () => {
      const correctMatches = {
        0: "1", // Icon 1 matches Description 1
        1: "2", // Icon 2 matches Description 2
        2: "3", // Icon 3 matches Description 3
        3: "4"  // Icon 4 matches Description 4
      };
  
      if(JSON.stringify(matches) === JSON.stringify(correctMatches)){
        setIsCompleted(true);
        addBadge(badge);
      };
    };
  
    return (
      <div>
        {!isCompleted ? ((
            <div className="row main-container">
            <h1>Match the Icons</h1>
            <div className="col descriptions-container">
              {descriptions.map((description, index) => (
                <div key={index} className="description">
                  <p>{description}</p>
                  <div
                    className="drop-zone"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {matches[index] ? (
                      <img
                        src={icons.find(icon => icon.id === parseInt(matches[index])).src}
                        alt={`Icon ${matches[index]}`}
                        className="dropped-icon"
                      />
                    ) : (
                      "Drop Here"
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="icons-container">
              {icons.map((icon) => (
                <img
                  key={icon.id}
                  src={icon.src}
                  alt={`Icon ${icon.id}`}
                  className="icon"
                  draggable
                  onDragStart={(e) => handleDragStart(e, icon.id)}
                />
              ))}
            </div>
            <button className="check-button" onClick={checkMatches}>Check</button>
            {isCorrect === true && <h3 className="success">🎉 Correct Matches! 🎉</h3>}
            {isCorrect === false && <h3 className="error">❌ Incorrect Matches!</h3>}
          </div>
        )) : (
            <>
          <p style={{ color: "green" }}>Congratulations! You've earned the badge for this challenge.</p>
          <p>You're awarded: <img src={badge} alt={`Badge for challenge`} style={{ height: "50px" }} /></p>
          <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
        </>
        )}
      </div>
    );
}
