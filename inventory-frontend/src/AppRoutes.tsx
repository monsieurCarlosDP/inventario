import { type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/pages/Login";
import ProtectedLayout from "./components/templates/ProtectedLayout";

interface IAppRouteProps {
  children?: ReactNode;
}

const AppRoutes = ({ children }: IAppRouteProps) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedLayout>
                <h1>Dashboard</h1>
              </ProtectedLayout>
            }
          />
          <Route
            path="la"
            element={
              <ProtectedLayout>
                <h1>Hola</h1>
              </ProtectedLayout>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedLayout>
                <h1>Dos</h1>
              </ProtectedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      {children}
    </>
  );
};

export default AppRoutes;
