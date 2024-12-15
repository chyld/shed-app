import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import prisma from '@/lib/prisma';
import { createUploadPath, generateUniqueId } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.formData();
    const files = data.getAll('photos') as File[];
    
    const { id: shedId } = await params;
    const savedPhotos = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Get file extension
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      
      // Create unique filename with original extension
      const uniqueId = generateUniqueId();
      const filename = `${uniqueId}.${extension}`;
      
      // Get upload paths
      const { relativePath, absolutePath } = await createUploadPath();
      
      // Create full paths
      const fullRelativePath = join(relativePath, filename);
      const fullAbsolutePath = join(absolutePath, filename);
      
      // Save file to disk
      await writeFile(fullAbsolutePath, buffer);
      
      // Save to database with relative path
      const photo = await prisma.photo.create({
        data: {
          path: fullRelativePath.replace(/\\/g, '/'), // Convert Windows backslashes to forward slashes
          shedId,
        },
      });
      
      savedPhotos.push(photo);
    }

    return NextResponse.json({ success: true, photos: savedPhotos });
  } catch (error) {
    console.error('Error uploading photos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload photos' },
      { status: 500 }
    );
  }
} 