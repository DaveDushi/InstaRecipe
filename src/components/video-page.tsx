"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, Send, ExternalLink } from "lucide-react";

export function VideoPageComponent({ id = "1" }) {
  // Mock data for demonstration
  const video = {
    id,
    username: "user123",
    title: "Amazing Video",
    url: "https://example.com/video.mp4",
    caption:
      "This is an amazing video showcasing something really cool! #awesome #video",
    postLink: "https://example.com/post/1",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-black aspect-[9/16] relative">
            <video
              controls
              className="absolute inset-0 w-full h-full object-contain"
              poster="/placeholder.svg?height=640&width=360"
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Back to Gallery</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" aria-label="Share">
                  <Send className="h-6 w-6" />
                </Button>
                <Link
                  href={video.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open post link"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <p className="font-bold mb-2">{video.username}</p>
              <p>{video.caption}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
