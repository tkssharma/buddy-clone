import { lusitana } from "@/components/dashboard/fonts";
import { CardsSkeleton } from "@/components/dashboard/skeltons";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard Page
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}></Suspense>
      </div>
    </main>
  );
}
