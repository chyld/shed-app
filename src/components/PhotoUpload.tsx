"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  assetType: "shed" | "trailer";
  assetId: string;
}

export default function PhotoUploader({ assetType, assetId }: Props) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const router = useRouter();

  async function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;

    const formData = new FormData();
    formData.append("assetType", assetType);
    formData.append("assetId", assetId);

    for (const file of event.target.files) {
      formData.append("photos", file);
    }

    const response = await fetch("/api/photos", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      router.refresh();
    }
  }

  return (
    <div>
      <h1>Photo Uploader</h1>
      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
    </div>
  );
}
