import { Delete } from "@mui/icons-material";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import type { IItem } from "../../../data/Models";
import { getFirstImageUrl } from "../../../utils/image/imageUtils";
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
  // TODO: Implementar funcionalidad de edición
  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleDelete = () => {
    onDelete?.(item);
  };

  // TODO: Implementar funcionalidad de toggle favorito
  const handleToggleFavorite = () => {
    onToggleFavorite?.(item);
  };

  // Supresión de warnings para handlers no utilizados (preparados para futura implementación)
  void handleEdit;
  void handleToggleFavorite;

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
      <TableCell align="center">
        <Avatar
          src={getFirstImageUrl(item.Photos, "thumbnail")}
          alt={item.Photos?.[0]?.name || "Item photo"}
          sx={{ width: 40, height: 40 }}
        />
      </TableCell>
      <TableCell>{item.Name || "No name"}</TableCell>
      <TableCell align="center">
        {item.item_type ? (
          <Avatar
            sx={{
              bgcolor: item.item_type.Color || "#ccc",
              width: 40,
              height: 40,
              fontSize: "1.2rem",
            }}
          >
            {item.item_type.Icon || "?"}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              bgcolor: "#ccc",
              width: 40,
              height: 40,
              fontSize: "1.2rem",
            }}
          >
            ?
          </Avatar>
        )}
      </TableCell>
      <TableCell>{item.Description || "No description"}</TableCell>
      <TableCell align="center">
        <AvatarGroup max={3}>
          {item.Favorited?.map((user) => (
            <Avatar
              key={user.id}
              src={user.Avatar}
              alt={user.username}
              sx={{ width: 40, height: 40 }}
            />
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      <TableCell align="center">
        {/* {onToggleFavorite && (
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
        )} */}
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
