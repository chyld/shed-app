import prisma from "@/lib/prisma";

export async function getSheds() {
  return prisma.shed.findMany();
}

export async function getShed(id: string) {
  return prisma.shed.findUnique({
    where: { id },
    include: {
      photos: true,
    },
  });
}
