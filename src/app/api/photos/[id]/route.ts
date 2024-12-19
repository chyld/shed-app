import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json({ success: false, error: "Photo not found" }, { status: 404 });
    }

    // Reset any existing primary photo for this shed/trailer
    if (photo.shedId) {
      await prisma.photo.updateMany({
        where: {
          shedId: photo.shedId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    } else if (photo.trailerId) {
      await prisma.photo.updateMany({
        where: {
          trailerId: photo.trailerId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    // Toggle the isPrimary status of the clicked photo
    const updatedPhoto = await prisma.photo.update({
      where: { id },
      data: {
        isPrimary: !photo.isPrimary,
      },
    });

    return NextResponse.json({ success: true, photo: updatedPhoto });
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json({ success: false, error: "Failed to update photo" }, { status: 500 });
  }
}
