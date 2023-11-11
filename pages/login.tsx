import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("123123");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const loginRequest = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (loginRequest.ok) router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-gray-300 p-5 rounded-lg w-full max-w-lg shadow-xl">
        <h1 className="text-center mb-5 text-2xl">Login</h1>
        <form onSubmit={login} className="flex flex-col items-center space-y-4">
          <div className="input-container">
            <input
              type="text"
              className="bg-gray-200 h-8 px-2 placeholder-stone-500"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div>
              <label className="text-xs font-sans text-gray-600">
                Please input: test@test.com
              </label>
            </div>
          </div>
          <div className="input-container">
            <input
              type="password"
              className="bg-gray-200 h-8 px-2 placeholder-stone-500"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div>
              <label className="text-xs font-sans text-gray-600">
                Please input: 123123
              </label>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 h-8 w-28 rounded-md"
          >
            {loading ? "loading...." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
