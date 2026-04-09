import { createContext, useContext, useEffect, useState } from "react";
import api from "../../../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [meta, setMeta] = useState({
    institute: null,
    department: null,
  });

  const login = ({ token, role, user = null }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setUser(null);
    setMeta({
      institute: null,
      department: null,
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        const { user, institute, department } = res.data.data;
        setUser(user);
        setRole(user.role);
        setMeta({
          institute: institute || null,
          department: department || null,
        });
        localStorage.setItem("role", user.role);
      } catch (error) {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        meta,
        authLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);