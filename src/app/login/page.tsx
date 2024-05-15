"use client";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "@/utils/config";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleUsername(e: any) {
    setUsername(e.target.value);
  }

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    const response = await axios.post("/api/user/login", {
      username,
      password,
    });
    toast(response.data.msg);
    if (response.data.success) {
      router.replace("/profile");
    }
  }

  return (
    <>
      <div className=" w-full flex justify-center items-center">
        <div className=" bg-slate-200 rounded-xl ml-8 w-2/4 py-16 mt-16 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="font-bold text-black text-5xl mb-8">LOGIN</h1>
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="bg-white rounded-md p-2 mb-8 text-black placeholder-black placeholder-opacity-75 border border-solid border-gray1 focus:outline-none focus:border-gray2"
                placeholder="USERNAME"
                onChange={handleUsername}
                value={username}
              />
              <input
                type="password"
                className="bg-white rounded-md p-2 mb-8 text-black placeholder-black placeholder-opacity-75 border border-solid border-gray1 focus:outline-none focus:border-gray2"
                placeholder="PASSWORD"
                onChange={handlePassword}
                value={password}
              />
              <input
                className="cursor-pointer rounded-md bg-cyan-400 text-black w-full p-2 outline-none shadow-sm shadow-black font-medium"
                type="submit"
                value="LOGIN"
                onClick={handleLogin}
              />
              {/* <p
                className=" mt-6 text-blue-600 cursor-pointer"
                onClick={() => router.push("/forgotPassword")}
              >
                Forgot Password
              </p> */}
            </div>

            <div
              className=" z-10 py-2 px-6 mt-8 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg backdrop-filter backdrop-saturate-150 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Visit Signup Page
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
