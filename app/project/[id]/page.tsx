import Modal from "@/app/components/Modal";
import { getProject } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/session";
import { ProjectInterface } from "@/common.types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import RelatedProjects from "@/app/components/RelatedProjects";
import ProjectActions from "@/app/components/ProjectActions";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProject(id)) as ProjectInterface;

  if (!result)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const renderLink = () => `/profile/${result?.createdBy?._id}`;

  return (
    <Modal maxWidth="4xl">
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={result?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">{result?.title}</p>
            <div className="user-info">
              <Link href={renderLink()}>{result?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${result.category}`}
                className="text-primary-purple font-semibold"
              >
                {result?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === result?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions
              projectId={result?._id.toString()}
              userId={session?.user?.id.toString()}
            />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${result?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{result?.description}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={result?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={result?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={result?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={result?.createdBy?._id.toString()}
        projectId={result?._id.toString()}
      />
    </Modal>
  );
};

export default page;
