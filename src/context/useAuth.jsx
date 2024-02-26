import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (userData, setMessage) => {
    try {
      const response = await axios.post(`${SERVER}/users/login`, userData);
      const { token, user } = response.data;
      localStorage.setItem("jwt", token);
      setToken(token);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/login");
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
      } catch (e) {
        console.log(e);
        logout();
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
