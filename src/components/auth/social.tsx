"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function Social() {
  const signInHandler = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: "/home",
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <button className="w-full" onClick={() => signInHandler("google")}>
        Google
      </button>
      <button className="w-full" onClick={() => signInHandler("github")}>
        Github
      </button>
    </div>
  );
}
