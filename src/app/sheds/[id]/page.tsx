import { notFound } from "next/navigation";
import { getShed } from "@/lib/queries";
import PhotoUpload from "@/components/PhotoUpload";
import PhotoList from "@/components/PhotoList";

type Props = {
  params: {
    id: string;
  };
};

export default async function ShedDetail({ params }: Props) {
  const { id } = await params;
  const shed = await getShed(id);

  if (!shed) {
    notFound();
  }

  return (
    <div>
      <h1>{shed.title}</h1>
      <PhotoUpload assetType="shed" assetId={id} />
      <PhotoList assetType="shed" assetId={id} photos={shed.photos} />
    </div>
  );
}
