import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import type { IItem } from "../../../data/Models";
import TableCell from "../../atoms/Table/TableCell";
import TableRow from "../../atoms/Table/TableRow";

interface IItemRowProps {
  item: IItem;
  onEdit?: (item: IItem) => void;
  onDelete?: (item: IItem) => void;
  onToggleFavorite?: (item: IItem) => void;
}

const ItemRow = ({
  item,
  onEdit,
  onDelete,
  onToggleFavorite,
}: IItemRowProps) => {
  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleDelete = () => {
    onDelete?.(item);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(item);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return "N/A";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <TableRow>
      <TableCell>{item.Name || "No name"}</TableCell>
      <TableCell>{item.Description || "No description"}</TableCell>
      <TableCell align="center">
        {item.isFavorite ? (
          <Chip
            icon={<Favorite />}
            label="Favorite"
            color="primary"
            size="small"
          />
        ) : (
          <Chip
            icon={<FavoriteBorder />}
            label="Regular"
            variant="outlined"
            size="small"
          />
        )}
      </TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      <TableCell align="center">
        {onToggleFavorite && (
          <IconButton
            onClick={handleToggleFavorite}
            color={item.isFavorite ? "primary" : "default"}
            size="small"
          >
            {item.isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        )}
        {onEdit && (
          <IconButton onClick={handleEdit} color="primary" size="small">
            <Edit />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={handleDelete} color="error" size="small">
            <Delete />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
