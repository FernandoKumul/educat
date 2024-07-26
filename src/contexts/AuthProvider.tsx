import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthContext from "./AuthContext";
import AuthService from "../services/AuthService";
import { IUserAuth } from "../interfaces/IUserAuth";
import 'react-toastify/dist/ReactToastify.css';

const AuthProvider = () => {
  const [isUser, setUser] = useState<null | IUserAuth>(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate(0)
  }

  const reloadUser = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = await AuthService.verifyToken(token)
        setUser(user)
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
      }
    }
  }

  useEffect(() => {
    console.log('Cambio de página: ' + location.pathname)
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await AuthService.verifyToken(token)
          setUser(user)
        } catch (error) {
          localStorage.removeItem('token')
          setUser(null)        
        }
      } else {
        setLoading(false);
      }
      setLoading(false); 
    };

    verifyToken();
  }, [location.pathname]); 

  return (
    <AuthContext.Provider value={{ isUser, isLoading, logout, reloadUser }}>
      <Outlet />
        <ToastContainer
          className="text-sm"
          position="top-right"
          theme="dark"
        />    
      </AuthContext.Provider>
  );
};

export default AuthProvider