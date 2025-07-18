import React, { useState, useRef, useEffect } from "react";
import "./ChatAssistant.css";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! How can I help you with cybersecurity today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // Here you would send the message to your backend/AI and add the response to messages
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: "assistant", text: "This is a placeholder response from the AI assistant." }
      ]);
    }, 1000);
  };

  return (
    <div className="chat-assistant-container">
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>CyberNinja Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant; 