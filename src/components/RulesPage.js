import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../TimerContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import thirty from '../assets/thirtyMinutes.svg';
import badge from '../assets/badge.svg';
import timer from '../assets/timer.svg'

const RulesPage = () => {
  const { setTimerStarted, resetTimer } = useContext(TimerContext);
  const navigate = useNavigate();

  const startGame = () => {
    resetTimer(); 
    setTimerStarted(true); 
    navigate('/challenge/1');
  };

  return (
    <div className="container" style={{margin:"0 2rem"}}>
      <div className="silkscreen-regular" style={{textAlign: "center", marginTop:"2rem"}}>
        <h1>The Vaultbreaker Conspiracy</h1>
      </div>
      <div className="rules-description" style={{textAlign:"justify", margin:"2rem 8rem"}}>
      You take on the role of a rookie cyber detective at SecureBank, tasked with protecting VaultX, a
revolutionary new banking app. The bank is under attack by Vaultbreaker a notorious hacker group.
Your mission is to investigate the cyberattacks, stop the hackers, and ensure the app's safe launch.
      </div>
      <div className='rules-section' style={{margin:"2rem 8rem"}}>
        <div className="rules-point" style={{textAlign:'left', margin:"0 8rem"}}>
          <Row xs={1} md={3} className="g-4">
            <Col>
            <Card>
            <Card.Img variant="top" src={thirty} style={{height:"100px", marginTop:"2rem"}} />
            <Card.Body>
              <Card.Text>
              You have 30 minutes to complete 6 challenges. Press Start to Get Started.
              </Card.Text>
            </Card.Body>
          </Card>
            </Col>
            <Col>
            <Card>
            <Card.Img variant="top" src={badge} style={{height:"100px", marginTop:"2rem"}} />
            <Card.Body>
              <Card.Text>
              Earn a badge for every successfully completed challenge.
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card>
            <Card.Img variant="top" src={timer} style={{height:"100px", marginTop:"2rem"}} />
            <Card.Body>
              <Card.Text>
              If the timer runs out, your score will be based on the number of badges collected.
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          </Row>
        </div>
        <div className="rules-button" style={{textAlign:"center", marginTop:"4rem"}}>
        <Button variant="success" onClick={startGame}>Start</Button>{' '}
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
