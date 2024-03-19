import React, { useState } from "react"
import {GenerateIcon, RegenerateIcon, InsertIcon} from './Icons';
import "./Modal.css" 

interface ModalProps {
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState("") 
  const [response, setResponse] = useState("") 
  const [showInsertButton, setShowInsertButton] = useState(false) 
  const [sentMessage, setSentMessage] = useState("")

  // Both This functions for sort some propogation errors 
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const handleInputMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  // Function to handle message input change
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setMessage(value)
    if (value === "") {
      setSentMessage("")
    }
  }

  const handleGenerateClick = () => {
    setResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    )
    setShowInsertButton(true)
    setSentMessage(message)
    setMessage("") 
  }
  const handleReGenerateClick = () => {
   console.log("regenrate")
  }

  const handleInsertClick = () => {
    // Find the LinkedIn message input field
    const linkedInMessageInput = document.querySelector(
      '.msg-form__contenteditable[aria-label="Write a message…"]'
    )
    if (linkedInMessageInput instanceof HTMLElement) {
      // Create a new HTML paragraph element
      const paragraph = document.createElement("p")
      paragraph.innerText = response
      // Append the paragraph element to the LinkedIn message input field
      linkedInMessageInput.appendChild(paragraph)

      const event = new Event("input", { bubbles: true })
      linkedInMessageInput.dispatchEvent(event)
      onClose()
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} contentEditable={false}>
        <div className="modal-content" onClick={handleClick}>
          <span className="close" onClick={onClose}>
            &times;
          </span>

          {response && (
            <div className="message-response">
              <p className="sent-message" style={{color : "#666D80"}}>
               {sentMessage}
              </p>
              <p className="response-message" style={{color : "#666D80"}}>
              {response}
              </p>
            </div>
          )}
          <input
            className="input-field"
            value={message}
            onChange={handleMessageChange}
            onMouseDown={handleInputMouseDown}
            placeholder="Your Prompt...."
          />
          <div className="buttoncss-container">
            {!showInsertButton ? ( 
              <>
                <button
                  onClick={handleGenerateClick}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  id="generate-button">
                <GenerateIcon/>

                  <span>Generate</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleInsertClick}
                  className="bg-transparent hover:bg-white-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
                id="insert-button">
                 <InsertIcon/>
                  <span style={{ marginLeft: "5px" }}>Insert</span>{" "}
                </button>
                <button
                  onClick={handleReGenerateClick}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                id="regenerate-button">
             <RegenerateIcon    style={{ marginRight: "5px" }} />
                  <span>Regenerate</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
