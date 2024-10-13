import React, { createContext, useState } from 'react';

export const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [earnedBadges, setEarnedBadges] = useState([]);

  const addBadge = (badge) => {
    if (!earnedBadges.includes(badge)) {
      setEarnedBadges([...earnedBadges, badge]);
    }
  };

  return (
    <BadgeContext.Provider value={{ earnedBadges, addBadge }}>
      {children}
    </BadgeContext.Provider>
  );
};
