import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function ShedDetail({ params }: { params: { id: string } }) {
  const shed = await prisma.shed.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if (!shed) {
    notFound()
  }

  return (
    <div>
      <h1>{shed.title}</h1>
      <p>Price: ${shed.price}</p>
      <p>{shed.description}</p>
      <p>Created: {shed.createdAt.toLocaleDateString()}</p>
      <p>Last Updated: {shed.updatedAt.toLocaleDateString()}</p>
      <Link href="/sheds">Back to Sheds</Link>
    </div>
  )
} 
