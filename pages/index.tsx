import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const logout = async () => {
    try {
      setLoading(true);
      const loginRequest = await fetch("/api/auth", {
        method: "DELETE",
      });
      if (loginRequest.ok) router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-gray-300 p-5 rounded-lg w-full max-w-lg flex items-center justify-center flex-col shadow-xl">
        <h1 className="mb-5 text-2xl">Dashboard</h1>
        <button
          disabled={loading}
          className="bg-blue-500 h-8 w-28 rounded-md"
          onClick={() => logout()}
        >
          {loading ? "loading...." : "Logout"}
        </button>
        <button
          className="bg-blue-500 h-8 w-28 rounded-md mt-5"
          onClick={() => router.push("/market")}
        >
          Market
        </button>
      </div>
    </div>
  );
}
