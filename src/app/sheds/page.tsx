import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function ShedList() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
      <div>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sheds">Sheds</Link></li>
          <li><Link href="/sheds/new">New Shed</Link></li>
        </ul>
      </div>
      
      <ul>
        {sheds.map((shed: { id: string; title: string; amount: number }) => (
          <li key={shed.id}>
            <Link href={`/sheds/${shed.id}`}>
              <span>{shed.title}</span>
              <span>${shed.amount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 
