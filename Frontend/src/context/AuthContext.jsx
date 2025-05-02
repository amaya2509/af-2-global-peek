import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as loginService } from "../services/authApi.js";
import { getToken, setToken, clearToken } from "../utils/tokenUtils.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ Add this

  useEffect(() => {
    const token = getToken();
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) setUser(storedUser);
    }
    setLoading(false); // ⬅️ Done loading
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await loginService({ email, password });
      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (loading) return null; // ⬅️ Prevent rendering routes until auth is ready

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
