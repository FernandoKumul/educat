import { createContext } from "react";
import { IUserAuth } from "../interfaces/IUserAuth";

interface defaultValues {
  isUser: IUserAuth | null,
  isLoading: boolean,
  logout: () => void
}

const AuthContext = createContext<defaultValues>({
  isUser: null,
  isLoading: false,
  logout: ()=>{}
});

export default AuthContext