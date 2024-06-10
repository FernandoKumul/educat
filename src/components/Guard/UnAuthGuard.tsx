import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const UnAuthGuard = () => {
  const { isLoading, isUser } = useContext(AuthContext);

  if (isLoading) {
    return null
  }

  return isUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default UnAuthGuard