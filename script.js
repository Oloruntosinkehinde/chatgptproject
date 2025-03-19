const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace with your OpenAI API key
const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to add a message to the chat box
function addMessageToChat(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to send a message to the ChatGPT API
async function sendMessageToAPI(message) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Event listener for the send button
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessageToChat(userMessage, true);
        userInput.value = ''; // Clear input field

        // Get AI response
        const botMessage = await sendMessageToAPI(userMessage);
        addMessageToChat(botMessage, false);
    }
});

// Allow pressing Enter to send a message
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});