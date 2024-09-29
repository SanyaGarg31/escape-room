import React from 'react'
import { useState } from 'react'
import svgArrow from '../assets/right-arrow.svg'

export default function InputSection({disabledField, passwordValidated, challenge}) {
    const [password, setPassword] = useState()
    const [hideButton, setHideButton] = useState(true)
    const [success, setSuccess]  =useState(false)
    const validate = () => {
        if(challenge === "third_challenge"){
            if(password==="http"){
                setHideButton(false);
                passwordValidated();
                setSuccess(true);
            }
        }else if (challenge === "fourth_challenge"){
            if(password==="4096"){
                setHideButton(false);
                passwordValidated();
                setSuccess(true);
            }
        }
        else if(challenge === "second_challenge"){
            if(password==="secret1"){
                setHideButton(false);
                passwordValidated();
                setSuccess(true);
            }
        }else{
            if(password==="secret1"){
                setHideButton(false);
                passwordValidated();
                setSuccess(true);
            }
        }
    }
  return (
    <div>
    <div className='input-section'>
        <h1>TRY YOUR LUCK.</h1>
        <div className='input-container'>
        <input placeholder='Guess the password' disabled={disabledField} className="input-value" type="text" onChange={(e) => setPassword(e.target.value.toLowerCase())} />
        <img src={svgArrow} alt="svgArrow" className='submit' onClick={validate} disabled={disabledField} height={35} width={35} />
        </div>
        {success && <div className='sucess-message'>
            <span style={{color: "green"}}>Success.</span>
        </div>}
    </div>
    {!hideButton && <div className="next-button">
            <a style={{color: "white"}} href={challenge}>NEXT</a>
        </div>}
    </div>
  )
}
