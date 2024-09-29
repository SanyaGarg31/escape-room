// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FirstChallenge from './pages/FirstChallenge';
import SecondChallenge from './pages/SecondChallenge';
import ThirdChallenge from './pages/ThirdChallenge';
import FourthChallenge from './pages/FourthChallenge';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <>
    <NavigationBar />
    <Router>
      <Routes>
        <Route path="/" element={<FirstChallenge />} />
        <Route path="second_challenge" element={<SecondChallenge />} />
        <Route path="third_challenge" element={<ThirdChallenge />} />
        <Route path="fourth_challenge" element={<FourthChallenge />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
