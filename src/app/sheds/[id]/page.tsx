import Image from 'next/image';
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PhotoUploader from './PhotoUploader'

type Photo = {
  id: string;
  path: string;
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShedDetail({ params }: PageProps) {
  const { id } = await params;
  
  const shed = await prisma.shed.findUnique({
    where: { id },
    include: {
      photos: true
    }
  });

  if (!shed) {
    notFound()
  }

  const photos: Photo[] = shed.photos.map((photo: { id: number; path: string }) => ({
    id: photo.id.toString(),
    path: photo.path
  }));

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {shed.title}
        </h1>
        <p>Price: ${shed.amount}</p>
        <p>{shed.description}</p>
        <p>Created: {shed.createdAt.toLocaleDateString()}</p>
        <p>Last Updated: {shed.updatedAt.toLocaleDateString()}</p>
        <Link href="/sheds">Back to Sheds</Link>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Photos
        </h2>
        <PhotoUploader shedId={id} initialPhotos={photos} />
      </div>
    </div>
  );
} 
