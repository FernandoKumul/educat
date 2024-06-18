import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const InstructorGuard = () => {
  const { isLoading, isUser } = useContext(AuthContext);

  if (isLoading) {
    return null
  }
  
  if(!isUser) {
    return <Navigate to="/login" replace />
  }

  if(!isUser.isInstructor) {
    return <Navigate to="/" replace />
  }

  return  <Outlet />
};

export default InstructorGuard