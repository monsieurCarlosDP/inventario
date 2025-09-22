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
      try {
        const authToken = localStorage.getItem("authToken");
        const userString = localStorage.getItem("user");

        // Validar que existe y no está vacío
        if (
          authToken &&
          userString &&
          userString !== "null" &&
          userString !== "undefined"
        ) {
          try {
            const userData = JSON.parse(userString);

            // Validar que el objeto tiene las propiedades esperadas
            if (userData && typeof userData === "object" && userData.id) {
              api.setAuthToken(authToken);
              setUser(userData);
              console.log("Usuario restaurado:", userData);
            } else {
              console.warn("Datos de usuario inválidos:", userData);
              // Limpiar datos corruptos
              localStorage.removeItem("user");
              localStorage.removeItem("authToken");
            }
          } catch (parseError) {
            console.error("Error al parsear usuario:", parseError);
            // Limpiar datos corruptos
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        console.error("Error al inicializar auth:", error);
      } finally {
        setIsLogging(false);
      }
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
