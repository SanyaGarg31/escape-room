import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/BoaLogoSvg.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing close icon
import RoadMap from './RoadMap';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "15px" }}>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

          {/* Hamburger menu icon */}
          <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
            <FaBars size={24} />
          </div>
        </Container>
      </Navbar>

      {/* Slide-out menu */}
      <div
        ref={menuRef} // Reference to the menu container
        style={{
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-250px', // Slide in from right
          height: '100vh',
          width: '250px',
          backgroundColor: '#f8f9fa',
          transition: 'right 0.3s ease',
          boxShadow: isMenuOpen ? '0px 0px 10px rgba(0, 0, 0, 0.1)' : 'none',
          zIndex: 1000, // Ensure the menu stays above other elements
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <FaTimes size={24} style={{ cursor: 'pointer' }} onClick={toggleMenu} />
        </div>
        <Container style={{ padding: '20px' }}>
        <RoadMap totalChallenges={5} currentChallenge={2} progress={60} />
        </Container>
      </div>
    </>
  );
}
