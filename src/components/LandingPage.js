import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/landingPageImage.png'
import Typewriter from 'typewriter-effect';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (username && email1 && email2 && email3) {
      navigate('/rules');
    }
  };

  return (
    <div style={{ backgroundColor: "transparent", width: "max-width", minHeight: "91vh", display: "flex" }}>
      <div className='lefty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2", padding: "60px" }}>
        <div className='first-word' style={{ fontSize: "70px", color: "#e31836", fontWeight: "900" }}>
          DIGITAL
        </div>
        <div className='big-text' style={{ fontSize: "100px", color: "#012269", fontWeight: "900" }}>
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

        {/* Username Input */}
        <InputGroup className="mb-3" style={{ marginBottom: "20px" }}>
          <Form.Control 
            id="basic-url" 
            aria-describedby="basic-addon3" 
            type="text" 
            placeholder="Enter your Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ borderRadius: "10px", padding: "10px", fontSize: "16px" }}
          />
        </InputGroup>

        {/* Team Email Inputs */}
        <InputGroup className="mb-3" style={{ marginBottom: "10px" }}>
          <Form.Control 
            type="email" 
            placeholder="Team Player 1 Email"
            value={email1} 
            onChange={(e) => setEmail1(e.target.value)} 
            style={{
              borderRadius: "10px", 
              padding: "10px", 
              fontSize: "16px", 
              border: "2px solid #012269",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)"
            }}
          />
        </InputGroup>

        <InputGroup className="mb-3" style={{ marginBottom: "10px" }}>
          <Form.Control 
            type="email" 
            placeholder="Team Player 2 Email"
            value={email2} 
            onChange={(e) => setEmail2(e.target.value)} 
            style={{
              borderRadius: "10px", 
              padding: "10px", 
              fontSize: "16px", 
              border: "2px solid #012269",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)"
            }}
          />
        </InputGroup>

        <InputGroup className="mb-3" style={{ marginBottom: "20px" }}>
          <Form.Control 
            type="email" 
            placeholder="Team Player 3 Email"
            value={email3} 
            onChange={(e) => setEmail3(e.target.value)} 
            style={{
              borderRadius: "10px", 
              padding: "10px", 
              fontSize: "16px", 
              border: "2px solid #012269",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)"
            }}
          />
        </InputGroup>

        {/* Entry Button */}
        <div className='entry-button'>
          <Button 
            variant="danger" 
            onClick={handleStart}
            style={{ borderRadius: "8px", padding: "10px 20px", fontSize: "18px" }}
          >
            Enter
          </Button>{' '}
        </div>
      </div>

      <div className='righty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2" }}>
        <img src={image} alt="LandingPage" style={{ marginRight: "3rem", marginTop: "1rem" }} />
      </div>
    </div>
  );
};

export default LandingPage;
