import React, { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-container">
      <button onClick={toggleMenu}>
        ☰
      </button>
      {/* {isOpen && (
        <div className="progress-menu">
          <p>Current Progress:</p>
          <ul>
            <li>Challenges Completed: 3/6</li>
            <li>Badges Earned: 3</li>
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default HamburgerMenu;
