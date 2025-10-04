import type { Photo } from "../../data/Models";

export type ImageSize = "thumbnail" | "small" | "medium" | "large" | "original";

/**
 * Obtiene la URL completa de una imagen en el tamaño especificado
 * @param photo - Objeto Photo con las diferentes versiones de la imagen
 * @param size - Tamaño deseado de la imagen
 * @param baseUrl - URL base del servidor (por defecto usa la variable de entorno)
 * @returns URL completa de la imagen o undefined si no existe
 */
export const getImageUrl = (
  photo: Photo | undefined,
  size: ImageSize = "thumbnail",
  baseUrl: string = import.meta.env.VITE_BASE_API_URL
): string | undefined => {
  if (!photo) return undefined;

  // Si pide 'original' o no hay formats, usar la URL principal
  if (size === "original" || !photo.formats) {
    return `${baseUrl}${photo.url}`;
  }

  // Buscar el tamaño solicitado en formats
  const format = photo.formats[size];
  if (format) {
    return `${baseUrl}${format.url}`;
  }

  // Fallback: usar la URL original si no encuentra el tamaño
  return `${baseUrl}${photo.url}`;
};

/**
 * Obtiene la primera imagen de un array de fotos en el tamaño especificado
 * Utility helper para casos comunes donde solo necesitas la primera foto
 */
export const getFirstImageUrl = (
  photos: Photo[] | undefined,
  size: ImageSize = "thumbnail",
  baseUrl?: string
): string | undefined => {
  return getImageUrl(photos?.[0], size, baseUrl);
};
