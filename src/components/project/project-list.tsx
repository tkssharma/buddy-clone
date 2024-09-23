"use client";

import { Projects } from "@prisma/client";
import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";
import { ProjectListItem } from "./project-list-item";
import { ProjectHeader } from "./project-header";

export type projectProps = {
  ProjectList: Projects[];
};
export const ProjectList = ({ ProjectList }: projectProps) => {
  return (
    <>
      <ProjectHeader />
      <section
        id="Projects"
        className="mx-auto mb-5 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {ProjectList.map((i: Projects) => {
          return <ProjectListItem key={i.id} project={i} />;
        })}
      </section>
    </>
  );
};
