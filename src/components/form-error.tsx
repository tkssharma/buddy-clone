import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

interface Props {
  message?: string;
}

export const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive/80">
      <FaTriangleExclamation className="h-4 w-4" />
      <p className=" ">{message}</p>
    </div>
  );
};
