import { useState, useEffect, useRef } from 'react'


function App() {
  const [shift, setShift] = useState(3); // Default shift
  const canvasRef = useRef(null);

  const renderCircles = (shift) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
    const numbers = Array.from({ length: 26 }, (_, i) => i); // 0-25
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the outer circle (A-Z)
    const outerRadius = 240;
    const innerCharRadius = 210
    const innerNumRadius = 180;

    letters.forEach((char, index) => {
      const angle = ((index + shift) / letters.length) * (2 * Math.PI); // Adjust index for clockwise shift
      const x = 400 + outerRadius * Math.cos(angle);
      const y = 400 + outerRadius * Math.sin(angle);
      
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Shifted character calculation
      // const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      ctx.fillText(char, x, y);
    });

    letters.forEach((char, index) => {
      const angle = (index / letters.length) * (2 * Math.PI);
      const x = 400 + innerCharRadius * Math.cos(angle);
      const y = 400 + innerCharRadius * Math.sin(angle);

      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(char, x, y);
    });

    // Draw numbers 0-25
    numbers.forEach((num, index) => {
      const angle = (index / numbers.length) * (2 * Math.PI);
      const x = 400 + innerNumRadius * Math.cos(angle);
      const y = 400 + innerNumRadius * Math.sin(angle);

      ctx.fillStyle = 'blue'; // Color for numbers
      ctx.fillText(num, x, y);
    });
  };

  useEffect(() => {
    renderCircles(shift);
  }, [shift]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Circular Caesar Cipher</h2>
      <label>
        Shift:
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          min="0"
          max="25"
        />
      </label>
      <br />
      <canvas ref={canvasRef} width="800" height="800" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default App
