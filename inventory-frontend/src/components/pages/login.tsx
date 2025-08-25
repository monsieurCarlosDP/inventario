import { Stack } from "@mui/material";
import Button from "../atoms/Button/Button";
import TextField from "../atoms/Input/TextInput";

type Props = {};

const login = (props: Props) => {
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
          width: "50%",
        }}
      >
        <TextField label="lala" />
        <TextField type="password" />
        <Button variant="contained">Entrar</Button>
        <Button>Borrar</Button>
      </Stack>
    </Stack>
  );
};

export default login;
