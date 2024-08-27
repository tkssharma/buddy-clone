import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" asChild className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
