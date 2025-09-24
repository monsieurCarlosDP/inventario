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
      const formData = await this.prepareFormData(itemData);
      const response = await this.api.post("api/items", formData);

      if (!response.ok) {
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
      const formData = await this.prepareFormData(itemData);
      const response = await this.api.post(`api/items/${id}`, formData);

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

  private async prepareFormData(
    itemData: Partial<ICreateItemRequest>
  ): Promise<FormData> {
    const formData = new FormData();

    // Add basic fields using the correct field names from Models
    if (itemData.Name !== undefined) {
      formData.append(
        "data",
        JSON.stringify({
          Name: itemData.Name,
          Description: itemData.Description || "",
          isFavorite: itemData.isFavorite || false,
        })
      );
    }

    // Add photo if present
    if (itemData.photo instanceof File) {
      formData.append("files.photo", itemData.photo);
    }

    return formData;
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
