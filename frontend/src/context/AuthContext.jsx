import { createContext, useContext, useEffect, useState } from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser
} from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

    }, []);

    const login = async (credentials) => {

        const data = await loginUser(credentials);

        const currentUser = data.user || await getCurrentUser();

        setUser(currentUser);

    };

    const register = async (userData) => {
        return await registerUser(userData);
    };

    const logout = async () => {

        try {
            await logoutUser();
        } finally {
            setUser(null);
        }

    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);