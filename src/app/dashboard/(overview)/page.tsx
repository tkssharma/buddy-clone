import { lusitana } from "@/components/dashboard/fonts";
import { CardsSkeleton } from "@/components/dashboard/skeltons";
import { ProjectList } from "@/components/project/project-list";
import { listUserProjects } from "@/lib/actions/project.action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RequestStatus } from "@prisma/client";
import { Suspense } from "react";

// SSR
export default async function Dashboard() {
  // server side pages
  // SSR
  const data = await listUserProjects();
  return (
    <main>
      <h1 className={`{lusitana.className} mb-4 text-xl md:text-2xl`}>
        <ProjectList ProjectList={data} />
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}></Suspense>
      </div>
    </main>
  );
}
