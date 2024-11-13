/** @format */

import React, { useEffect, useState } from "react";
import { ClerkLoading, useUser, SignedIn } from "@clerk/clerk-react";
import { Loader } from "../loader/spiner";
import { fetchUserInfo } from "@/lib/utils";
import { useMediaSources } from "@/hooks/useMediaSources";
import MediaConfiguration from "../media-configuration";

const Widget = () => {
  const [profile, setProfile] = useState<{
    status: number;
    user:
      | ({
          subscription: {
            plan: "PRO" | "FREE";
          } | null;
          studio: {
            id: string;
            screen: string | null;
            mic: string | null;
            preset: "HD" | "SD";
            camera: string | null;
            userId: string | null;
          } | null;
        } & {
          id: string;
          email: string;
          firstname: string | null;
          lastname: string | null;
          createdAt: Date;
          clerkid: string;
        })
      | null;
  } | null>(null);
  const { user } = useUser();
  const { state, fetchMediaResources } = useMediaSources();
  useEffect(() => {
    if (user && user.id) {
      fetchUserInfo(user.id).then((u) => setProfile(u));
    }
  }, [user]);

  return (
    <div className="p-5 ">
      <ClerkLoading>
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      </ClerkLoading>
      <SignedIn>
        {profile ? (
          <MediaConfiguration user={profile?.user} state={state} />
        ) : (
          <div className="w-full h-screen justify-center items-center flex">
            <Loader color="#fff" />
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default Widget;
