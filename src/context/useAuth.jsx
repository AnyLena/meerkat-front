import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);

  const login = async (userData, setLoading, setMessage, setErrorMessage) => {
    try {
      const response = await axios.post(`${SERVER}/users/login`, userData);
      const { token, user } = response.data;
      setMessage("Login successful");
      setTimeout(() => {
        localStorage.setItem("jwt", token);
        setToken(token);
        setUser(user);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`${SERVER}/users/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
        logout();
      } finally {
        setGlobalLoading(false);
      }
    }
    setGlobalLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const value = { user, setUser, token, login, logout, globalLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
