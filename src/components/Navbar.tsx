"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <div>
        <div>
          <Link href="/">Shed Store</Link>
        </div>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sheds">Sheds</Link>
          </li>
          {session ? (
            <li>
              <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
