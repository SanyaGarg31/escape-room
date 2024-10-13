import React, { useContext, useState } from 'react';
import { TimerContext } from '../TimerContext';
import './Navbar.css';
import logo from '../assets/BoaLogoSvg.svg';

const Navbar = () => {
  const { timeLeft } = useContext(TimerContext);
  const [showMenu, setShowMenu] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" href="/" />
      </div>
      <div className="timer">
        Time Left: {formatTime(timeLeft)}
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>
      {showMenu && (
        <div className="menu-content">
          <p>Progress: Check your current challenge and progress here!</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
