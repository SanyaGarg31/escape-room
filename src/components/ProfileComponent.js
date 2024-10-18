import React, { useState, useContext } from 'react';
import './ProfileComponent.css';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge6.svg';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import icon1 from '../assets/profile1.jpeg';
import icon2 from '../assets/profile2before.png';
import icon3 from '../assets/profile3.png';
import icon4 from '../assets/profile4.jpeg';
import icon5 from '../assets/profile5.jpg';
import icon6 from '../assets/profile2after.png';
import Confetti from 'react-confetti';

const profiles = [
    {
        id: 1,
        username: 'Jane Klark',
        fullName: 'Jane Stark',
        lastLogin: '10:30 AM from New York',
    },
    {
        id: 2,
        username: 'John Starnet',
        fullName: 'John Starnet',
        lastLogin: '8:00 AM from Dallas',
    },
    {
        id: 3,
        username: 'Rob Wombat',
        fullName: 'Rob Wombat',
        lastLogin: '9:45 AM from Seattle',
    },
    {
        id: 4,
        username: 'Mark Fletcher',
        fullName: 'Mark Fletcher',
        lastLogin: '11:40 AM from Chicago',
    },
    {
        id: 5,
        username: 'Emily Quinn',
        fullName: 'Emily Quinn',
        lastLogin: '8:00 AM from Boston',
    },
];

const Profile = ({ profile, handleClick, isCorrect, isIncorrect, disabled }) => {
    const profileIcons = {
        1: icon1,
        2: icon2,
        3: icon3,
        4: icon4,
        5: icon5,
    };

    return (
        <div
            className={`profile ${isCorrect ? 'correct-profile' : ''} ${isIncorrect ? 'incorrect-profile' : ''}`}
            onClick={!disabled ? () => handleClick(profile.id) : null}
        >
            <div className="profile-icon-container">
                <img 
                    src={isCorrect ? icon6 : profileIcons[profile.id]} 
                    alt={`Profile ${profile.id} icon`} 
                    className="profile-icon"
                />
            </div>
            <h2>Profile {profile.id}</h2>
            <p>Username: {profile.username}</p>
            <p>Full Name: {profile.fullName}</p>
            <p>Last Login: {profile.lastLogin}</p>
        </div>
    );
};

export default function ProfileComponent() {
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [tries, setTries] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const { addBadge } = useContext(BadgeContext);
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/conclusion'); // Navigates to ConcludingPage.js
    };

    const handleClick = (id) => {
        if (gameOver) return;

        setSelectedProfile(id);
        setTries(tries + 1);

        if (id === 2) { // Assuming profile with id 2 is the correct one
            setSuccess(true);
            setIsCompleted(true);
            addBadge(badge);
        } else if (tries + 1 >= 3) {
            setIsCompleted(true);
            setGameOver(true);
        }
    };

    return (
        <div className="App">
            {isCompleted ? (
                <div className="message">
                    {success && <Confetti />}
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1 style={{ color: 'green', fontSize: '48px' }}>Congratulations!</h1>
                        <p style={{ fontSize: '24px' }}>You've earned the badge for this challenge.</p>
                        <img
                            src={badge}
                            alt={`Badge for challenge`}
                            style={{ height: '200px', margin: '20px auto', display: 'block' }}
                        />
                        <Button variant="outline-secondary" onClick={handleNext}>Finish</Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="profile-container">
                        <div className="row">
                            {profiles.slice(0, 3).map((profile) => (
                                <div className="col" key={profile.id}>
                                    <Profile
                                        profile={profile}
                                        handleClick={handleClick}
                                        isCorrect={profile.id === selectedProfile && profile.id === 2}
                                        isIncorrect={profile.id === selectedProfile && profile.id !== 2}
                                        disabled={gameOver}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row">
                            {profiles.slice(3).map((profile) => (
                                <div className="col" key={profile.id}>
                                    <Profile
                                        profile={profile}
                                        handleClick={handleClick}
                                        isCorrect={profile.id === selectedProfile && profile.id === 2}
                                        isIncorrect={profile.id === selectedProfile && profile.id !== 2}
                                        disabled={gameOver}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {!gameOver && <p>Attempts left: {3 - tries}</p>}
                </>
            )}
        </div>
    );
}
