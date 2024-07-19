import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { IUserAuth } from "../interfaces/IUserAuth";



// const AuthProvider = ({ children }: {children: ReactNode}) => {
//   const [isUser, setUser] = useState<null | string>(null);
//   const location = useLocation()

//   const verifyUserToken = () => {
//     setUser('Fernando')
//   }

//   useEffect(() => {
//     console.log('Cambio de página: ' + location.pathname)
//     // const verifyToken = async () => {
//     //   const token = localStorage.getItem('authToken');
//     //   if (token) {
//     //     try {
//     //       await api.get('/verify-token', { headers: { 'Authorization': `Bearer ${token}` } });
//     //       setIsAuthenticated(true);
//     //     } catch (error) {
//     //       logout();
//     //     }
//     //   } else {
//     //     setIsAuthenticated(false);
//     //   }
//     //   setLoading(false);  // Estado de carga a false después de la verificación
//     // };

//     // verifyToken();
//   }, [location.pathname]); 

//   return (
//     <AuthContext.Provider value={{ isUser, verifyUserToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

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

  useEffect(() => {
    console.log('Cambio de página: ' + location.pathname)
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await AuthService.verifyToken(token)
          setUser(user);
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
    <AuthContext.Provider value={{ isUser, isLoading, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider