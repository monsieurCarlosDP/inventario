import { Stack, Typography } from "@mui/material";
import { useReducer } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../atoms/Button/Button";
import TextField from "../atoms/Input/TextField";
import type { ILoginData, LoginAction } from "./TLogin";

const loginReducer = (state: ILoginData, action: LoginAction): ILoginData => {
  switch (action.type) {
    case "SET_IDENTIFIER":
      return { ...state, identifier: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET_FORM":
      return { identifier: "", password: "" };
    default:
      return state;
  }
};

const Login = () => {
  const [loginData, dispatch] = useReducer(loginReducer, {
    identifier: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "identifier") {
      dispatch({ type: "SET_IDENTIFIER", payload: value });
    } else if (name === "password") {
      dispatch({ type: "SET_PASSWORD", payload: value });
    }
  };

  const { user, login } = useAuth();

  if (user) return <Navigate to="/" />;

  const handleLogin = () => {
    login(loginData.identifier, loginData.password);
  };

  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "100lvh",
      }}
    >
      <Stack
        style={{
          gap: "1rem",
        }}
        sx={(theme) => ({
          width: "50%",
          [theme.breakpoints.down("lg")]: {
            width: "80%",
          },
        })}
      >
        <Typography variant="h2">Inventory Díaz</Typography>
        <TextField
          label="User"
          name="identifier"
          value={loginData.identifier}
          onChange={handleChangeInput}
        />
        <TextField
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChangeInput}
        />
        <Button variant="contained" onClick={handleLogin}>
          Entrar
        </Button>
        <Button>Borrar</Button>
      </Stack>
    </Stack>
  );
};

export default Login;
