import type { Paginated } from "../../data/IApi";
import type { IItem } from "../../data/Models";
// DTOs that extend the base models
export type IItemDTO = IItem;

export interface ICreateItemRequest {
  Name: string;
  Description?: string;
  isFavorite?: boolean;
  photo?: File | null;
}

export type IUpdateItemRequest = Partial<ICreateItemRequest>;

export interface IItemService {
  getItems(): Promise<Paginated<IItemDTO>>;
  getItemById(id: number): Promise<IItemDTO>;
  createItem(itemData: ICreateItemRequest): Promise<IItemDTO>;
  updateItem(id: number, itemData: IUpdateItemRequest): Promise<IItemDTO>;
  deleteItem(id: number): Promise<void>;
}
