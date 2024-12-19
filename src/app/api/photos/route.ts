import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import prisma from "@/lib/prisma";
import { createUploadPath, generateUniqueId } from "@/lib/utils";

// Upload photos for a specific asset, like a shed or trailer
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const assetType = data.get("assetType") as "shed" | "trailer";
    const assetId = data.get("assetId") as string;
    const files = data.getAll("photos") as File[];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const uniqueId = generateUniqueId();
      const filename = `${uniqueId}.${extension}`;

      const { relativePath, absolutePath } = await createUploadPath();

      const fullRelativePath = join(relativePath, filename);
      const fullAbsolutePath = join(absolutePath, filename);

      await writeFile(fullAbsolutePath, buffer);

      const photo = await prisma.photo.create({
        data: {
          path: fullRelativePath,
          shedId: assetType === "shed" ? assetId : undefined,
          trailerId: assetType === "trailer" ? assetId : undefined,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json({ success: false, error: "Failed to upload photos" }, { status: 500 });
  }
}
