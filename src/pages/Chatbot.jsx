import React, { useState } from 'react';
import { Send, Mic, User, Bot, Volume2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/Chatbot.module.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am your Kisan Assistant. Ask me anything about farming.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "That is a great question! For best results, use organic manure mixed with NPK 20-20-20. Would you like to know the dosage?",
                sender: 'bot'
            }]);
        }, 1000);
    };

    return (
        <div className="container" style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ alignSelf: 'flex-start' }}><BackButton /></div>
            <div className={styles.chatHeader}>
                <h2>AI Assistant</h2>
                <div className={styles.status}>Online</div>
            </div>

            <div className={styles.chatWindow}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}>
                        {msg.sender === 'bot' && <div className={styles.avatar}><Bot size={20} /></div>}
                        <div className={styles.bubble}>
                            {msg.text}
                            {msg.sender === 'bot' && (
                                <button className={styles.speakBtn}><Volume2 size={14} /></button>
                            )}
                        </div>
                        {msg.sender === 'user' && <div className={styles.avatar}><User size={20} /></div>}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} className={styles.inputArea}>
                <button type="button" className={styles.iconBtn}><Mic size={20} /></button>
                <input
                    type="text"
                    placeholder="Type your question..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit" className={styles.sendBtn}><Send size={20} /></button>
            </form>
        </div>
    );
};

export default Chatbot;
