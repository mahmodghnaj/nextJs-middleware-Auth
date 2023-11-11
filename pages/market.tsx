import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-gray-300 p-5 rounded-lg w-full max-w-lg flex items-center justify-center flex-col shadow-xl">
        <h1 className="mb-5 text-2xl">Market</h1>
        <button
          className="bg-blue-500 h-8 w-28 rounded-md mt-5"
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Page;
