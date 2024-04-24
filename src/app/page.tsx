"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center mx-auto mt-32">
      <h1 className=" font-bold text-2xl z-10 py-4 px-8 mt-28 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter backdrop-saturate-150 text-center">
        Auth App
      </h1>

      <div className=" flex flex-row justify-between">
        <h1
          className=" font-bold text-xl z-10 py-4 px-8 mt-28 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter backdrop-saturate-150 mr-4 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Signup
        </h1>
        <h1
          className="font-bold text-xl z-10 py-4 px-8 mt-28 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter backdrop-saturate-150 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </h1>
      </div>
    </main>
  );
}
