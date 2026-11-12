import { User, Sparkles } from "lucide-react";

const ChatMessage = ({ message }) => {

    const isUser = message.role === "user";

    return (

        <div className={`message-row ${isUser ? "user-row" : "ai-row"}`}>

            <div className={`message-avatar ${isUser ? "user-avatar" : "ai-avatar"}`}>

                {isUser
                    ? <User size={18} />
                    : <Sparkles size={18} />
                }

            </div>

            <div className="message-content">

                <span className="message-sender">
                    {isUser ? "You" : "RAGFlow AI"}
                </span>

                <div className="message-bubble">
                    {message.content}
                </div>

                {message.sources?.length > 0 && (

                    <div className="message-sources">

                        <strong>Sources:</strong>

                        {message.sources.map((source, index) => (

                            <div key={index}>
                                {source.document} — Page {source.page}
                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default ChatMessage;