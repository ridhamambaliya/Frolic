import { createContext, useContext, useEffect, useState } from "react";
import api from "../../../api/axios";
// used to create a global data container
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  // not call evry time so centric login
  const login = ({ token, role, user = null }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);
    setUser(user);
  };

  // centric logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setUser(null);
  };
  // check user session after login/refresh
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        setRole(res.data.user.role);
        localStorage.setItem("role", res.data.user.role);
      } catch (error) {
        logout
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