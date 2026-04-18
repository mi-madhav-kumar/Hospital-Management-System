import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";
import { FaPaperPlane, FaRobot, FaTimes, FaAngleDown } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState("Hindi");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const initialMessages = {
    Hindi: "Namaste! Main Mediant-X hoon. Aapki swasthya se judi koi bhi samasya mein madad ke liye tayyar hoon.",
    English: "Hello! I am Mediant-X. I am ready to help you with any health-related issues.",
    Bhojpuri: "Pranam! Hum Mediant-X baani. Raur swasthya se jural kawno bhi samasya mein madad kare khatir taiyar baani."
  };

  useEffect(() => {
    // When language changes, update the greeting if it's the very first message
    if (messages.length === 0 || messages.length === 1) {
      setMessages([{ sender: "bot", text: initialMessages[language] }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("https://hospital-management-system-production-af27.up.railway.app/api/v1/chat/send", {
        message: text,
        language: language
      }, {
        withCredentials: true
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "Sorry, I am facing network issues." };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickReplies = {
    Hindi: ["Doctor se milna", "Dawai baare mein", "Symptoms batao"],
    English: ["Book Appointment", "About Medicines", "Check Symptoms"],
    Bhojpuri: ["Doctor se milal", "Dawaiya ke bare mein", "Lakshan batawa"]
  };

  if (!isOpen) {
    return (
      <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        <FaRobot size={24} />
      </div>
    );
  }

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <FaRobot size={22} className="bot-icon" />
          <div>
            <h3>Mediant-X</h3>
            <p>AI Medical Assistant</p>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <span className="online-badge">● Online</span>
          <FaAngleDown 
            size={20} 
            className="close-icon" 
            onClick={() => setIsOpen(false)} 
          />
        </div>
      </div>

      <div className="chatbot-lang-selector">
        <button 
          className={language === "Hindi" ? "active" : ""} 
          onClick={() => setLanguage("Hindi")}
        >
          हिंदी
        </button>
        <button 
          className={language === "English" ? "active" : ""} 
          onClick={() => setLanguage("English")}
        >
          English
        </button>
        <button 
          className={language === "Bhojpuri" ? "active" : ""} 
          onClick={() => setLanguage("Bhojpuri")}
        >
          भोजपुरी
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}>
            {msg.sender === "user" && <div className="avatar user-avatar">M</div>}
            <div className={`message-bubble ${msg.sender}-bubble`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div className="quick-replies">
          {quickReplies[language].map((reply, i) => (
            <button key={i} onClick={() => handleSend(reply)}>
              {reply}
            </button>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-footer">
        <div className="input-area">
          <input 
            type="text" 
            placeholder="Sawaal likhein..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={() => handleSend()}>
            <FaPaperPlane />
          </button>
        </div>
        <p className="powered-by">Powered by Claude AI · Mediant-X v1.0</p>
      </div>
    </div>
  );
};

export default Chatbot;
