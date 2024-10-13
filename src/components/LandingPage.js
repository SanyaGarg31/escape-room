import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import image from '../assets/landingPageImage.png'
import Typewriter from 'typewriter-effect';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (username) {
      navigate('/rules');
    }
  };

  return (
    <div style={{ backgroundColor: "transparent", width: "max-width", minHeight: "91vh", display: "flex" }}>
      <div className='lefty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2", padding: "60px" }}>
        <div className='first-word' style={{ fontSize: "70px", color: "#e31836", fontWeight: "900" }}>
          DIGITAL
        </div>
        <div className='big-text' style={{ fontSize: "100px", color: "#012269",fontWeight: "900" }}>
          <Typewriter
            options={{
              strings: ['ESCAPE'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className='last-word' style={{ fontSize: "70px", color: "#e31836", fontWeight: "900" }}>
          ROOM.
        </div>
        <InputGroup className="mb-3">
          <Form.Control id="basic-url" 
          aria-describedby="basic-addon3"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)} />
        </InputGroup>
        <div className='entry-button'>
          <Button variant="danger" onClick={handleStart}>Enter</Button>{' '} 
        </div>
      </div>
      <div className='righty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2" }}>
        <img src={image} alt="LandingPage" style={{ marginRight: "3rem", marginTop: "1rem" }} />
      </div>
    </div>
  );
};

export default LandingPage;
