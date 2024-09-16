import { VideoPageComponent } from "@/components/video-page";
import React from "react";

export default function Post({ params }: { params: { slug: string } }) {
  return (
    <>
      <VideoPageComponent />
      <p>My Post: {params.slug}</p>
    </>
  );
}
