import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch {
        localStorage.removeItem("admin_token");
      }
    }

    const validate = async () => {
      try {
        const { data } = await api.get("/me");
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token) validate();
    else setLoading(false);
  }, []);

  // const login = (token) => {
  //   localStorage.setItem("admin_token", token);
  //   setUser(jwtDecode(token));
  // };
  const login = (userData, token) => {
    localStorage.setItem("admin_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

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
