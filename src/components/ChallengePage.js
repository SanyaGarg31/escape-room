import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BadgeContext } from '../BadgeContext';
import badges from '../assets/badges.svg'
import badge from '../assets/badge.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';  

const challenges = [
  {
    id: 1,
    scenario: "The CFO receives a suspicious email that looks like it’s from the CEO, asking for access to confidentialVaultX blueprints. You must determine if the message is genuine or if it’s a spoof.",
    badge: badges,
    correctAnswer: "a"
  },
  {
    id: 2,
    scenario: "You uncover that there is an upcoming scheduled major wire transfer—originally meant to send from"+
    "one of SecureBank’s top clients—has been tampered with. Upon closer examination, you realize that"+
    "the funds, instead of going to the intended recipient, have been rerouted to a suspicious"+
    "organization and duplicate transaction log has been scheduled before the actual transaction."+
    "To buy themselves more time, the hackers have encrypted all the recipient’s names of the database"+
    "using an old-school cipher technique, masking the final destination of the funds."+
    "Your challenge is to identify the transaction log and decrypt the fictitious recipient’s name before the"+
    "transaction goes through. Time is ticking, and if you don’t act fast, the money will be transferred to a"+
    "criminal organization.",
    badge: badge,
    correctAnswer: "b"
  },
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
      setAnswer('');
      setIsCompleted(false);
      setShowError(false);
    }, [id]);
  
    const handleSubmit = () => {
      if (answer.toLowerCase() === currentChallenge.correctAnswer) {
        setIsCompleted(true);
        setShowError(false);
        addBadge(currentChallenge.badge);
      } else {
        setShowError(true);
      }
    };
  
    const handleNext = () => {
      if (parseInt(id) < challenges.length) {
        navigate(`/challenge/${parseInt(id) + 1}`);
      } else {
        navigate('/conclusion');
      }
    };
  
    return (
      <div className="challenge-page" style={{padding: "50px"}}>
        <div className="badge-section" style={{textAlign:"right"}}>
          <p>Badge up for grab: <img src={currentChallenge.badge} alt={`Badge for challenge ${id}`} style={{height:"50px"}} /></p>
        </div>
        <h2><b>CHALLENGE {id}</b></h2>
        <p>{currentChallenge.scenario}</p>
        
        
        {!isCompleted ? (
          <>
            
      <InputGroup className="mb-3 mx-auto">
        <Form.Control
          placeholder="Enter your answer"
          aria-label="Enter your answer"
          aria-describedby="basic-addon2"
          type="text"
        value={answer}
        onChange={(e)=> setAnswer(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSubmit} id="button-addon2">
          Submit
        </Button>
      </InputGroup>
            {showError && <p className="error" style={{color:'red'}}>Incorrect answer, try again.</p>}
            
          </>
        ) : (
          <>
            <p style={{color:"green"}}>Congratulations! You've earned the badge for this challenge.</p>
            <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
          </>
        )}
      </div>
    );
  };

export default ChallengePage;
