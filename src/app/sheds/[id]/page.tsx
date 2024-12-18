import Image from "next/image";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import PhotoUploader from "./PhotoUploader";
import { getShed } from "@/lib/queries";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  params: {
    id: string;
  };
};

export default async function ShedDetail({ params }: Props) {
  const { id } = await params;
  const shed = await getShed(id);
  const session = await getServerSession(authOptions);

  if (!shed) {
    notFound();
  }

  return (
    <div>
      <h1>{shed.title}</h1>
      {session && (
        <div>
          <PhotoUploader shedId={id} />
        </div>
      )}
      <div>
        {shed.photos.map((photo) => (
          <div key={photo.id}>
            <Image src={"/" + photo.path} alt="lol" width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
}
