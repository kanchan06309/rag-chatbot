import { useState, useRef, useEffect } from "react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import api from "../services/api";

import { Sparkles } from "lucide-react";

const ChatWindow = () => {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);

    const sendMessage = async (question) => {

        const userMessage = {
            role: "user",
            content: question
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post("/chat", {
                question: question
            });

            const aiMessage = {
                role: "assistant",
                content: response.data.answer,
                sources: response.data.sources || []
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {

            const errorMessage = {
                role: "assistant",
                content: error.response?.data?.detail ||
                    "Something went wrong. Please try again."
            };

            setMessages((prev) => [...prev, errorMessage]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="chat-container">

            <div className="chat-header">

                <div>
                    <h2>Knowledge Assistant</h2>
                    <p>Ask questions about your documents</p>
                </div>

                <div className="status">
                    <span></span>
                    AI Assistant
                </div>

            </div>

            <div className="chat-messages">

                {messages.length === 0 && (

                    <div className="empty-chat">

                        <div className="empty-icon">
                            <Sparkles size={30} />
                        </div>

                        <h2>How can I help you today?</h2>

                        <p>
                            Ask questions and get intelligent answers
                            from your knowledge base.
                        </p>

                    </div>

                )}

                {messages.map((message, index) => (

                    <ChatMessage
                        key={index}
                        message={message}
                    />

                ))}

                {loading && (

                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                        AI is thinking...
                    </div>

                )}

                <div ref={bottomRef}></div>

            </div>

            <div className="chat-input-container">

                <ChatInput
                    onSend={sendMessage}
                    loading={loading}
                />

                <p>
                    AI-generated responses may contain mistakes.
                </p>

            </div>

        </div>

    );

};

export default ChatWindow;