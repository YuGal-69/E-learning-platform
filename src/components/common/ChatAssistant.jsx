import React, { useState, useRef, useEffect } from "react";
import "./ChatAssistant.css";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! How can I help you with cybersecurity today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful cybersecurity assistant." },
            ...messages.map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      setMessages(msgs => [
        ...msgs,
        { sender: "assistant", text: data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response." }
      ]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { sender: "assistant", text: "Sorry, there was an error connecting to the AI assistant." }
      ]);
    } finally {
      setLoading(false);
    }
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
            {loading && <div className="chat-message assistant">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant; 