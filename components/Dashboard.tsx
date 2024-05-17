"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
const Dashboard = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <>
      {session ? (
        <>
          <h1 className="text-3xl text-green-500 font-bold">Welcome Back {session.user?.name}</h1>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-red-500 font-bold px-5">
            Youre not logged in
          </h1>
          <div className="flex space-x-5">
            <button
              className=" border border-black rounded-lg px-5"
              onClick={() => signIn("github")}
            >
              Sing in with Github
            </button>
            <button
              className=" border border-black rounded-lg"
              onClick={() => signIn("google")}
            >
              Sing in with Google
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default Dashboard;
