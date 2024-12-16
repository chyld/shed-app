import prisma from '@/lib/prisma'
import Link from 'next/link'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Shed {
  id: string;
  title: string;
  amount: number;
  salePercent: number;
}

export default async function ShedList() {
  const session = await getServerSession(authOptions);
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
          {session && <li><Link href="/sheds/new">New Shed</Link></li>}
        </ul>
      </div>
      
      <ul>
        {sheds.map((shed: Shed) => (
          <li key={shed.id}>
            <Link href={`/sheds/${shed.id}`}>
              <span>{shed.title}</span>
              {shed.salePercent > 0 ? (
                <span>
                  <span className="line-through text-gray-500 mr-2">
                    ${(shed.amount / 100).toFixed(2)}
                  </span>
                  <span className="text-red-600">
                    ${((shed.amount * (100 - shed.salePercent) / 100) / 100).toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-red-600">
                    ({shed.salePercent}% off)
                  </span>
                </span>
              ) : (
                <span>${(shed.amount / 100).toFixed(2)}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      
      {!session && (
        <p>
          <Link href="/login">Login to create new sheds</Link>
        </p>
      )}
    </div>
  )
} 
