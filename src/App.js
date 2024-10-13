import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RulesPage from './components/RulesPage';
import ChallengePage from './components/ChallengePage';
import ConcludingPage from './components/ConcludingPage';
import Navbar from './components/Navbar';
import { TimerProvider } from './TimerContext';
import { BadgeProvider } from './BadgeContext';

function App() {
  return (
    <Router>
      <TimerProvider>
        <BadgeProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/challenge/:id" element={<ChallengePage />} />
            <Route path="/conclusion" element={<ConcludingPage />} />
          </Routes>
        </div>
        </BadgeProvider>
      </TimerProvider>
    </Router>
  );
}

export default App;
