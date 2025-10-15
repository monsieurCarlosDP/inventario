import type { Paginated } from "../../data/IApi";
import type { IItem, ItemType } from "../../data/Models";
import type { AuthUser } from "../auth-service/IAuthService";
// DTOs that extend the base models
export type IItemDTO = IItem;
export type IItemTypeDTO = ItemType;

export interface ICreateItemRequest {
  Name: string;
  Description?: string;
  Favorited?: AuthUser | undefined; // Cambio: de isFavorite a Favorited con AuthUser
  Photos?: number | null; // ID de la foto subida, no el File
  item_type?: ItemType | null; // Agregar el campo item_type
}

export type IUpdateItemRequest = Partial<ICreateItemRequest>;

export interface IItemService {
  getItems(page?: number, pageSize?: number): Promise<Paginated<IItemDTO>>;
  getItemTypes(
    page?: number,
    pageSize?: number
  ): Promise<Paginated<IItemTypeDTO>>;
  getItemById(id: number): Promise<IItemDTO>;
  createItem(itemData: ICreateItemRequest): Promise<IItemDTO>;
  updateItem(id: number, itemData: IUpdateItemRequest): Promise<IItemDTO>;
  deleteItem(documentId: string): Promise<void>;
  uploadPhoto(photo: File): Promise<{ id: number; url: string }>;
}
