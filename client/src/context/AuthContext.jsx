import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Define the function FIRST
    const loadCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // 2. Call it AFTER it is defined
    loadCurrentUser();
  }, [token]);

  const register = async (formData) => {
    const response = await api.post("/auth/register", formData);
    const { token: newToken, user: createdUser } = response.data;

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(createdUser);
    return response.data;
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const { token: newToken, user: loggedInUser } = response.data;

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(loggedInUser);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
