"use client";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "@/utils/config";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleUsername(e: any) {
    setUsername(e.target.value);
  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  async function handleSignup() {
    const response = await axios.post("/api/user/signup", {
      username,
      email,
      password,
    });
    console.log(response.data);
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
            <h1 className="font-bold text-black text-5xl mb-8">SIGNUP</h1>
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="bg-white rounded-md p-2 mb-8 text-black placeholder-black placeholder-opacity-75 border border-solid border-gray1 focus:outline-none focus:border-gray2"
                placeholder="USERNAME"
                onChange={(e) => handleUsername(e)}
                value={username}
              />
              <input
                type="text"
                className="bg-white rounded-md p-2 mb-8 text-black placeholder-black placeholder-opacity-75 border border-solid border-gray1 focus:outline-none focus:border-gray2"
                placeholder="EMAIL"
                onChange={(e) => handleEmail(e)}
                value={email}
              />
              <input
                type="password"
                className="bg-white rounded-md p-2 mb-8 text-black placeholder-black placeholder-opacity-75 border border-solid border-gray1 focus:outline-none focus:border-gray2"
                placeholder="PASSWORD"
                onChange={(e) => handlePassword(e)}
                value={password}
              />
              <input
                className="cursor-pointer rounded-md bg-cyan-400 text-black w-full p-2 outline-none shadow-sm shadow-black font-medium"
                type="submit"
                value="SIGNUP"
                onClick={() => handleSignup()}
              />
            </div>

            <div
              className=" z-10 py-2 px-6 mt-8 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg backdrop-filter backdrop-saturate-150 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Visit Login Page
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
