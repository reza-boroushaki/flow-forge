import { UserProfile } from "@/common.types";
import React, { Suspense } from "react";
import { getUserProjects } from "@/app/lib/actions";
import ProfilePage from "@/app/components/ProfilePage";

type Props = {
  params: {
    id: string;
  };
};

const userProfile = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id, 100)) as UserProfile;

  if (!result)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return (
    <Suspense fallback="Loading suspense........">
      <ProfilePage user={result} />
    </Suspense>
  );
};

export default userProfile;
