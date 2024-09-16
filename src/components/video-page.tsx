"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, Send, ExternalLink } from "lucide-react";

// Define the shape of the video data
interface Video {
  id: string;
  username: string;
  post_id: number;
  shortcode: string;
  caption: string;
  post_url: string;
  post_owner: string;
}

interface VideoPageProps {
  id: string;
}

export function VideoPageComponent({ id }: VideoPageProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/posts/post/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch video with id ${id}`);
        }
        const data = await response.json();
        const dataObject = JSON.parse(data);
        setVideo(dataObject);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load video.");
        setLoading(false);
      }
    };
    if (id) {
      fetchVideo();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return <p>No video found.</p>;
  }

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
              <source src={video.post_url} type="video/mp4" />
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
                  href={`instagram.com/${video.shortcode}`}
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
              <p>
                <pre>{video.caption}</pre>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
