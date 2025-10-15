import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useServices } from "../../../context/services/useServices";
import type { ItemType } from "../../../data/Models";

interface ItemTypeSelectProps {
  value?: ItemType | null;
  onChange: (value: ItemType | null) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

const ItemTypeSelect = ({
  value,
  onChange,
  label = "Tipo de Item",
  required = false,
  error = false,
  helperText,
  sx,
  disabled = false,
}: ItemTypeSelectProps) => {
  const { itemService } = useServices();
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemTypes = async () => {
      try {
        setLoading(true);
        // Obtener todos los tipos sin paginación (o con una página grande)
        const result = await itemService.getItemTypes(1, 100);
        setItemTypes(result.data || []);
        setLoadError(null);
      } catch (err) {
        console.error("Error fetching item types:", err);
        setLoadError("Error al cargar tipos de item");
      } finally {
        setLoading(false);
      }
    };

    fetchItemTypes();
  }, [itemService]);

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;
    // Si es string vacío, considerarlo como null
    if (selectedValue === "") {
      onChange(null);
    } else {
      const selectedType = itemTypes.find(
        (type) => type.id === Number(selectedValue)
      );
      onChange(selectedType || null);
    }
  };

  return (
    <FormControl fullWidth sx={sx} error={error} disabled={disabled}>
      <InputLabel id="item-type-select-label">
        {label}
        {required && " *"}
      </InputLabel>
      <Select<string | number>
        labelId="item-type-select-label"
        value={value?.id || ""}
        label={`${label}${required ? " *" : ""}`}
        onChange={handleChange}
        disabled={loading || disabled}
        renderValue={(selected) => {
          if (!selected) return "";
          const selectedType = itemTypes.find(
            (type) => type.id === Number(selected)
          );
          if (!selectedType) return "";

          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  bgcolor: selectedType.Color,
                  width: 24,
                  height: 24,
                  fontSize: "0.8rem",
                }}
              >
                {selectedType.Icon}
              </Avatar>
              <Typography variant="body2">{selectedType.Name}</Typography>
            </Stack>
          );
        }}
      >
        {/* Opción para "ningún tipo" si no es requerido */}
        {!required && (
          <MenuItem value="">
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  bgcolor: "#ccc",
                  width: 24,
                  height: 24,
                  fontSize: "0.8rem",
                }}
              >
                ?
              </Avatar>
              <Typography variant="body2">Sin tipo</Typography>
            </Stack>
          </MenuItem>
        )}

        {loading ? (
          <MenuItem disabled>
            <Typography variant="body2">Cargando tipos...</Typography>
          </MenuItem>
        ) : loadError ? (
          <MenuItem disabled>
            <Typography variant="body2" color="error">
              {loadError}
            </Typography>
          </MenuItem>
        ) : itemTypes.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">No hay tipos disponibles</Typography>
          </MenuItem>
        ) : (
          itemTypes.map((itemType) => (
            <MenuItem key={itemType.id} value={itemType.id}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    bgcolor: itemType.Color,
                    width: 24,
                    height: 24,
                    fontSize: "0.8rem",
                  }}
                >
                  {itemType.Icon}
                </Avatar>
                <Typography variant="body2">{itemType.Name}</Typography>
              </Stack>
            </MenuItem>
          ))
        )}
      </Select>
      {helperText && (
        <Typography
          variant="caption"
          color={error ? "error" : "text.secondary"}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default ItemTypeSelect;
