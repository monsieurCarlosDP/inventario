export type IItemList = IItem[];

export interface IItem {
  id: number;
  documentId: string;
  Name: string;
  DateAdded: string | null;
  Description: string | null;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  publishedAt: string; // ISO-8601
  Photos: Photo[];
  Favorited: FavoritedUser[];
  UserAddedBy: FavoritedUser | null;
  item_type: ItemType | null;
}

export interface ItemType {
  id: number;
  documentId: string;
  Name: string;
  Icon: string;
  Color: string;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  publishedAt: string; // ISO-8601
}

export interface Photo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormatMap; // algunas variantes pueden faltar, por eso son opcionales
  hash: string;
  ext: string; // p.ej. ".png"
  mime: string; // p.ej. "image/png"
  size: number; // en KB según tu ejemplo
  url: string;
  previewUrl: string | null;
  provider: string; // p.ej. "local"
  provider_metadata: unknown | null;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  publishedAt: string; // ISO-8601
}

export interface ImageFormatMap {
  thumbnail?: ImageVariant;
  small?: ImageVariant;
  medium?: ImageVariant;
  large?: ImageVariant;
}

export interface ImageVariant {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number; // en KB según tu ejemplo
  sizeInBytes: number;
  url: string;
}

export interface FavoritedUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string; // p.ej. "local"
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  publishedAt: string; // ISO-8601
  Avatar: string; // URL del avatar
}
