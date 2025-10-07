import { useCallback, useState } from "react";
import { useServices } from "../context/services/useServices";
import type {
  ICreateItemRequest,
  IItemDTO,
  IUpdateItemRequest,
} from "../services/item-service/IItemService";

export const useItemService = () => {
  const { itemService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = useCallback(
    async (itemData: ICreateItemRequest): Promise<IItemDTO | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await itemService.createItem(itemData);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create item";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [itemService]
  );

  const updateItem = useCallback(
    async (
      id: number,
      itemData: IUpdateItemRequest
    ): Promise<IItemDTO | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await itemService.updateItem(id, itemData);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update item";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [itemService]
  );

  const deleteItem = useCallback(
    async (id: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        await itemService.deleteItem(id);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete item";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [itemService]
  );

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await itemService.getItems();
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch items";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [itemService]);

  const getItemById = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);
        const result = await itemService.getItemById(id);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch item";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [itemService]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadPhoto = useCallback(
    async (photo: File) => {
      try {
        setLoading(true);
        setError(null);
        const result = await itemService.uploadPhoto(photo);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload photo";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [itemService]
  );

  return {
    createItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById,
    uploadPhoto,
    loading,
    error,
    clearError,
  };
};

export default useItemService;
