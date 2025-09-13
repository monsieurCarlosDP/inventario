import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Api } from "../../data/Api";
import AuthService from "../../services/auth-service/AuthService";
import type { AuthResponse } from "../../services/auth-service/IAuthService";
import type { IAuthContext } from "./IAuthContext";
import { AuthContext } from "./useAuth";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse["user"]>();
  const [isLogging, setIsLogging] = useState<boolean>(true);

  const api = useMemo(() => new Api(), []);

  useLayoutEffect(() => {
    (async () => {
      const authToken = localStorage.getItem("authToken");
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      console.log(user);
      if (user !== "") setUser(user);

      if (authToken) api.setAuthToken(authToken);
      setIsLogging(false);
    })();
  }, [api]);

  const authService = useMemo(() => new AuthService(api), [api]);

  const login = useCallback(
    async (identifier: string, password: string) => {
      setIsLogging(true);
      const { user: loggedUser, jwt: authToken } = await authService.login(
        identifier,
        password
      );
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      setIsLogging(false);
    },
    [authService]
  );

  const logout = useCallback(() => {
    api.removeAuthToken();
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(undefined);
  }, [api]);

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      login,
      logout,
      isLogging,
    }),
    [user, login, logout, isLogging]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
