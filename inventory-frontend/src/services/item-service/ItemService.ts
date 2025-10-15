import type { Api } from "../../data/Api";
import type { Paginated } from "../../data/IApi";
import type {
  ICreateItemRequest,
  IItemDTO,
  IItemService,
  IItemTypeDTO,
  IUpdateItemRequest,
} from "./IItemService";

export class ItemService implements IItemService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getItems(
    page?: number,
    pageSize?: number
  ): Promise<Paginated<IItemDTO>> {
    try {
      const response = await this.api.getItemList<IItemDTO>(page, pageSize);
      return response;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw this.createItemError("Failed to fetch items", error);
    }
  }

  async getItemTypes(
    page?: number,
    pageSize?: number
  ): Promise<Paginated<IItemTypeDTO>> {
    try {
      const response = await this.api.getItemTypeList<IItemTypeDTO>(
        page,
        pageSize
      );
      return response;
    } catch (error) {
      console.error("Error fetching item types:", error);
      throw this.createItemError("Failed to fetch item types", error);
    }
  }

  async getItemById(id: number): Promise<IItemDTO> {
    try {
      const response = await this.api.get<IItemDTO>(`api/items/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw this.createItemError(`Failed to fetch item ${id}`, error);
    }
  }

  async getFavItemsByUserId(
    userId: string,
    page: number = 1,
    pageSize: number = 25
  ): Promise<Paginated<IItemDTO>> {
    try {
      const response = await this.api.getUserFavItemsById<IItemDTO>(
        userId,
        page,
        pageSize
      );
      return response;
    } catch (error) {
      console.error(`Error fetching favorite items for user ${userId}:`, error);
      throw this.createItemError(
        `Failed to fetch favorite items for user ${userId}`,
        error
      );
    }
  }

  async createItem(itemData: ICreateItemRequest): Promise<IItemDTO> {
    try {
      // Construir data object de forma condicional
      const dataObject: Record<string, unknown> = {
        Name: itemData.Name,
        Description: itemData.Description,
      };

      // Solo agregar Favorited si existe en itemData
      if (itemData.Favorited !== undefined) {
        dataObject.Favorited = [itemData.Favorited];
      }
      if (itemData.Photos !== undefined) {
        dataObject.Photos = itemData.Photos;
      }
      if (itemData.item_type !== undefined) {
        // Remover documentId del item_type antes de enviarlo
        if (itemData.item_type !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { documentId, ...itemTypeWithoutDocumentId } =
            itemData.item_type;
          dataObject.item_type = itemTypeWithoutDocumentId;
        } else {
          dataObject.item_type = null;
        }
      }

      const jsonData = {
        data: dataObject,
      };

      const response = await this.api.post("api/items", jsonData);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Response error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error creating item:", error);
      throw this.createItemError("Failed to create item", error);
    }
  }

  async updateItem(
    id: number,
    itemData: IUpdateItemRequest
  ): Promise<IItemDTO> {
    try {
      // Construir data object de forma condicional
      const dataObject: Record<string, unknown> = {};

      // Solo agregar campos que están definidos
      if (itemData.Name !== undefined) {
        dataObject.Name = itemData.Name;
      }
      if (itemData.Description !== undefined) {
        dataObject.Description = itemData.Description;
      }
      if (itemData.Favorited !== undefined) {
        dataObject.Favorited = itemData.Favorited;
      }
      if (itemData.Photos !== undefined) {
        dataObject.Photos = itemData.Photos;
      }

      const jsonData = {
        data: dataObject,
      };

      console.log("📤 Updating with JSON data:", jsonData);

      const response = await this.api.post(`api/items/${id}`, jsonData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw this.createItemError(`Failed to update item ${id}`, error);
    }
  }

  async deleteItem(documentId: string): Promise<void> {
    try {
      const response = await this.api.deleteItemById(documentId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting item ${documentId}:`, error);
      throw this.createItemError(`Failed to delete item ${documentId}`, error);
    }
  }

  async uploadPhoto(photo: File): Promise<{ id: number; url: string }> {
    try {
      const formData = new FormData();
      formData.append("files", photo);

      const response = await this.api.post("api/upload", formData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const uploadResult = await response.json();

      // Strapi devuelve un array de archivos subidos
      if (Array.isArray(uploadResult) && uploadResult.length > 0) {
        const uploadedFile = uploadResult[0];
        return {
          id: uploadedFile.id,
          url: uploadedFile.url,
        };
      }

      throw new Error("No file was uploaded");
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw this.createItemError("Failed to upload photo", error);
    }
  }

  private createItemError(message: string, originalError: unknown): Error {
    const error = new Error(message);
    if (originalError instanceof Error) {
      error.cause = originalError;
    }
    return error;
  }
}

export default ItemService;
