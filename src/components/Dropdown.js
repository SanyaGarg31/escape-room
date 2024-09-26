import React from 'react'
import { useState } from 'react'
import svg from '../assets/dropdown.svg'
import svgUp from '../assets/dropdown-upwards.svg'

export default function Dropdown() {
    const [toggle, setToggle] = useState(false)
  return (
    <div style={{width: "50%",marginLeft: "auto"}}>
    <div className={`${toggle ? '' : "shrink"} dropdown `}>
      <div>
      <div className='dropdown-header'>
        <p>password.txt</p>
        <div className="dropdown-icon">
        <img onClick={() => setToggle((prev) => !prev)} alt='' src={toggle ? svgUp :svg} height={35} width={35}/>
        </div>
      </div>
      </div>
      {toggle && (<div className="dropdown-description">
        <code>
        Server Username: Server1@192.168.1.5
        Server Password: c2VjcmV0MQ==
        </code>
      </div>)}
    </div>
    </div>
  )
}
