import { Session } from "next-auth";
import Link from "next/link";

interface Props {
  session: Session | null;
  href: string;
  text: string;
}

export default function SecureLink({ session, href, text }: Props) {
  if (!session) {
    return null;
  }

  return <Link href={href}>{text}</Link>;
}
