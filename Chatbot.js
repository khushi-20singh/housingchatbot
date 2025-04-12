import React, { useState } from 'react';
import './Chatbot.css';
import { askQuestion, calculateBudget, analyzeImage } from '../api';

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your housing assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const sendMessage = async () => {
    if (input.trim() === '') return;
  
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
  
    // Add temporary "processing" message
    setMessages(prev => [...prev, { sender: 'bot', text: 'Processing your request...' }]);
  
    try {
      const res = await fetch('http://127.0.0.1:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });
  
      const data = await res.json();
  
      // Remove "processing" and add real answer
      setMessages(prev => [
        ...prev.slice(0, -1), // remove "Processing..." message
        { sender: 'bot', text: data.answer || 'Sorry, no answer found.' }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: '❌ Error: Failed to get a response.' }
      ]);
    }
  };
  
 
  const handleBudget = async () => {
    const response = await calculateBudget({
      income: 50000,
      expenses: 35000
    });
  
    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: `Income: ₹${response.data.income}\nExpenses: ₹${response.data.expenses}\nRemaining: ₹${response.data.remaining_budget}\n${response.data.suggestion}`
      }
    ]);
  };
  
  const handleImageAnalysis = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
  
      const response = await analyzeImage({ image: base64Image });
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: `Edges Detected: ${response.data.edges_detected}\n${response.data.message}` }
      ]);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="text">{msg.text}</div>
          </div>
        ))}
      </div>
      


      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;


  