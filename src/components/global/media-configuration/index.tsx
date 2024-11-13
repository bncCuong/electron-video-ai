/** @format */
import { SourceDeviceStateProps } from "@/hooks/useMediaSources";
import { useStudioSetting } from "@/hooks/useStudioSetting";

type Props = {
  state: SourceDeviceStateProps;
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
};

const MediaConfiguration = ({ state, user }: Props) => {
  console.log(state);
  const activeScreen = state.displays?.find(
    (screen) => screen.id === user?.studio?.screen
  );
  const activeAudio = state.audioInputs?.find(
    (device) => device.diviceId === user?.studio?.mic
  );

  const { register, isPending, onPreset } = useStudioSetting(
    user!.id,
    user?.studio?.screen || state.displays?.[0]?.id,
    user?.studio?.mic || state.audioInputs?.[0]?.diviceId,
    user?.studio?.preset,
    user?.subscription?.plan
  );
  return <form className="flex h-full relative w-full flex-col gap-y-5"></form>;
};

export default MediaConfiguration;
