import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import prisma from "@/lib/prisma";
import { createUploadPath, generateUniqueId } from "@/lib/utils";

// Create new shed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const shed = await prisma.shed.create({
      data: {
        title: body.title,
        description: body.description,
        amount: body.amount,
        salePercent: body.salePercent || 0,
      },
    });

    return NextResponse.json({ success: true, shed });
  } catch (error) {
    console.error("Error creating shed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create shed" },
      { status: 500 }
    );
  }
}

// Upload photos for a specific shed
export async function PUT(request: NextRequest) {
  try {
    const data = await request.formData();
    const files = data.getAll("photos") as File[];
    const shedId = data.get("shedId") as string;

    if (!shedId) {
      return NextResponse.json(
        { success: false, error: "Shed ID is required" },
        { status: 400 }
      );
    }

    const savedPhotos = [];

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
          path: fullRelativePath.replace(/\\/g, "/"),
          shedId,
        },
      });

      savedPhotos.push(photo);
    }

    return NextResponse.json({ success: true, photos: savedPhotos });
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload photos" },
      { status: 500 }
    );
  }
}
