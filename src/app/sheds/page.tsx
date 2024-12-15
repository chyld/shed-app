import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function ShedList() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
      <h1>Sheds</h1>
      <ul>
        {sheds.map(shed => (
          <li key={shed.id}>
            <Link href={`/sheds/${shed.id}`}>
              {shed.title} - ${shed.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 
