import React from 'react'
import { Modal, ModalContent } from "./Modal";
import { useState } from 'react';
import svg from '../assets/dropdown.svg'
import svgUp from '../assets/dropdown-upwards.svg'

export default function ImageModal({image}) {
    const [isOpen, setIsopen] = useState(false);
    const showModal = () => setIsopen((prev) => !prev);
  return (
    <div style={{width: "50%",marginLeft: "auto"}}>
        <Modal onOpen={showModal}>
        <div className="dropdown">
            <div className='dropdown-header'>
                <p>Click to view the Image</p>
                <div className="dropdown-icon">
                <img onClick={() => setIsopen((prev) => !prev)} alt='' src={isOpen ? svgUp :svg} height={35} width={35}/>
                </div>
            </div>
        </div>
      </Modal>
      {isOpen && (
        <ModalContent onClose={() => setIsopen(false)}>
          <img src={image} alt="" />
        </ModalContent>
      )}
    </div>
  )
}
