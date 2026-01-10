"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login gagal");
        return;
      }

      // LOGIN BERHASIL → KE DASHBOARD
      router.push("/admin/dashboard");
      router.refresh(); // biar middleware & layout ke-sync
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white p-8 rounded-xl shadow"
    >
      <h1 className="text-2xl font-bold mb-2 text-center">☕ Cafe Surya</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Admin Login
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="admin"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Memeriksa..." : "Login"}
      </button>
    </form>
  );
}
