'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PhotoUploaderProps {
  shedId: string;
  initialPhotos: { id: string; path: string; }[];
}

export default function PhotoUploader({ shedId, initialPhotos }: PhotoUploaderProps) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const formData = new FormData();
    
    formData.append('shedId', shedId);
    for (const file of e.target.files) {
      formData.append('photos', file);
    }

    try {
      const response = await fetch('/api/sheds', {
        method: 'PUT',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        setPhotos(prev => [...prev, ...data.photos]);
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        disabled={uploading}
        style={{ marginBottom: '1rem' }}
      />
      
      {uploading && <p>Uploading...</p>}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, 200px)', 
        gap: '1rem'
      }}>
        {photos.map((photo, index) => (
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
    </div>
  );
} 