/** @format */

import { updateStudioSettingsSchema } from "@/schemas/studio-setting.schema";
import { useZodForm } from "./useZodForm";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStudioSetting } from "@/lib/utils";
import { toast } from "sonner";

export const useStudioSetting = (
  id: string,
  screen?: string | null,
  audio?: string | null,
  preset?: "HD" | "SD",
  plan?: "PRO" | "FREE"
) => {
  const [onPreset, setOnPreset] = useState<"HD" | "SD" | undefined>(undefined);
  const { register, watch } = useZodForm(updateStudioSettingsSchema, {
    screen: screen!,
    audio: audio!,
    preset: preset!,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-studio"],
    mutationFn: async (data: {
      screen: string;
      id: string;
      audio: string;
      preset: "HD" | "SD";
    }) => {
      updateStudioSetting(data.id, data.audio, data.screen, data.preset);
    },
    onSuccess: (data: any) =>
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      }),
  });

  useEffect(() => {
    if (screen && audio && preset) {
      window.ipcRenderer.send("media-sources", {
        screen,
        id: id,
        audio,
        preset,
        plan,
      });
    }
  }, []);

  useEffect(() => {
    const subcribe = watch((value) => {
      setOnPreset(value.preset);
      mutate({
        screen: value.screen!,
        id,
        audio: value.audio!,
        preset: value.preset!,
      });

      window.ipcRenderer.send("media-sources", {
        screen: value.screen,
        id,
        audio: value.audio,
        preset: value.preset,
        plan,
      });
    });

    return () => subcribe.unsubscribe();
  }, [watch]);

  return { register, isPending, onPreset };
};
