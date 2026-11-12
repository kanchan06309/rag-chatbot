import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import {
    Sparkles,
    LogOut,
    MessageSquare
} from "lucide-react";

import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <div className="dashboard">

            <nav className="navbar">

                <div className="logo">

                    <div className="logo-icon">
                        <Sparkles size={22} />
                    </div>

                    <span>
                        RAG<span className="logo-highlight">Flow</span>
                    </span>

                </div>

                <div className="user-section">

                    <div className="user-info">
                        <span className="user-name">
                            {user?.name || user?.email || "User"}
                        </span>
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >

                        <LogOut size={17} />

                        Logout

                    </button>

                </div>

            </nav>

            <main className="dashboard-main">

                <div className="dashboard-title">

                    <div>
                        <h1>
                            <MessageSquare size={24} />
                            Your AI Workspace
                        </h1>

                        <p>
                            Ask questions. Explore knowledge. Get answers.
                        </p>
                    </div>

                </div>

                <ChatWindow />

            </main>

        </div>

    );

};

export default Dashboard;