// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FirstChallenge from './pages/FirstChallenge';
import SecondChallenge from './pages/SecondChallenge';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstChallenge />} />
        <Route path="second_challenge" element={<SecondChallenge />} />
      </Routes>
    </Router>
  );
}

export default App;
