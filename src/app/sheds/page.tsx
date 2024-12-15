import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function ShedList() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem' 
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Sheds</h1>
        <Link
          href="/sheds/new"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0066cc',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          New Shed
        </Link>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sheds.map((shed: { id: string; title: string; amount: number }) => (
          <li 
            key={shed.id} 
            style={{ 
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '0.5rem'
            }}
          >
            <Link 
              href={`/sheds/${shed.id}`}
              style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                display: 'block'
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{shed.title}</span>
              <span style={{ marginLeft: '0.5rem', color: '#666' }}>
                ${shed.amount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 
