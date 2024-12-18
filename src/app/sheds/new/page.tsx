"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewShed() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/sheds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        amount: Math.round(parseFloat(formData.get("amount") as string) * 100),
        salePercent: parseInt(formData.get("salePercent") as string) || 0,
      }),
    });

    const { shed } = await response.json();
    router.push(`/sheds/${shed.id}`);
    router.refresh();
  };

  return (
    <div>
      <h1>Create New Shed</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required rows={4} />
        </div>
        <div>
          <label htmlFor="amount">Amount ($)</label>
          <input type="number" id="amount" name="amount" required min="0" step="0.01" />
        </div>
        <div>
          <label htmlFor="salePercent">Sale Percentage (%)</label>
          <input type="number" id="salePercent" name="salePercent" min="0" max="100" defaultValue="0" />
        </div>
        <div>
          <button type="submit">Create Shed</button>
          <Link href="/sheds">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
