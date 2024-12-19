import Link from "next/link";
import { getServerSession } from "next-auth";
import { getSheds } from "@/lib/queries";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SecureLink from "@/components/SecureLink";

export default async function ShedList() {
  const sheds = await getSheds();
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Available Sheds</h1>
      <SecureLink session={session} href="/sheds/new" text="Create New Shed" />

      <ul>
        {sheds.map((shed) => (
          <li key={shed.id}>
            <Link href={`/sheds/${shed.id}`}>{shed.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
