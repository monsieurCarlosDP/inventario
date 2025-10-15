import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarIcon from "@mui/icons-material/Star";
import { SpeedDial, SpeedDialAction, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";
import Header from "./Header";

interface IProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: IProtectedRoutesProps) => {
  const { isLogging, user } = useAuth();
  const navigate = useNavigate();

  if (!user && !isLogging) return <Navigate to="/login" />;

  const actions = [
    { icon: <AddIcon />, name: "Añadir Item", route: "/addItem" },
    {
      icon: <FormatListBulletedIcon />,
      name: "Lista de Items",
      route: "/listItems",
    },
    {
      icon: <StarIcon />,
      name: "Items seleccionados",
      route: "/selection",
    },
  ];

  return (
    <Stack component="main" sx={{ display: "flex", width: "100%" }}>
      <Header />
      {children}
      <SpeedDial
        ariaLabel="Basic menu"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<AppsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={() => navigate(action.route)}
            slotProps={{ tooltip: { title: action.name } }}
          />
        ))}
      </SpeedDial>
    </Stack>
  );
};

export default ProtectedLayout;
