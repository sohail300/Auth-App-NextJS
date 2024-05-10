"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const ProfilePage = ({ params }: any) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const api = axios.create({
    baseURL,
  });

  const router = useRouter();

  const id = params.id;

  async function getDetails() {
    const response = await api.post("/api/user/profilePage", {
      id,
    });
    setUsername(response.data.user.username);
    setEmail(response.data.user.email);
    setIsVerified(response.data.user.isVerified);
  }

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    const response = await api.get("/api/user/logout");

    if (response.data.success) {
      router.replace("/");
    }
  }

  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" bg-slate-200 rounded-xl ml-8 w-2/4 py-16 mt-16 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="font-bold text-black text-5xl mb-8">MY PROFILE</h1>

          {isVerified ? (
            <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-green-500">
              User verified
            </div>
          ) : (
            <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-red-500">
              User not verified, you might lose your account
            </div>
          )}

          <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-blue-500">
            {username === null ? "Loading..." : username}
          </div>

          <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-blue-500">
            {email === null ? "Loading..." : email}
          </div>

          <div
            className=" z-10 py-2 px-6 mt-8 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg backdrop-filter backdrop-saturate-150 cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </div>

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
