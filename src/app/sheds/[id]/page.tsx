import Image from 'next/image';
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PhotoUploader from './PhotoUploader'
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
  const session = await getServerSession(authOptions);
  
  const shed = await prisma.shed.findUnique({
    where: { id },
    include: {
      photos: true
    }
  });

  if (!shed) {
    notFound()
  }

  const photos = shed.photos.map((photo: Photo) => ({
    id: photo.id,
    path: photo.path
  }));

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {shed.title}
        </h1>
        <div className="mb-4">
          {shed.salePercent > 0 ? (
            <div>
              <p className="line-through text-gray-500">
                Original Price: ${(shed.amount / 100).toFixed(2)}
              </p>
              <p className="text-red-600 font-bold">
                Sale Price: ${((shed.amount * (100 - shed.salePercent) / 100) / 100).toFixed(2)}
                <span className="ml-2">({shed.salePercent}% off)</span>
              </p>
            </div>
          ) : (
            <p>Price: ${(shed.amount / 100).toFixed(2)}</p>
          )}
        </div>
        <p>{shed.description}</p>
        <p>Created: {shed.createdAt.toLocaleDateString()}</p>
        <p>Last Updated: {shed.updatedAt.toLocaleDateString()}</p>
        <Link href="/sheds">Back to Sheds</Link>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Photos
        </h2>
        {session ? (
          <PhotoUploader shedId={id} initialPhotos={photos} />
        ) : (
          <div>
            {photos.map((photo: Photo, index: number) => (
              <div key={photo.id} style={{ width: 200, height: 200, position: 'relative' }}>
                <Image
                  src={`/${photo.path}`}
                  alt={`Shed photo ${index + 1}`}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
