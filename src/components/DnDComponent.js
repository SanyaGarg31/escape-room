import React, { useState, useContext } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from 'react-bootstrap/Button';
import { BadgeContext } from '../BadgeContext';
import badge from '../assets/badge3.png'
import { useNavigate } from 'react-router-dom';

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
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: '8px' }}>
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
    <div ref={drop} style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}>
      <h4>{label}</h4>
      {items.map((item, index) => (
        <div key={index}>{item.value}</div>
      ))}
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

  // Define the correct answers for validation
  const correctSuspicious = [
    { value: '₹2,00,000', type: 'amount' },
    { value: 'Tuesday - 10:48 PM', type: 'timing' },
    { value: 'GreenThumb Fertilizers', type: 'vendor' }
  ];

  const correctUsual = [
    { value: 'Beauty Supply Co.', type: 'vendor' },
    { value: 'Monday - 10:47 AM', type: 'timing' },
    { value: '₹1,00,000', type: 'amount' },
  ];
  const handleNext = () => {
    navigate(`/challenge/4`);
  };
  // Function to validate the answers
  const validateAnswers = () => {
    const isSuspiciousCorrect =
      suspiciousItems.length === correctSuspicious.length &&
      suspiciousItems.every((item) =>
        correctSuspicious.some((correctItem) => correctItem.value === item.value && correctItem.type === item.type)
      );

    const isUsualCorrect =
      usualItems.length === correctUsual.length &&
      usualItems.every((item) =>
        correctUsual.some((correctItem) => correctItem.value === item.value && correctItem.type === item.type)
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

  // Function to reset the game
  const resetGame = () => {
    setSuspiciousItems([]);
    setUsualItems([]);
    setFeedback('');
  };

  return (
    <div>
      {!isCompleted ? ((
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

          <div className='row' style={{ marginTop: '30px', textAlign: "center" }}>

            <div className='row d-inline-flex justify-content-center' >
              <div className='col' style={{ maxWidth: 'fit-content' }}>
                <Button variant="primary" size="sm" onClick={validateAnswers}>Submit</Button>


              </div>
              <div className='col' style={{ maxWidth: 'fit-content' }}>
                <Button variant="secondary" size="sm" onClick={resetGame}>Reset</Button>
              </div>

            </div>
            <div className='row my-3' style={{color:"red"}}>
              <h3>{feedback}</h3>
            </div>
          </div>
        </DndProvider>
      )) : ((
        <>
          <p style={{ color: "green" }}>Congratulations! You've earned the badge for this challenge.</p>
          <p>You're awarded: <img src={badge} alt={`Badge for challenge`} style={{ height: "50px" }} /></p>
          <Button variant="outline-secondary" onClick={handleNext}>Next Challenge</Button>
        </>
      ))}
    </div>
  );
};

export default DnDComponent;
