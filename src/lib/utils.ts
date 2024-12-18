import { join } from "path";
import { mkdir } from "fs/promises";

export async function createUploadPath() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const datePath = `${year}-${month}-${day}`;
  const relativePath = join("uploads", "photos", datePath);
  const absolutePath = join(process.cwd(), "public", relativePath);

  // Create directory if it doesn't exist
  await mkdir(absolutePath, { recursive: true });

  return { relativePath, absolutePath };
}

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
