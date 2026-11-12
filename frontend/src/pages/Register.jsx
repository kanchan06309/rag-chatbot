import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Sparkles
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Register = () => {

    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");
            return;

        }

        if (formData.password.length < 8) {

            setError("Password must contain at least 8 characters.");
            return;

        }

        setLoading(true);

        try {

            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            navigate("/login", {
                state: {
                    message: "Account created successfully! Please log in."
                }
            });

        } catch (err) {

            setError(
                err.response?.data?.detail || "Registration failed."
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

                    <h1>Create an account</h1>

                    <p>
                        Start exploring your knowledge with AI.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Full Name</label>

                        <div className="input-wrapper">

                            <User size={19} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

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
                                placeholder="Create a password"
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

                    <div className="input-group">

                        <label>Confirm Password</label>

                        <div className="input-wrapper">

                            <Lock size={19} />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

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

                        {loading ? "Creating account..." : "Create Account"}

                    </button>

                </form>

                <div className="auth-footer">

                    Already have an account?

                    <Link to="/login"> Sign in</Link>

                </div>

                <div className="auth-bottom">
                    Your knowledge. Your AI assistant.
                </div>

            </div>

        </div>

    );

};

export default Register;