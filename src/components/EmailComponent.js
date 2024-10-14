import React from 'react'
import './EmailComponent.css'
export default function EmailComponent() {
  return (
    <div className="email-container">
      <div className="email-header">
        <div className="email-meta">
          <p><strong>From:</strong> john.doe@securebank.com</p>
          <p><strong>To:</strong> globaldeliverylead@securebank.com</p>
          <p><strong>Date:</strong> October 22nd, 2024</p>
          <p><strong>Subject:</strong> Immediate Action Required: VaultX Blueprint Review</p>
        </div>
        <div className="email-actions">
          <button className="email-btn" title="Reply">
            <span role="img" aria-label="reply">🔁</span> Reply
          </button>
          <button className="email-btn" title="Reply All">
            <span role="img" aria-label="reply all">🔂</span> Reply All
          </button>
          <button className="email-btn" title="Forward">
            <span role="img" aria-label="forward">➡️</span> Forward
          </button>
        </div>
      </div>

      <div className="email-body">
        <p>Hi Team,</p>
        <p>
        I hope this email finds you well. We have successfully completed the initial phase and are currently moving into the testing stage.
        There are some urgent tasks I need your assistance with, and it's imperative we secure the latest blueprints for review.
        To ensure everything is aligned, kindly upload the confidential blueprints to our secure server. This is an internal, encrypted system, so make sure you use the correct link:  
        <a href="http://securebnk.com/VaultXUpload" target="_blank" rel="noopener noreferrer">http://securebank.com/VaultXUpload</a>.
        We also need to incorporate feedback from the previous meetings. You can find my notes for the final blueprint presentation here:  
        <a href="http://securebank.com/Notes" target="_blank" rel="noopener noreferrer">http://securebank.com/Notes</a>.
        In case you face any issues with the primary server, use this alternative backup server link to upload the files:  
        <a href="https://securebank.com/BackupAccess" target="_blank" rel="noopener noreferrer">https://securebaank.com/BackupAccess</a>.
        Additionally, the IT team will be available for assistance during this process. Should you experience any issues, please log into the IT Helpdesk using the following link to report your concerns:  
        <a href="https://securebank.com/ITHelpdesk" target="_blank" rel="noopener noreferrer">https://securebank.com/ITHelpdesk</a>.
        Please complete this task by 12:00 PM positively.
        </p>
        <p>Best regards,</p>
        <p>John Doe</p>
        <p>Global Delivery Lead</p>
      </div>
    </div>
  )
}
