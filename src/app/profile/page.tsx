"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/utils/config";

const Profile = () => {
  const [id, setId] = useState(null);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const api: any = axios.create({
    baseURL,
  });

  async function getUserDetails() {
    const response = await api.get("/api/user/profile");

    setId(response.data.user._id);
    setVerified(response.data.user.isVerified);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  async function logout() {
    const response = await api.get("/api/user/logout");

    if (response.data.status === "200") {
      router.replace("/");
    }
  }

  return (
    <>
      <div className=" w-full flex justify-center items-center">
        <div className=" bg-slate-200 rounded-xl ml-8 w-2/4 py-16 mt-16 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="font-bold text-black text-5xl mb-8">PROFILE</h1>
            <div className="flex flex-col justify-center items-center">
              {verified ? (
                <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-green-500">
                  User verified
                </div>
              ) : (
                <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-red-500">
                  User not verified, you might lose your account
                </div>
              )}

              <div
                className=" z-10 py-2 px-6 mt-8 rounded-md bg-blue-500 cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${id}`);
                }}
              >
                {id === null ? "Loading..." : id }
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
      </div>
    </>
  );
};

export default Profile;
