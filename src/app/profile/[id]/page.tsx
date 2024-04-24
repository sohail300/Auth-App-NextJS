"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const ProfilePage = ({ params }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    console.log(response.data);
    console.log(response.data.data.username);
    console.log(response.data.data.email);
    setUsername(response.data.data.username);
    setEmail(response.data.data.email);
    setIsVerified(response.data.data.isVerified);
  }

  useEffect(() => {
    getDetails();
  }, []);

  async function logout() {
    const response = await api.get("/api/user/logout");

    if (response.data.status === "200") {
      router.replace("/");
    }
  }

  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" bg-slate-200 rounded-xl ml-8 w-2/4 py-16 mt-16 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col justify-center items-center ">
          {isVerified ? (
            <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-green-500">
              User verified
            </div>
          ) : (
            <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-red-500">
              User not verified
            </div>
          )}

          <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-blue-500">
            {username}
          </div>

          <div className=" z-10 py-2 px-6 mt-8 rounded-md bg-green-500">
            {email}
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
