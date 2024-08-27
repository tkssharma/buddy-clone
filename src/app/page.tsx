import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});
export default function Home() {
  return (
    <main
      className={cn(
        "bg-gradient flex h-full flex-col items-center justify-center",
      )}
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-7xl font-semibold text-sky-50",
            poppins.className,
          )}
        >
          Auth.js
        </h1>
        <p className="text-lg text-slate-400">Buddy Clone</p>
        <div></div>
      </div>
    </main>
  );
}
