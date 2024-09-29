// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import Timer from '../components/Timer'
import InputSection from '../components/InputSection'

const FirstChallenge = () => {
    const challengefirst = "second_challenge"
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
            <h1>FIRST CHALLENGE</h1>
        </div>
        <div className="description">
        <div className="description-heading" style={{color:"red"}}>
            <h2>CHALLENGE DESCRIPTION</h2>
        </div>
        <div className="description-content">
        <p>Jim was sitting in the company cafeteria when he noticed an unlocked computer lying unattended on a table. He looked around, but no one was there. To his surprise, he found a file named passwords.txt located on the desktop. He double-clicked on the file, and found the following contents. Given that he has Telnet access to log into the servers, he decided to give it a try. But, whoosh! He was unable to succeed.
Based on his observations, Jim deduced that the password appeared to be encoded.
Can you help Jim decode the password so he can proceed further?</p>
        </div>
        </div>
        <Dropdown />
    </div>
    <div className="right-section">
        <Timer handleTimeout={handleTimeout} stopTimer={stopTimer} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <InputSection disabledField={disabledField} passwordValidated={passwordValidated} challenge={challengefirst} />
    </div>
    </div>
  )
}

export default FirstChallenge

// const styles = StyleSheet.create({})