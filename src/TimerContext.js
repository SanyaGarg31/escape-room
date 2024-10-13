import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate(); 
  useEffect(() => {
    let timer;
    if (timerStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      navigate('/conclusion')
    }

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  const resetTimer = () => {
    setTimeLeft(1800); 
    setTimerStarted(false);
  };

  return (
    <TimerContext.Provider value={{ timeLeft, setTimerStarted, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
