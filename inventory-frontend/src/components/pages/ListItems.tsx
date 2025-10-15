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
    const fetchItems = async () => {
      try {
        setLoading(true);
        const result = await itemService.getItems(currentPage, itemsPerPage);
        setItems(result.data || []);

        // Update pagination state from meta
        if (result.meta?.pagination) {
          setTotalPages(result.meta.pagination.pageCount);
          setTotalItems(result.meta.pagination.total);
          setItemsPerPage(result.meta.pagination.pageSize);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(
          err instanceof Error ? err.message : "Error al cargar los artículos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [itemService, currentPage, itemsPerPage]);

  const handleEdit = (item: IItem) => {
    console.log("Edit item:", item);
    // TODO: Navegar al formulario de edición o abrir modal
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (item: IItem) => {
    if (window.confirm("¿Sequro que quieres borrar este item?")) {
      try {
        await itemService.deleteItem(item.documentId);
        setItems(items.filter((i) => i.id !== item.id));
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(err instanceof Error ? err.message : "Un error ocurrió");
      }
    }
  };

  const handleToggleFavorite = async (item: IItem) => {
    console.log(item);
    /*  try {
      const updatedItem = await itemService.updateItem(item.id, {
        Name: item.Name,
        Description: item.Description,
        isFavorite: !item.isFavorite,
      });

      setItems(items.map((i) => (i.id === item.id ? updatedItem : i)));
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError(
        err instanceof Error ? err.message : "Error al actualizar estado de favorito"
      );
    } */
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
        Artículos del Inventario
      </Typography>

      {items.length === 0 ? (
        <Alert severity="info">
          No se encontraron artículos. ¡Agrega algunos artículos para comenzar!
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

export default ListItems;
