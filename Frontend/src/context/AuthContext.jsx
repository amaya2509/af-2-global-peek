import { createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { loginUser as loginService } from "../services/authApi.js";
import {getToken, setToken, clearToken} from "../utils/tokenUtils.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    //load token and user from storage
    useEffect(() => {
        const token = getToken();
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
    }, []);

    //login function
    const login = async (email, password) => {
        try {
            const { token, user: userData} = await loginService({ email, password});
            setToken(token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/'); // Redirect to dashboard after login
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error; // Propagate the error to the component
        }
    };

    //logout function
    const logout = () => {
        clearToken();
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};