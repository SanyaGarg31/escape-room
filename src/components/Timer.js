import React from 'react'
import { useState, useEffect } from 'react' 

export default function Timer({handleTimeout, stopTimer}) {
    const [seconds, setSeconds] = useState(90)
    useEffect(() => {
        // Exit early if countdown is finished
        if (seconds <= 0 || stopTimer) {
          handleTimeout()
        return;
        }
        
        // Set up the timer
        const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds-1);
        }, 1000);
        if(stopTimer){
          return () => clearInterval(timer);
        }
        
        // Clean up the timer
        return () => clearInterval(timer);
        }, [seconds, handleTimeout, stopTimer]);
  return (
    <div className='timer-container'>
      <p className='timer-text'>00:{seconds < 10 ? "0" : ""}{seconds}</p>
    </div>
  )
}
