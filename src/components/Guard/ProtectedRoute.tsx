import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  const { isLoading, isUser } = useContext(AuthContext);

  if (isLoading) {
    return null
  }

  return isUser ? <Outlet /> : <Navigate to="/login" replace />;

  // if (!auth) {
  //   return <Navigate to="/" replace />;
  // } 

  // return <Outlet />;
};

export default ProtectedRoute