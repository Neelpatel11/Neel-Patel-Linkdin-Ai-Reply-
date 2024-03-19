import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';

function renderComponent() {
  const existingComponent = document.getElementById('my-extension-container');
  if (!existingComponent && isLinkedInPage()) {
    const container = document.createElement('div');
    container.id = 'my-extension-container'; 
    container.contentEditable = 'false'; 

    ReactDOM.render(<MyComponent />, container);

    // Find the message input field container Linkedin
    const messageInputContainer = document.querySelector('.msg-form__contenteditable');
    if (messageInputContainer) {
      messageInputContainer.appendChild(container);
    }
  }
}

function removeComponent() {
  const existingComponent = document.getElementById('my-extension-container');
  if (existingComponent) {
    existingComponent.remove();
  }
}

function handleInputFieldFocus() {
  renderComponent();
}

// Function to handle input field blur
function handleInputFieldBlur(event) {
  if (!event.relatedTarget || !event.relatedTarget.closest('.modal-content')) {
    removeComponent();
  }
}

// Check if the current page is LinkedIn
function isLinkedInPage() {
  return window.location.hostname.includes('linkedin.com');
}

document.addEventListener('focusin', handleInputFieldFocus);
document.addEventListener('focusout', handleInputFieldBlur);

// Initially render the component if the page is LinkedIn
renderComponent();
