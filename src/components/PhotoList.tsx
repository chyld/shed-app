"use client";

import { Photo } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  assetType: "shed" | "trailer";
  assetId: string;
  photos: Photo[];
}

export default function PhotoList({ assetType, assetId, photos }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const handlePhotoClick = async (photoId: string) => {
    if (!session) return;

    const response = await fetch(`/api/photos/${photoId}`, {
      method: "PATCH",
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div>
      <h1>Photo List</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => handlePhotoClick(photo.id)}>
            <img src={"/" + photo.path} alt={`${assetType} photo`} width={200} />
            {photo.isPrimary && <span>Primary</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
