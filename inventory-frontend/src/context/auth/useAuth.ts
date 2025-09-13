import { createContext, useContext } from "react";
import type { IAuthContext } from "./IAuthContext";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You cannot use useAuth hook outside Auth Context!");
  }

  return context;
};
