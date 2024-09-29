// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import Timer from '../components/Timer'
import InputSection from '../components/InputSection'
import ImageModal from '../components/ImageModal'
import image from '../assets/challengeTwo.png'

const FirstChallenge = () => {
    const challengeSecond = "third_challenge"
    const [disabledField, setDisabledField] = useState(false)
    const handleTimeout =() =>{
        setDisabledField(true)
    }
    const [stopTimer, setStopTimer] = useState(false);
    const passwordValidated =()=>{
        setStopTimer(true)
    }
  return (
    <div className="heading-container">
    <div className="left-section">
        <div className="title">
            <h1>SECOND CHALLENGE</h1>
        </div>
        <div className="description">
        <div className="description-heading" style={{color:"red"}}>
            <h2>CHALLENGE DESCRIPTION</h2>
        </div>
        <div className="description-content">
        <p>Jim has successfully logged and now he has gained access to the server that hosts employee attendance records. The organization mandates that every employee first log in to the website to record their timestamp. Since the website lacks KERBEROS, Jim knows employees must manually enter their usernames and passwords. He launches Wireshark to eavesdrop on the server, and get the attached result. He captures the credentials, but is confused. How could a FINTECH organization allow credentials and usernames to be transmitted in clear text over the network?<br></br><br></br> Can you help Jim figure out why the credentials are being sent in plain text on a website hosted on the internal server?</p>
        </div>
        </div>
        <ImageModal image={image} />
    </div>
    <div className="right-section">
        <Timer handleTimeout={handleTimeout} stopTimer={stopTimer} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <InputSection disabledField={disabledField} passwordValidated={passwordValidated} challenge={challengeSecond} />
    </div>
    </div>
  )
}

export default FirstChallenge

// const styles = StyleSheet.create({})