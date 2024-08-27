"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  //const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const signInHandler = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: "" || "/",
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => signInHandler("google")}
        className="w-full"
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => signInHandler("github")}
        className="w-full"
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};
