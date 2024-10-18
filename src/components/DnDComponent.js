import React, { useState, useContext } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from 'react-bootstrap/Button';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge3.png';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import badge3 from'../assets/badge3.png';

const ItemTypes = {
  ITEM: 'item',
};

const DraggableItem = ({ item, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id: item.id, type: type, value: item.value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {item.value}
    </div>
  );
};

const DropArea = ({ label, items, setItems, allowedTypes }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    canDrop: (item) => allowedTypes.includes(item.type),
    drop: (item) => {
      if (!items.some((i) => i.type === item.type)) {
        setItems((prevItems) => [...prevItems, item]);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}
    >
      <h4>{label}</h4>
      {items.map((item, index) => (
        <div key={index}>{item.value}</div>
      ))}
    </div>
  );
};

// GlamInfo Component 
const GlamInfo = () => {
  const boxStyle = {
    border: '2px solid #B59D1E',
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    backgroundColor: '#fff',
  };

  const headerStyle = {
    color: '#B59D1E',
    textAlign: 'center',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  };

  return (
    <div style={boxStyle}>
      <h2 style={headerStyle}>Glam Inc</h2>
      <p style={paragraphStyle}>
        <strong>Glam Inc.</strong> is a renowned cosmetics company specializing in high-quality beauty products, ranging from skincare to makeup. Established in 2010, the company has built a loyal customer base with its commitment to innovation and excellence.
      </p>
      <p style={paragraphStyle}>
        Glam Inc. operates from Monday to Saturday, 9 AM to 9 PM, focusing on providing exceptional customer service and a wide variety of products to meet the diverse needs of its clientele. Normal transaction ranges from 50,000 - 1,00,000.
      </p>
      <p style={paragraphStyle}>
        The company’s headquarters is located in Mumbai, India, where it oversees production and distribution.
      </p>
    </div>
  );
};

const DnDComponent = () => {
  const [suspiciousItems, setSuspiciousItems] = useState([]);
  const [usualItems, setUsualItems] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { earnedBadges, addBadge } = useContext(BadgeContext);
  const navigate = useNavigate();

  const transactionTimings = [
    { id: 1, value: 'Monday - 10:47 AM', type: 'timing' },
    { id: 2, value: 'Tuesday - 10:48 PM', type: 'timing' },
  ];

  const transactionAmounts = [
    { id: 3, value: '₹2,00,000', type: 'amount' },
    { id: 4, value: '₹1,00,000', type: 'amount' },
  ];

  const vendorNames = [
    { id: 5, value: 'Beauty Supply Co.', type: 'vendor' },
    { id: 6, value: 'GreenThumb Fertilizers', type: 'vendor' },
  ];

  const correctSuspicious = [
    { value: '₹2,00,000', type: 'amount' },
    { value: 'Tuesday - 10:48 PM', type: 'timing' },
    { value: 'GreenThumb Fertilizers', type: 'vendor' },
  ];

  const correctUsual = [
    { value: 'Beauty Supply Co.', type: 'vendor' },
    { value: 'Monday - 10:47 AM', type: 'timing' },
    { value: '₹1,00,000', type: 'amount' },
  ];

  const handleNext = () => {
    navigate(`/challenge/4`);
  };

  const validateAnswers = () => {
    const isSuspiciousCorrect =
      suspiciousItems.length === correctSuspicious.length &&
      suspiciousItems.every((item) =>
        correctSuspicious.some(
          (correctItem) =>
            correctItem.value === item.value && correctItem.type === item.type
        )
      );

    const isUsualCorrect =
      usualItems.length === correctUsual.length &&
      usualItems.every((item) =>
        correctUsual.some(
          (correctItem) =>
            correctItem.value === item.value && correctItem.type === item.type
        )
      );

    if (isSuspiciousCorrect && isUsualCorrect) {
      setFeedback('Correct!');
      setIsCompleted(true);
      addBadge(badge);
    } else {
      setFeedback('Incorrect! Please try again.');
      setIsCompleted(false);
    }
  };

  const resetGame = () => {
    setSuspiciousItems([]);
    setUsualItems([]);
    setFeedback('');
  };

  return (
    <div>
      {!isCompleted ? (
        <>
          <GlamInfo /> {/* Adding the GlamInfo component at the top */}

          <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <h4>Transaction Timings</h4>
                {transactionTimings.map((item) => (
                  <DraggableItem key={item.id} item={item} type={item.type} />
                ))}
              </div>

              <div>
                <h4>Transaction Amounts</h4>
                {transactionAmounts.map((item) => (
                  <DraggableItem key={item.id} item={item} type={item.type} />
                ))}
              </div>

              <div>
                <h4>Vendor Names</h4>
                {vendorNames.map((item) => (
                  <DraggableItem key={item.id} item={item} type={item.type} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <DropArea
                label="Suspicious Behaviour"
                items={suspiciousItems}
                setItems={setSuspiciousItems}
                allowedTypes={['timing', 'amount', 'vendor']}
              />
              <DropArea
                label="Usual Business Behaviour"
                items={usualItems}
                setItems={setUsualItems}
                allowedTypes={['timing', 'amount', 'vendor']}
              />
            </div>

            <div className='row' style={{ marginTop: '30px', textAlign: 'center' }}>
              <div className='row d-inline-flex justify-content-center'>
                <div className='col' style={{ maxWidth: 'fit-content' }}>
                  <Button variant="primary" size="sm" onClick={validateAnswers}>Submit</Button>
                </div>
                <div className='col' style={{ maxWidth: 'fit-content' }}>
                  <Button variant="secondary" size="sm" onClick={resetGame}>Reset</Button>
                </div>
              </div>
              <div className='row my-3' style={{ color: 'red' }}>
                <h3>{feedback}</h3>
              </div>
            </div>
          </DndProvider>
        </>
      ) : (
        <>
          <Confetti />
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'green', fontSize: '48px' }}>Congratulations!</h1>
            <p style={{ fontSize: '24px' }}>You've earned the badge for this challenge.</p>
            <img
              src={badge3}  // Use badge instead of currentChallenge.badge
              alt={`Badge for challenge 3\'`}
              style={{ height: '200px', margin: '20px auto', display: 'block' }}
            />
            <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DnDComponent;
