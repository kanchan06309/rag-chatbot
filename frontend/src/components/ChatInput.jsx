import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, loading }) => {

    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!question.trim() || loading) return;

        onSend(question.trim());

        setQuestion("");

    };

    return (

        <form className="chat-input-form" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Ask anything about your documents..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
            />

            <button
                type="submit"
                disabled={loading || !question.trim()}
            >

                <Send size={19} />

            </button>

        </form>

    );

};

export default ChatInput;