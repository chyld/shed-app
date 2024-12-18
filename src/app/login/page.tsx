"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
