import React, { useContext } from 'react';
import { BadgeContext } from '../BadgeContext';
import { TimerContext } from '../TimerContext';

const ConcludingPage = () => {
  const { earnedBadges } = useContext(BadgeContext);
  const { setTimerStarted, resetTimer } = useContext(TimerContext);
  setTimerStarted(false);

  return (
    <div className="concluding-page" style={{textAlign:"center", marginTop:"5rem"}}>
      <h2>Game Over!</h2>
      <p>Your final score is based on the number of badges you earned.</p>
      <div className="badge-display">
        {earnedBadges.length > 0 ? (
          earnedBadges.map((badge, index) => (
            <img key={index} src={badge} alt={`Badge ${index + 1}`}  style={{height:"50px", marginLeft:"10px"}}/>
          ))
        ) : (
          <p>No badges earned.</p>
        )}
      </div>
    </div>
  );
};

export default ConcludingPage;
