import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { useServices } from "../../context/services/useServices";
import type { IItem } from "../../data/Models";
import ItemRow from "../molecules/ItemRow/ItemRow";
import Table, { type IColumn } from "../organisms/Table/Table";

const FavItems = () => {
  const { itemService } = useServices();
  const { user } = useAuth();
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const columns: IColumn[] = [
    {
      id: "photo",
      label: "Foto",
      align: "center",
      width: "8%",
      minWidth: 80,
    },
    {
      id: "name",
      label: "Nombre",
      align: "left",
      width: "20%",
      minWidth: 150,
    },
    {
      id: "type",
      label: "Tipo",
      align: "left",
      width: "12%",
      minWidth: 100,
    },
    {
      id: "description",
      label: "Descripción",
      align: "left",
      width: "25%",
      minWidth: 200,
    },
    {
      id: "favorite",
      label: "Favs",
      align: "center",
      width: "15%",
      minWidth: 120,
    },
    {
      id: "dateAdded",
      label: "Fecha Agregado",
      align: "left",
      width: "10%",
      minWidth: 120,
    },
    {
      id: "actions",
      label: "Acciones",
      align: "center",
      width: "10%",
      minWidth: 120,
    },
  ];

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      if (!user?.id) {
        setLoading(false);
        setError("Usuario no autenticado");
        return;
      }

      try {
        setLoading(true);
        const result = await itemService.getFavItemsByUserId(
          user.id.toString(),
          currentPage,
          itemsPerPage
        );
        setItems(result.data || []);

        // Update pagination state from meta
        if (result.meta?.pagination) {
          setTotalPages(result.meta.pagination.pageCount);
          setTotalItems(result.meta.pagination.total);
          setItemsPerPage(result.meta.pagination.pageSize);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching favorite items:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar artículos favoritos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteItems();
  }, [itemService, user?.id, currentPage, itemsPerPage]);

  const handleEdit = (item: IItem) => {
    console.log("Edit item:", item);
    // TODO: Navigate to edit form or open modal
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (item: IItem) => {
    if (window.confirm("¿Seguro que quieres borrar este artículo?")) {
      try {
        await itemService.deleteItem(item.documentId);
        setItems(items.filter((i) => i.id !== item.id));
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(
          err instanceof Error ? err.message : "Error al eliminar artículo"
        );
      }
    }
  };

  const handleToggleFavorite = async (item: IItem) => {
    try {
      // TODO: Implementar toggle de favorito usando el nuevo modelo de datos
      console.log("Toggle favorite for item:", item);
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al actualizar estado de favorito"
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
        Mis Artículos Favoritos
      </Typography>

      {items.length === 0 ? (
        <Alert severity="info">
          No se encontraron artículos favoritos. ¡Comienza agregando artículos a
          tus favoritos!
        </Alert>
      ) : (
        <Table
          columns={columns}
          pagination={{
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            onPageChange: handlePageChange,
          }}
        >
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

export default FavItems;
