import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginUser, registerUser, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    console.log("Effect started");
    if (errors.length > 0) {
      console.log("Errors found, setting timer");
      const timer = setTimeout(() => {
        console.log("Clearing errors");
        setErrors([]);
      }, 5000);
      return () => {
        console.log("Effect cleanup");
        clearTimeout(timer);
      };
    }
  }, [errors]);
  
// Funciones de autenticación
  const signup = async (user) => {
    try {
      const res = await registerUser(user);
      if (res.status === 200) {
        console.log("successfully logged in:", resp.data);
        setUser(res.data);
        setIsAuthenticated(true); // Asegúrate de establecer isAuthenticated en true aquí
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginUser(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };


    // Verificación de inicio de sesión al cargar el componente
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
