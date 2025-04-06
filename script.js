// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Font Size Adjustment
  document.getElementById('increase-font').addEventListener('click', function() {
    changeFontSize(1);
  });

  document.getElementById('decrease-font').addEventListener('click', function() {
    changeFontSize(-1);
  });

  function changeFontSize(step) {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
      const currentSize = parseFloat(window.getComputedStyle(element).fontSize);
      if (!isNaN(currentSize)) {
        element.style.fontSize = `${currentSize + step}px`;
      }
    });
  }

  // Theme Toggles
  document.getElementById('toggle-dyslexia-font').addEventListener('click', function() {
    document.body.classList.toggle('dyslexia-font');
  });

  document.getElementById('high-contrast-theme').addEventListener('click', function() {
    document.body.classList.remove('calm-theme', 'reset-theme');
    document.body.classList.add('high-contrast');
  });

  document.getElementById('calm-theme').addEventListener('click', function() {
    document.body.classList.remove('high-contrast', 'reset-theme');
    document.body.classList.add('calm-theme');
  });

  document.getElementById('reset-theme').addEventListener('click', function() {
    document.body.classList.remove('high-contrast', 'calm-theme');
    document.body.classList.add('reset-theme');
  });

  // Chatbot Implementation - Enhanced Version
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const quickOptionsContainer = document.getElementById('chatbot-quick-options');
  
  // Quick options that users can click
  const quickOptions = [
      "What services do you offer?",
      "Tell me about NeuroBridge",
      "How can I get support?",
      "What accessibility features do you have?"
  ];
  
  // More detailed responses
  const responseDatabase = {
      "hello": "Hello! Welcome to NeuroBridge. I'm here to help you navigate our services. What would you like to know?",
      "hi": "Hi there! How can I assist you today?",
      "about": "NeuroBridge is dedicated to supporting neurodiverse individuals through comprehensive education and employment programs. We believe in creating inclusive opportunities for everyone.",
      "feature": "We offer several key features:\n\n- Custom learning tools tailored to different needs\n- Job training and placement assistance\n- Accessibility features like text-to-speech and customizable interfaces\n- One-on-one support services",
      "service": "Our services include:\n\n1. Educational support programs\n2. Career development workshops\n3. Mentorship opportunities\n4. Community building events\n\nWhich service are you most interested in?",
      "support": "We provide support through:\n\n- Online resources\n- Virtual consultations\n- Local partner organizations\n- Support groups\n\nWould you like help finding specific resources?",
      "accessibility": "Our accessibility features include:\n\n- Adjustable text sizes\n- Dyslexia-friendly font option\n- High contrast themes\n- Simplified navigation options\n- Chatbot assistance\n\nIs there a specific accessibility need you'd like to know about?",
      "default": "I'm here to help! Could you tell me more about what you're looking for? Here are some options you might find helpful:"
  };
  
  // Initialize quick options buttons
  function initQuickOptions() {
      quickOptionsContainer.innerHTML = '';
      quickOptions.forEach(option => {
          const btn = document.createElement('button');
          btn.className = 'quick-option';
          btn.textContent = option;
          btn.addEventListener('click', () => {
              chatbotInput.value = option;
              sendMessage();
          });
          quickOptionsContainer.appendChild(btn);
      });
  }
  
  // Toggle Chatbot
  chatbotToggle.addEventListener('click', function() {
    if (chatbotContainer.style.display === 'none' || !chatbotContainer.style.display) {
      chatbotContainer.style.display = 'flex';
      chatbotContainer.classList.add('open');
    } else {
      chatbotContainer.style.display = 'none';
      chatbotContainer.classList.remove('open');
    }
  });

  // Close Chatbot
  chatbotClose.addEventListener('click', function() {
    chatbotContainer.style.display = 'none';
    chatbotContainer.classList.remove('open');
  });

  // Send Message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    const typing = addMessage('NeuroBridge is typing...', 'bot');
    
    // Simulate API-like delay and response
    setTimeout(() => {
      // Remove typing indicator
      chatbotMessages.removeChild(typing);
      
      // Get response
      const response = generateResponse(message);
      addMessage(response, 'bot');
      
      // Show follow-up options if needed
      if (shouldShowOptions(message)) {
          setTimeout(() => {
              initQuickOptions();
              quickOptionsContainer.style.display = 'flex';
          }, 500);
      } else {
          quickOptionsContainer.style.display = 'none';
      }
    }, 1500); // Simulate API delay
  }

  // Add message to chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return msg;
  }
  
  // Generate more sophisticated responses
  function generateResponse(message) {
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
          return responseDatabase['hello'];
      }
      else if (lowerMsg.includes('about') || lowerMsg.includes('neurobridge')) {
          return responseDatabase['about'];
      }
      else if (lowerMsg.includes('feature') || lowerMsg.includes('accessibility')) {
          return responseDatabase['accessibility'];
      }
      else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
          return responseDatabase['service'];
      }
      else if (lowerMsg.includes('support') || lowerMsg.includes('help')) {
          return responseDatabase['support'];
      }
      else {
          return responseDatabase['default'];
      }
  }
  
  // Determine if we should show quick options after this response
  function shouldShowOptions(message) {
      const lowerMsg = message.toLowerCase();
      return !(lowerMsg.includes('hello') && !(lowerMsg.includes('hi')));
  }

  // Coming soon alerts
  document.querySelectorAll('.btn-card, .btn-explore, .btn-cta').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      alert('This feature is coming soon!');
    });
  });

  // Initial welcome message with quick options
  setTimeout(() => {
    addMessage("Hello! I'm NeuroBridge AI. How can I help you today?", 'bot');
    initQuickOptions();
    quickOptionsContainer.style.display = 'flex';
  }, 1000);












      // Simple Signup Modal Functionality
      const signupModal = document.getElementById('signup-modal');
      const signupButtons = document.querySelectorAll('.btn-signup'); // Select all signup buttons
      const closeModal = document.querySelector('.close-modal');
      const signupForm = document.getElementById('signup-form');
  
      // Open modal when any signup button is clicked
      signupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          signupModal.style.display = 'block';
        });
      });
  
      // Close modal when X is clicked
      closeModal.addEventListener('click', function() {
        signupModal.style.display = 'none';
      });
  
      // Close modal when clicking outside
      window.addEventListener('click', function(e) {
        if (e.target === signupModal) {
          signupModal.style.display = 'none';
        }
      });
  
      // Handle form submission
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        
        // Show confirmation (in real app, you would send this to a server)
        alert(`Thanks for signing up, ${name}! We'll be in touch at ${email}.`);
        
        // Reset form and close modal
        signupForm.reset();
        signupModal.style.display = 'none';
      });




      
});