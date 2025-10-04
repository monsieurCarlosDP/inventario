import type { Paginated } from "../../data/IApi";
import type { IItem } from "../../data/Models";
import type { AuthUser } from "../auth-service/IAuthService";
// DTOs that extend the base models
export type IItemDTO = IItem;

export interface ICreateItemRequest {
  Name: string;
  Description?: string;
  Favorited?: AuthUser | undefined; // Cambio: de isFavorite a Favorited con AuthUser
  Photos?: number | null; // ID de la foto subida, no el File
}

export type IUpdateItemRequest = Partial<ICreateItemRequest>;

export interface IItemService {
  getItems(): Promise<Paginated<IItemDTO>>;
  getItemById(id: number): Promise<IItemDTO>;
  createItem(itemData: ICreateItemRequest): Promise<IItemDTO>;
  updateItem(id: number, itemData: IUpdateItemRequest): Promise<IItemDTO>;
  deleteItem(id: number): Promise<void>;
  uploadPhoto(photo: File): Promise<{ id: number; url: string }>;
}
