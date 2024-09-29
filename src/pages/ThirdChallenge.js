// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import Timer from '../components/Timer'
import InputSection from '../components/InputSection'
import image from '../assets/challengeThree.jpg'
import ImageModal from '../components/ImageModal'

const FirstChallenge = () => {
    const challengeThird = "fourth_challenge"
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
            <h1>Third Challenge</h1>
        </div>
        <div className="description">
        <div className="description-heading" style={{color:"red"}}>
            <h2>CHALLENGE DESCRIPTION</h2>
        </div>
        <div className="description-content">
        <p>After capturing several employees' credentials, Jim decides to use a senior leader's credentials to access the organization's proprietary datastore, where confidential information is stored. He successfully logs into the datastore using the stolen username and password but is unexpectedly prompted for Multi Factor Authentication (MFA).<br></br><br></br>

Now, he needs to steal the MFA code from the senior leader's mobile device. To do this, he configures a payload to steal the OTP from the MFA application on the device. He binds the payload to a legitimate Android app and sends it to the victim, who unknowingly installs the malicious app.<br></br><br></br>

SOC analysts, while reviewing the datastore logs, discover the stolen MFA OTP and confiscate the senior leader's mobile device. They now need to determine which website the malicious Android app was communicating with. Refer to the screenshot below and enter the bytes corresponding to the malicious website domain.</p>
        </div>
        </div>
        {/* <Dropdown /> */}
        <ImageModal image={image} />
    </div>
    <div className="right-section">
        <Timer handleTimeout={handleTimeout} stopTimer={stopTimer} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <InputSection disabledField={disabledField} passwordValidated={passwordValidated} challenge={challengeThird} />
    </div>
    </div>
  )
}

export default FirstChallenge