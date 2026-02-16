import { createContext, useEffect, useState } from "react";
import api from "@/services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

  const login = (userData, token) => {
    localStorage.setItem("admin_token", token);
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setLoading(false);
      return;
    }

    const validateSession = async () => {
      try {
        const { data } = await api.get("/admin/me");
        setUser(data.user);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};