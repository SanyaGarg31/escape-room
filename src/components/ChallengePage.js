import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BadgeContext } from '../BadgeContext';
import badge1 from '../assets/badge1.svg';
import badge2 from '../assets/badge2.svg';
import badge3 from '../assets/badge3.png';
import badge4 from '../assets/badge4.png';
import badge5 from '../assets/badge5.png';
import badge6 from '../assets/badge6.svg';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CipherWheel from './CipherWheel';
import DnDComponent from './DnDComponent';
import EmailComponent from './EmailComponent';
import NoteComponent from './NoteComponent';
import ProfileComponent from './ProfileComponent';
import MatchsetComponent from './MatchsetComponent';
import Confetti from 'react-confetti';

const challenges = [
  {
    id: 1,
    scenario: "The CFO receives a suspicious email...",
    badge: badge1,
    rules: "Read the email carefully and enter the keyword that may be suspicious",
    correctAnswer: "securebaank",
    component: EmailComponent
  },
  {
    id: 2,
    scenario: "You uncover that there is an upcoming scheduled major wire transfer...",
    rules: "To decrypt the word...",
    badge: badge2,
    correctAnswer: "tenrats",
    component: CipherWheel
  },
  {
    id: 3,
    scenario: "You’ve successfully decrypted the recipient's name...",
    rules: "Read the email carefully and enter the keyword that may be suspicious",
    badge: badge3,
    component: DnDComponent
  },
  {
    id: 4,
    scenario: "You’ve successfully identified the suspicious account...",
    rules: "Read the email carefully and enter the keyword that may be suspicious",
    badge: badge4,
    correctAnswer: "something",
    component: NoteComponent
  },
  {
    id: 5,
    scenario: "SecureBank’s servers are under a massive DDoS attack...",
    rules: "Read the email carefully and enter the keyword that may be suspicious",
    badge: badge5,
    correctAnswer: "securebaank",
    component: MatchsetComponent
  },
  {
    id: 6,
    scenario: "The Vaultbreakers have gained admin-level access...",
    badge: badge6,
    rules: "Read the email carefully and enter the keyword that may be suspicious",
    correctAnswer: "securebaank",
    component: ProfileComponent
  }
];

const ChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { earnedBadges, addBadge } = useContext(BadgeContext);
  const currentChallenge = challenges.find(challenge => challenge.id === parseInt(id));

  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setAnswer(''); // Reset the answer input
    setIsCompleted(false); // Reset completion status
    setShowError(false); // Hide error messages
  }, [id]); // This ensures it works when challenge id changes

  const handleSubmit = () => {
    if (currentChallenge && answer.toLowerCase() === currentChallenge.correctAnswer) {
      setIsCompleted(true); // Mark as completed
      setShowError(false); // Hide error
      addBadge(currentChallenge.badge); // Add badge to earned badges
    } else {
      setShowError(true); // Show error on incorrect answer
    }
  };

  const handleNext = () => {
    if (parseInt(id) < challenges.length) {
      navigate(`/challenge/${parseInt(id) + 1}`);
    } else {
      navigate('/conclusion');
    }
  };

  const renderRoadmap = () => {
    return challenges.map((challenge) => {
      const isUnlocked = earnedBadges.includes(challenge.badge);
      return (
        <div key={challenge.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '30px', color: isUnlocked ? 'green' : 'gray' }}>
            {isUnlocked ? '🔓' : '🔒'}
          </div>
        </div>
      );
    });
  };

  const renderChallenge = () => {
    if (!currentChallenge) {
      return <p>Challenge not found.</p>;
    }

    const ChallengeComponent = currentChallenge.component || null;
    return ChallengeComponent ? <ChallengeComponent /> : null;
  };

  return (
    <div className="challenge-page" style={{ display: 'flex', padding: '0 50px' }}>
      {!isCompleted ? ( // Conditionally render the challenge scenario
        <div style={{ flex: 1 }}>
          <h2><b>CHALLENGE {id}</b></h2>

          {currentChallenge && <p>{currentChallenge.scenario}</p>}

          {!isCompleted && ![3, 4, 5, 6].includes(parseInt(id)) ? (
            <>
              {renderChallenge()}
              <InputGroup className="mb-3 mx-auto">
                <Form.Control
                  placeholder="Enter your answer"
                  aria-label="Enter your answer"
                  aria-describedby="basic-addon2"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleSubmit} id="button-addon2">
                  Submit
                </Button>
              </InputGroup>
              {showError && <p className="error" style={{ color: 'red' }}>Incorrect answer, try again.</p>}
            </>
          ) : (
            <>
              {renderChallenge()}
            </>
          )}
        </div>
      ) : ( // When completed, only show the badge and confetti
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Confetti />
          <h1 style={{ color: 'green', fontSize: '48px' }}>Congratulations!</h1>
          <p style={{ fontSize: '24px' }}>You've earned the badge for this challenge.</p>
          <img
            src={currentChallenge.badge}
            alt={`Badge for challenge ${id}`}
            style={{ height: '200px', margin: '20px auto', display: 'block' }}
          />
          <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
        </div>
      )}

      {!isCompleted && (
        <div style={{
          width: '300px',
          padding: '20px',
          marginLeft: '30px',
          backgroundColor: '#222', 
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.7)'
        }}>
          <div className='challenge-description'>
            <h2 style={{ color: '#012269' }}>Challenge {id} of 6</h2>
            {currentChallenge ? <p style={{ fontSize: '16px', color: '#eee' }}>{currentChallenge.rules}</p> : null}
          </div>
          <div className="roadmap" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '20px'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              width: '3px',
              backgroundColor: 'white',
              zIndex: '-1'
            }}></div>
            {renderRoadmap()}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4>Badges Earned</h4>
            {earnedBadges.map((badge, index) => (
              <img key={index} src={badge} alt={`Badge ${index + 1}`} style={{ width: '40px', margin: '5px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
