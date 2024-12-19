import { notFound } from "next/navigation";
import PhotoUploader from "./PhotoUploader";
import { getShed } from "@/lib/queries";

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
      <div>
        <PhotoUploader shedId={id} />
      </div>
    </div>
  );
}
