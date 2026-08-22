"use client"
import config from "@/lib/config";
import { ImageKitProvider, Video } from "@imagekit/next";

export default function BookVideo({ videoUrl }: { videoUrl: string }) {
  return <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
    <Video src={videoUrl} controls={true} className="w-full rounded-xl" />

  </ImageKitProvider>

}

