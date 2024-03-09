import React from "react";
import { getUserProjects } from "../lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";
import Link from "next/link";
import Image from "next/image";

const RelatedProjects = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const result = (await getUserProjects(userId, 2)) as UserProfile;
  const filter = result?.projects?.filter(
    (item: ProjectInterface) => item?._id.toString() !== projectId
  );

  if (filter?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filter?.map((item: ProjectInterface) => (
          <div
            key={item._id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link
              href={`/project/${item?._id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={item?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{item?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
