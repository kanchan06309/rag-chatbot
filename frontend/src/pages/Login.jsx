import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Sparkles
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(formData);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.detail || "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="logo">

                    <div className="logo-icon">
                        <Sparkles size={23} />
                    </div>

                    <span>
                        RAG<span className="logo-highlight">Flow</span>
                    </span>

                </div>

                <div className="auth-heading">

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue to your AI workspace.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Email Address</label>

                        <div className="input-wrapper">

                            <Mail size={19} />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <div className="input-wrapper">

                            <Lock size={19} />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >

                                {showPassword
                                    ? <EyeOff size={19} />
                                    : <Eye size={19} />
                                }

                            </button>

                        </div>

                    </div>

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        {loading ? "Signing in..." : "Sign In"}

                    </button>

                </form>

                <div className="auth-footer">

                    Don't have an account?

                    <Link to="/register"> Create account</Link>

                </div>

                <div className="auth-bottom">
                    Your knowledge. Your AI assistant.
                </div>

            </div>

        </div>

    );

};

export default Login;