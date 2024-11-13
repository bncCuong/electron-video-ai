/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onCloseApp = () => window.ipcRenderer.send("closeApp");

const httpsClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
});
export const fetchUserInfo = async (id: string) => {
  const reponse = await httpsClient.get(`/auth/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return reponse.data;
};

export const getMediaSources = async () => {
  const displays = await window.ipcRenderer.invoke("getSources");
  const enumerateDevices =
    await window.navigator.mediaDevices.enumerateDevices();
  const audioInputs = enumerateDevices.filter(
    (device) => device.kind === "audioinput"
  );

  console.log("Getting sources");
  return { displays, audio: audioInputs };
};

export const updateStudioSetting = async (
  id: string,
  audio: string,
  screen: string,
  preset: "HD" | "SD"
) => {
  const reponse = await httpsClient.post(
    `/studio/${id}`,
    { screen, audio, preset },
    { headers: { "Content-Type": "application/json" } }
  );
  return reponse.data;
};
