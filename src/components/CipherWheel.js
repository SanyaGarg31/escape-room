import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './CipherWheel.css';

export default function CipherWheel() {
    const [shift, setShift] = useState(0); // Default shift
    const canvasRef = useRef(null);

    const renderCircles = (shift) => {
        const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
        const numbers = Array.from({ length: 26 }, (_, i) => i); // 0-25
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.height, canvas.width);

        // Center coordinates and radii
        const centerX = 400 / 1.2;
        const centerY = 400 / 1.2;
        const outerRadius = 250 / 1.2; // For outer circle
        const middleRadius = 200 / 1.2; // For middle circle
        const innerRadius = 150 / 1.2;  // For inner circle
        const textOffsetRadius = 225 / 1.2; // For outer letters
        const middleTextRadius = 175 / 1.2; // For middle letters
        const innerTextRadius = 125 / 1.2;  // For inner letters/numbers

        // Neon green for circles and spokes
        ctx.strokeStyle = '#00ff7f'; // Green neon for circles
        ctx.lineWidth = 2; // Slightly thicker lines

        // Draw three circles
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, middleRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw lines (spokes) from center to outer circle
        letters.forEach((char, index) => {
            const angle = (index / letters.length) * (2 * Math.PI);
            const xSpoke = centerX + outerRadius * Math.sin(angle);
            const ySpoke = centerY + outerRadius * Math.cos(angle);

            // Draw line from center to outer circle
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(xSpoke, ySpoke);
            ctx.strokeStyle = '#00ff7f'; // Green neon for spokes
            ctx.stroke();
        });

        // Place outer letters (A-Z)
        letters.forEach((char, index) => {
            const angle = ((index + shift) / letters.length) * (2 * Math.PI); // Adjust index for clockwise shift
            const x = centerX + textOffsetRadius * Math.cos(angle);
            const y = centerY + textOffsetRadius * Math.sin(angle);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#00ff7f'; // Neon green text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, x, y);
        });

        // Place middle letters (A-Z)
        letters.forEach((char, index) => {
            const angle = (index / letters.length) * (2 * Math.PI);
            const x = centerX + middleTextRadius * Math.cos(angle);
            const y = centerY + middleTextRadius * Math.sin(angle);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#00ff7f'; // Neon green text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, x, y);
        });

        // Place numbers (0-25) in the innermost circle
        numbers.forEach((num, index) => {
            const angle = (index / numbers.length) * (2 * Math.PI);
            const x = centerX + innerTextRadius * Math.cos(angle);
            const y = centerY + innerTextRadius * Math.sin(angle);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#00ff7f'; // Neon green text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(num, x, y);
        });
    };

    useEffect(() => {
        renderCircles(shift);
    }, [shift]);

    return (
        <div className="container mb-5">
            <div className="row d-flex justify-content-around">
                <div className="col" style={{ maxWidth: "fit-content" }}>
                    <div className="table-container">
                        <h2>Transaction Details</h2>
                        <table className="transaction-table">
                            <tbody>
                                <tr>
                                    <td>Transaction ID</td>
                                    <td>TXN#00123AB</td>
                                </tr>
                                <tr>
                                    <td>Date & Time</td>
                                    <td>14:33:22</td>
                                </tr>
                                <tr>
                                    <td>Sender's Account</td>
                                    <td>Global Investments Pvt. Ltd.</td>
                                </tr>
                                <tr>
                                    <td>Receiver's Account</td>
                                    <td>whqudwv</td>
                                </tr>
                                <tr>
                                    <td>Transaction Status</td>
                                    <td>In Progress</td>
                                </tr>
                                <tr>
                                    <td>Reference Invoice</td>
                                    <td>#5678</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col p-0" style={{ maxWidth: "fit-content" }}>
                    <div className="row">
                        <canvas ref={canvasRef} height="550px" width="550px" />
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col" style={{ maxWidth: "fit-content" }}>
                            <p className="shift-label">SHIFT:</p>
                        </div>
                        <div className="col" style={{ maxWidth: "fit-content" }}>
                            <input
                                type="number"
                                value={shift}
                                onChange={(e) => setShift(Number(e.target.value))}
                                min="0"
                                max="25"
                                className="shift-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
