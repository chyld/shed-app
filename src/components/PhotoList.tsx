import { Photo } from "@/lib/types";

interface Props {
  assetType: "shed" | "trailer";
  assetId: string;
  photos: Photo[];
}

export default function PhotoList({ assetType, assetId, photos }: Props) {
  return (
    <div>
      <h1>Photo List</h1>
      {photos.map((photo) => (
        <img src={"/" + photo.path} alt={`${assetType} photo`} key={photo.id} width={200} />
      ))}
    </div>
  );
}
