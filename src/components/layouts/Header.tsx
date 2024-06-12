import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isUser, logout } = useContext(AuthContext);

  return (
    <header className="bg-header">
      {isUser ?
        <>
          <p>{isUser.name}</p>
          <Button onClick={logout}>Cerrar Sesión</Button>
        </>
        : 
        <Link to={'/login'}>Registrate</Link>
        }
    </header>
  );
}

export default Header;