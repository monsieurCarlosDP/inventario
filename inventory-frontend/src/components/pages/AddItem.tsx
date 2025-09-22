import { Stack, Typography } from "@mui/material";
import { useReducer } from "react";
import Button from "../atoms/Button/Button";
import StarCheckbox from "../atoms/Input/StarCheckbox";
import TextField from "../atoms/Input/TextField";
import UploadPhoto from "../organisms/UploadPhoto/UploadPhoto";

// Tipos para el estado del formulario
interface FormState {
  name: string;
  description: string;
  isFavorite: boolean;
  photo: File | null;
}

// Tipos para las acciones del reducer
type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_FAVORITE"; payload: boolean }
  | { type: "SET_PHOTO"; payload: File | null }
  | { type: "RESET_FORM" };

// Estado inicial del formulario
const initialState: FormState = {
  name: "",
  description: "",
  isFavorite: false,
  photo: null,
};

// Reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_FAVORITE":
      return { ...state, isFavorite: action.payload };
    case "SET_PHOTO":
      return { ...state, photo: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const AddItem = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Handlers para los cambios del formulario
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_NAME", payload: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_DESCRIPTION", payload: event.target.value });
  };

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_FAVORITE", payload: event.target.checked });
  };

  const handlePhotoChange = (photo: File | null) => {
    dispatch({ type: "SET_PHOTO", payload: photo });
  };

  const handleSubmit = () => {
    console.log("Form data:", formState);
    // Aquí iría la lógica para enviar el formulario
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <Stack m={4} gap={2}>
      <Typography variant="h4">Añadir item</Typography>
      <Stack flexDirection="row" flexGrow={1} alignItems="center" gap={2}>
        <UploadPhoto
          onPhotoChange={handlePhotoChange}
          photo={formState.photo}
        />
        <TextField
          label="Nombre item"
          sx={{ flex: 1 }}
          required
          value={formState.name}
          onChange={handleNameChange}
        />
      </Stack>
      <Stack>
        <TextField
          multiline
          minRows={4}
          label="Descripcion"
          value={formState.description}
          onChange={handleDescriptionChange}
        />
      </Stack>
      <Stack flexDirection="row" flexGrow={1} alignItems="center" gap={2}>
        <Typography variant="h6">¿Es favorito?</Typography>
        <StarCheckbox
          checked={formState.isFavorite}
          onChange={handleFavoriteChange}
        />
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" gap={2} mt={3}>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Borrar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar
        </Button>
      </Stack>
    </Stack>
  );
};
export default AddItem;
