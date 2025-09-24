import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useServices } from "../../context/services/useServices";
import type { IItem } from "../../data/Models";
import ItemRow from "../molecules/ItemRow/ItemRow";
import Table, { type IColumn } from "../organisms/Table/Table";

const ListItems = () => {
  const { itemService } = useServices();
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: IColumn[] = [
    {
      id: "name",
      label: "Name",
      align: "left",
      width: "25%",
      minWidth: 150,
    },
    {
      id: "description",
      label: "Description",
      align: "left",
      width: "35%",
      minWidth: 200,
    },
    {
      id: "favorite",
      label: "Favorite",
      align: "center",
      width: "15%",
      minWidth: 120,
    },
    {
      id: "dateAdded",
      label: "Date Added",
      align: "left",
      width: "15%",
      minWidth: 120,
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      width: "10%",
      minWidth: 120,
    },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const result = await itemService.getItems();
        setItems(result.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [itemService]);

  const handleEdit = (item: IItem) => {
    console.log("Edit item:", item);
    // TODO: Navigate to edit form or open modal
  };

  const handleDelete = async (item: IItem) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await itemService.deleteItem(item.id);
        setItems(items.filter((i) => i.id !== item.id));
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(err instanceof Error ? err.message : "Failed to delete item");
      }
    }
  };

  const handleToggleFavorite = async (item: IItem) => {
    try {
      const updatedItem = await itemService.updateItem(item.id, {
        Name: item.Name,
        Description: item.Description,
        isFavorite: !item.isFavorite,
      });

      setItems(items.map((i) => (i.id === item.id ? updatedItem : i)));
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update favorite status"
      );
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Inventory Items
      </Typography>

      {items.length === 0 ? (
        <Alert severity="info">
          No items found. Add some items to get started!
        </Alert>
      ) : (
        <Table columns={columns}>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </Table>
      )}
    </Box>
  );
};

export default ListItems;
