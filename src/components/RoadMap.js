import React from 'react'; // Add custom styling

export default function RoadMap({ totalChallenges, currentChallenge, progress }) {
  return (
    <div className="roadmap-container">
        <div className="roadmap-header">
            Challenges RoadMap
        </div>
        <br></br><br></br><br></br>
      {/* Map over total challenges and create roadmap steps */}
      {Array.from({ length: totalChallenges }, (_, index) => (
        <div key={index} className="challenge-step">
          {/* Circle representing each challenge */}
          <div
            className={`challenge-node ${index < currentChallenge ? 'completed' : ''} ${index === currentChallenge ? 'current' : ''}`}
          >
            {index + 1}
          </div>

          {/* Progress bar between challenges */}
          {index < totalChallenges - 1 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: index < currentChallenge ? '100%' : index === currentChallenge ? `${progress}%` : '0%',
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
