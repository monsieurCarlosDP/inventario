import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { useItemService } from "../../hooks/useItemService";
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
  uploadedPhotoId: number | null; // ID de la foto subida
  isSubmitting: boolean;
  isUploadingPhoto: boolean; // Estado separado para upload de foto
  submitError: string | null;
  submitSuccess: boolean;
  shouldSubmit: boolean; // Nueva flag para trigger async operation
}

// Tipos para las acciones del reducer
type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_FAVORITE"; payload: boolean }
  | { type: "SET_PHOTO"; payload: File | null }
  | { type: "SET_UPLOADED_PHOTO_ID"; payload: number | null }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_UPLOADING_PHOTO"; payload: boolean }
  | { type: "SET_SUBMIT_ERROR"; payload: string | null }
  | { type: "SET_SUBMIT_SUCCESS"; payload: boolean }
  | { type: "TRIGGER_SUBMIT" } // Nueva action para disparar submit
  | { type: "SUBMIT_COMPLETED" } // Para limpiar shouldSubmit flag
  | { type: "RESET_FORM" };

// Estado inicial del formulario
const initialState: FormState = {
  name: "",
  description: "",
  isFavorite: false,
  photo: null,
  uploadedPhotoId: null,
  isSubmitting: false,
  isUploadingPhoto: false,
  submitError: null,
  submitSuccess: false,
  shouldSubmit: false,
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
      return { ...state, photo: action.payload, uploadedPhotoId: null }; // Reset uploaded ID when new photo is selected
    case "SET_UPLOADED_PHOTO_ID":
      return { ...state, uploadedPhotoId: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_UPLOADING_PHOTO":
      return { ...state, isUploadingPhoto: action.payload };
    case "SET_SUBMIT_ERROR":
      return { ...state, submitError: action.payload };
    case "SET_SUBMIT_SUCCESS":
      return { ...state, submitSuccess: action.payload };
    case "TRIGGER_SUBMIT":
      return { ...state, shouldSubmit: true, submitError: null };
    case "SUBMIT_COMPLETED":
      return { ...state, shouldSubmit: false };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const AddItem = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const { createItem, uploadPhoto } = useItemService();
  const { user } = useAuth(); // Obtener el usuario autenticado

  // useEffect para subir la foto cuando se selecciona una nueva
  useEffect(() => {
    if (!formState.photo || formState.uploadedPhotoId !== null) return;

    const uploadPhotoAsync = async () => {
      try {
        dispatch({ type: "SET_UPLOADING_PHOTO", payload: true });
        const uploadResult = await uploadPhoto(formState.photo!);
        dispatch({ type: "SET_UPLOADED_PHOTO_ID", payload: uploadResult.id });
      } catch (error) {
        console.error("Error uploading photo:", error);
        dispatch({
          type: "SET_SUBMIT_ERROR",
          payload: "Failed to upload photo",
        });
      } finally {
        dispatch({ type: "SET_UPLOADING_PHOTO", payload: false });
      }
    };

    uploadPhotoAsync();
  }, [formState.photo, formState.uploadedPhotoId, uploadPhoto]);

  // useEffect para manejar la operación async cuando shouldSubmit es true
  useEffect(() => {
    if (!formState.shouldSubmit) return;

    const submitForm = async () => {
      // Validation
      if (!formState.name.trim()) {
        dispatch({
          type: "SET_SUBMIT_ERROR",
          payload: "Item name is required",
        });
        dispatch({ type: "SUBMIT_COMPLETED" });
        return;
      }

      // Check if photo is still uploading
      if (
        formState.photo &&
        formState.uploadedPhotoId === null &&
        formState.isUploadingPhoto
      ) {
        dispatch({
          type: "SET_SUBMIT_ERROR",
          payload: "Please wait for the photo to finish uploading",
        });
        dispatch({ type: "SUBMIT_COMPLETED" });
        return;
      }

      try {
        dispatch({ type: "SET_SUBMITTING", payload: true });

        // Construir itemData de forma condicional
        const baseItemData = {
          Name: formState.name.trim(),
          Description: formState.description.trim() || undefined,
          Photos: formState.uploadedPhotoId, // Usar "Photos" como espera el backend
        };

        // Solo agregar Favorited si isFavorite es true
        const itemData = formState.isFavorite
          ? { ...baseItemData, Favorited: user }
          : baseItemData;

        const result = await createItem(itemData);

        if (result) {
          dispatch({ type: "SET_SUBMIT_SUCCESS", payload: true });
          console.log("Item created successfully:", result);

          // Reset form after successful creation
          setTimeout(() => {
            dispatch({ type: "RESET_FORM" });
          }, 2000);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create item";
        dispatch({ type: "SET_SUBMIT_ERROR", payload: errorMessage });
        console.error("Error creating item:", error);
      } finally {
        dispatch({ type: "SET_SUBMITTING", payload: false });
        dispatch({ type: "SUBMIT_COMPLETED" });
      }
    };

    submitForm();
  }, [
    formState.shouldSubmit,
    formState.name,
    formState.description,
    formState.isFavorite,
    formState.uploadedPhotoId,
    formState.photo,
    formState.isUploadingPhoto,
    user,
    createItem,
  ]);

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
    // Solo disparar la action, no lógica async aquí
    dispatch({ type: "TRIGGER_SUBMIT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <Stack m={4} gap={2}>
      <Typography variant="h4">Añadir item</Typography>

      {/* Error Alert */}
      {formState.submitError && (
        <Alert
          severity="error"
          onClose={() => dispatch({ type: "SET_SUBMIT_ERROR", payload: null })}
        >
          {formState.submitError}
        </Alert>
      )}

      {/* Success Alert */}
      {formState.submitSuccess && (
        <Alert severity="success">
          Item created successfully! The form will reset automatically.
        </Alert>
      )}

      <Stack flexDirection="row" flexGrow={1} alignItems="center" gap={2}>
        <UploadPhoto
          onPhotoChange={handlePhotoChange}
          photo={formState.photo}
        />
        {formState.isUploadingPhoto && (
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              Uploading photo...
            </Typography>
          </Stack>
        )}
        <TextField
          label="Nombre item"
          sx={{ flex: 1 }}
          required
          value={formState.name}
          onChange={handleNameChange}
          error={!formState.name.trim() && formState.submitError !== null}
          helperText={
            !formState.name.trim() && formState.submitError !== null
              ? "Name is required"
              : ""
          }
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          disabled={formState.isSubmitting}
        >
          Borrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            formState.isSubmitting ||
            !formState.name.trim() ||
            formState.isUploadingPhoto ||
            (formState.photo !== null && formState.uploadedPhotoId === null)
          }
          startIcon={
            formState.isSubmitting ? <CircularProgress size={16} /> : undefined
          }
        >
          {formState.isSubmitting
            ? "Enviando..."
            : formState.isUploadingPhoto
            ? "Uploading photo..."
            : "Enviar"}
        </Button>
      </Stack>
    </Stack>
  );
};
export default AddItem;
