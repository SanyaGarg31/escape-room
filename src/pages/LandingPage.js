import React from 'react'
import image from '../assets/landingPageImage.jpeg'
import Typewriter from 'typewriter-effect';
import { Link, useHref } from "react-router-dom";
import FirstChallenge from './FirstChallenge';

export default function LandingPage() {
    return (
        <div style={{ backgroundColor: "#F5F5F5", width: "max-width", minHeight: "91vh", display: "flex" }}>
            <div className='lefty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2", padding: "60px" }}>
                <div className='first-word' style={{ fontSize: "80px", color: "#e31836", fontWeight: "1000" }}>
                    DIGITAL
                </div>
                <div className='big-text' style={{ fontSize: "110px", color: "#012269" }}>
                    <Typewriter
                        options={{
                            strings: ['ESCAPE'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className='last-word' style={{ fontSize: "80px", color: "#e31836", fontWeight: "1000" }}>
                    ROOM.
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className='entry-button'>
                    <Link
                        className="btn btn-pink"
                        role="button"
                        to="first_challenge"
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '18px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: '1px solid white',
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        Start Challenge!
                    </Link>
                </div>
            </div>
            <div className='righty-section' style={{ flexBasis: "50%", border: "0px solid white", zIndex: "2" }}>
                <img src={image} alt="LandingPage" style={{ marginRight: "3rem", marginTop: "1rem" }} />
            </div>
        </div>
    )
}
