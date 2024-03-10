import { ProjectInterface, UserProfile } from "@/common.types";
import React from "react";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import Link from "next/link";
import { SmilePlus, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => {
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            I’m Full-Stack Web Developer 👋
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button variant="secondary">
              <SmilePlus className="mr-4" />
              Follow
            </Button>
            <Link href={`mailto:${user?.email}`}>
              <Button>
                <Handshake className="mr-4" />
                Hire Me
              </Button>
            </Link>
          </div>
        </div>

        {user?.projects?.length > 0 ? (
          <Image
            src={user?.projects?.[0]?.image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {user?.projects?.map((item: ProjectInterface) => (
            <ProjectCard
              key={`${item?._id.toString()}`}
              _id={item?._id.toString()}
              image={item?.image}
              title={item?.title}
              name={user.name}
              avatarUrl={user.avatarUrl}
              userId={user._id.toString()}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
