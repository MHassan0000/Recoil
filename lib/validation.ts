import { z } from "zod";

export const startupTextSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be at most 500 characters"),
  category: z
    .string()
    .trim()
    .min(3, "Category is required")
    .max(20, "Category must be at most 20 characters"),
  pitch: z
    .string()
    .trim()
    .min(10, "Pitch must be at least 10 characters")
    .max(4000, "Pitch must be at most 4000 characters"),
});

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export function getImageFileError(file: unknown): string | null {
  if (!(file instanceof File) || file.size === 0) {
    return "Startup image is required";
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return "Image must be JPG, PNG, WEBP, or AVIF";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "Image size must be 5MB or less";
  }

  return null;
}
