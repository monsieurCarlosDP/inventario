import type { Api } from "../../data/Api";
import type { Paginated } from "../../data/IApi";
import type {
  ICreateItemRequest,
  IItemDTO,
  IItemService,
  IUpdateItemRequest,
} from "./IItemService";

export class ItemService implements IItemService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getItems(): Promise<Paginated<IItemDTO>> {
    try {
      const response = await this.api.getItemList<IItemDTO>();
      return response;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw this.createItemError("Failed to fetch items", error);
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

      const jsonData = {
        data: dataObject,
      };

      console.log("📤 Sending JSON data:", jsonData);

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

  async deleteItem(id: number): Promise<void> {
    try {
      const response = await this.api.post(`api/items/${id}`, undefined, {
        "X-HTTP-Method-Override": "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw this.createItemError(`Failed to delete item ${id}`, error);
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
