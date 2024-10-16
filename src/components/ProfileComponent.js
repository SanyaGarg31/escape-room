import React, { useState, useContext } from 'react'
import './ProfileComponent.css'
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge6.svg'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
    return (
        <div
            className={`profile ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
            onClick={!disabled ? () => handleClick(profile.id) : null}
        >
            <div className="profile-icon">
                {isCorrect ? "🔓" : "🔒"}
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
    const { earnedBadges, addBadge } = useContext(BadgeContext);
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/conclusion`);
    };

    const handleClick = (id) => {
        if (gameOver) return;

        setSelectedProfile(id);
        setTries(tries + 1);

        if (id === 2) {
            setSuccess(true);
            setIsCompleted(true);
            addBadge(badge);
        } else if (tries + 1 >= 3) {
            setIsCompleted(true)
            setGameOver(true);
        }
    };

    return (
        <div className="App">
            {isCompleted ? gameOver ? ((
                <>
                    <p style={{ color: "red" }}>Oh Ho! Unfortunately you've exhausted all your attempts</p>
                    <Button variant="outline-secondary" onClick={handleNext}>Next</Button></>
            )) : ((
                <>
                    <p style={{ color: "green" }}>Congratulations! You've earned the badge for this challenge.</p>
                    <p>You're awarded: <img src={badge} alt={`Badge for challenge`} style={{ height: "50px" }} /></p>
                    <Button variant="outline-secondary" onClick={handleNext}>Next</Button>
                </>
            )) : ((
                <>
                    <div className="profile-container">
                        {/* First row with three profiles */}
                        <div className="row">
                            {profiles.slice(0, 3).map((profile) => (
                                <div className='col'>
                                    <Profile
                                        key={profile.id}
                                        profile={profile}
                                        handleClick={handleClick}
                                        isCorrect={profile.id === selectedProfile && profile.id === 2}
                                        isIncorrect={profile.id === selectedProfile && profile.id !== 2}
                                        disabled={gameOver}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Second row with two profiles centered below the first row */}
                        <div className="row">
                            {profiles.slice(3).map((profile) => (
                                <div className='col'>
                                    <Profile
                                        key={profile.id}
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

                    {gameOver && (
                        <div className="message">
                            {success ? (
                                <h2>Congratulations! You're correct!</h2>
                            ) : (
                                <h2>Sorry, that was incorrect!</h2>
                            )}
                        </div>
                    )}

                    {!gameOver && <p> Attempts left: {3 - tries} </p>}

                    <footer>Sometimes you need to look from a different perspective because a mirror never lies!</footer>
                </>
            ))}
        </div>
    );
}
