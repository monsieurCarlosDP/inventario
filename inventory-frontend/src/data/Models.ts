export interface IItemList {
  id: number;
  documentId: string;
  Name: string;
  DateAdded: string;
  Description?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface IItem {
  id: number;
  documentId: string;
  Name: string;
  DateAdded: string;
  Description?: string;
  isFavorite?: boolean;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
