'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sheds">Sheds</Link></li>
          {session ? (
            <>
              <li><Link href="/sheds/new">New Shed</Link></li>
              <li>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login">Login</Link></li>
          )}
        </ul>
      </div>
      <h1>Hello World</h1>
    </div>
  );
}
