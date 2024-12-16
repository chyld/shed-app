import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sheds">Sheds</Link></li>
          <li><Link href="/sheds/new">New Shed</Link></li>
        </ul>
      </div>
      <h1>Hello World</h1>
    </div>
  );
}
