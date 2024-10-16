import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BadgeContext } from '../BadgeContext';
import badge1 from '../assets/badge1.svg'
import badge2 from '../assets/badge2.svg'
import badge3 from '../assets/badge3.png'
import badge4 from '../assets/badge4.png'
import badge5 from '../assets/badge5.png'
import badge6 from '../assets/badge6.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CipherWheel from './CipherWheel';
import DnDComponent from './DnDComponent';
import EmailComponent from './EmailComponent';
import compareUrls from 'compare-urls';
import NoteComponent from './NoteComponent';
import ProfileComponent from './ProfileComponent';
import MatchsetComponent from './MatchsetComponent';

const challenges = [
  {
    id: 1,
    scenario: "The CFO receives a suspicious email that looks like it’s from the CEO, asking for access to confidentialVaultX blueprints. You must determine if the message is genuine or if it’s a spoof.",
    badge: badge1,
    correctAnswer: "securebaank"
  },
  {
    id: 2,
    scenario: "You uncover that there is an upcoming scheduled major wire transfer—originally meant to send from" +
      "one of SecureBank’s top clients—has been tampered with. Upon closer examination, you realize that" +
      "the funds, instead of going to the intended recipient, have been rerouted to a suspicious" +
      "organization and duplicate transaction log has been scheduled before the actual transaction." +
      "To buy themselves more time, the hackers have encrypted all the recipient’s names of the database" +
      "using an old-school cipher technique, masking the final destination of the funds." +
      "Your challenge is to identify the transaction log and decrypt the fictitious recipient’s name before the" +
      "transaction goes through. Time is ticking, and if you don’t act fast, the money will be transferred to a" +
      "criminal organization.",
    badge: badge2,
    correctAnswer: "tenrats"
  },
  {
    id: 3,
    scenario: "You’ve successfully decrypted the recipient's name from the tampered transaction, but the danger" +
      "isn’t over. The trail of suspicious activity leads to an alarming claim by one of SecureBank’s high-value" +
      "customer Glam Inc. They insist they never opened a suspicious account linked to VaultX. Could this" +
      "be a cover-up or a case of mistaken identity?" +
      "Your mission is to investigate the suspicious account tied to this high-value customer. You need to" +
      "determine if the account was fraudulently created or if the customer is telling the truth. Use your" +
      "analytical skills to compare user profiles and transaction histories.",
    badge: badge3,
    correctAnswer: "c"
  },
  {
    id: 4,
    scenario: "You’ve successfully identified the suspicious account tied to Glam Inc., but the danger doesn’t end" +
      "there. While reviewing the account's details, you stumble upon alarming evidence of a data breach" +
      "involving VaultX. Critical customer prototypes are being leaked online, and the hackers have locked" +
      "you out of VaultX's database, securing it with a digital lock. You must quickly unlock the data vault" +
      "before more sensitive information falls into the wrong hands. The integrity of SecureBank and the" +
      "safety of its clients depend on your quick thinking and problem-solving skills.",
    badge: badge4,
    correctAnswer: "something"
  },
  {
    id: 5,
    scenario: "SecureBank’s servers are under a massive DDoS attack, causing service outages. You must manage"+
"the network and block the attackers before the system crashes. You are facing a series of relentless"+
"waves of incoming traffic, represented by digital packets. Your mission is to strategically deploy"+
"various defense mechanisms to block and redirect these attacks before our servers become"+
"overloaded and crash. It’s time to combat and bring out your best defenses. Will you yield? or will"+
"you defend?",
    badge: badge5,
    correctAnswer: "securebaank"
  },
  {
    id: 6,
    scenario: "The Vaultbreakers have gained admin-level access to VaultX’s core systems. You must revoke their"+
"access and prevent them from shutting down the entire platform just before the global launch."+
"You have to find the imposter admin to revoke their access.",
    badge: badge6,
    correctAnswer: "securebaank"
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
      console.log(answer, currentChallenge.correctAnswer);
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
    <div className="challenge-page" style={{ padding: "0 50px" }}>
      {!isCompleted ? ((
        <div className="badge-section" style={{ textAlign: "right" }}>
        <p>Badge up for grab: <img src={currentChallenge.badge} alt={`Badge for challenge ${id}`} style={{ height: "50px" }} /></p>
      </div>
      )): (
        <div className="badge-section" style={{ textAlign: "right" }}>
        <p><img hidden='true' src={currentChallenge.badge} alt={`Badge for challenge ${id}`} style={{ height: "50px" }} /></p>
      </div>
      )}
      <h2><b>CHALLENGE {id}</b></h2>
      <p>{currentChallenge.scenario}</p>


      {!isCompleted ? currentChallenge.id === 1 ? (
        <>
          <EmailComponent></EmailComponent>
          <br></br>
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
      ) : currentChallenge.id === 2 ? (
        <>
          <CipherWheel></CipherWheel>
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
      ) : currentChallenge.id === 3 ? (
        (
          <>
            <DnDComponent></DnDComponent>
          </>
        )
      ) : currentChallenge.id === 4 ? (
        <>
        <NoteComponent></NoteComponent>
        </>
      ): currentChallenge.id ===5 ? (
        <>
        <MatchsetComponent></MatchsetComponent>
        </>
      ) : currentChallenge.id === 6 ? (
        <>
        <ProfileComponent></ProfileComponent>
        </>
      ) :  (
        <>

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
          <p style={{ color: "green" }}>Congratulations! You've earned the badge for this challenge.</p>
          <p>You're awarded<img src={currentChallenge.badge} alt={`Badge for challenge ${id}`} style={{ height: "50px" }} /></p>
          <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
        </>
      )}
    </div>
  );
};

export default ChallengePage;
