export interface Shed {
  id: string;
  title: string;
  description: string;
  amount: number;
  salePercent: number;
  createdAt: Date;
  updatedAt: Date;
  photos: Photo[];
}

export interface Photo {
  id: string;
  path: string;
  isPrimary: boolean;
  createdAt: Date;
  shedId: string | null;
  trailerId: string | null;
}

export type ShedCreateInput = Omit<Shed, "id" | "createdAt" | "updatedAt" | "photos">;

export type ShedUpdateInput = Partial<ShedCreateInput>;

export type PhotoCreateInput = Omit<Photo, "id" | "createdAt" | "updatedAt" | "shed">;
