"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  shedId: string;
}

export default function PhotoUploader({ shedId }: Props) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const router = useRouter();

  async function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;

    const formData = new FormData();
    formData.append("shedId", shedId);

    for (const file of event.target.files) {
      formData.append("photos", file);
    }

    const response = await fetch("/api/sheds", {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      router.refresh();
    }
  }

  return (
    <div>
      <h1>PhotoUploader</h1>
      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
    </div>
  );
}
