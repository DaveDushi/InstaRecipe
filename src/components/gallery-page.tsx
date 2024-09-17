"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LogOut, RefreshCw, Video } from "lucide-react";
import { useRouter } from "next/navigation";

interface Video {
  _id: { $oid: string };
  username: string;
  post_id: number;
  shortcode: string;
  caption: string;
  post_url: string;
  post_img: string;
  post_owner: string;
}

const truncateCaption = (caption: string, wordLimit: number = 15): string => {
  const words = caption.split(" ");
  if (words.length <= wordLimit) return caption;
  return words.slice(0, wordLimit).join(" ") + "..."; // Add ellipsis if truncated
};

export function GalleryPageComponent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    try {
      // Perform the search request
      const response = await fetch(
        `api/search/hi?query=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          credentials: "include", // This ensures cookies are sent with the request
        }
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const data = await response.json();

      // Update the state with the search results
      setFilteredVideos(data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetch("/api/posts/saved_posts")
      .then((res) => res.json()) // Parsing the JSON from the response
      .then((data) => {
        const dataObject = JSON.parse(data);
        setVideos(dataObject);
        setFilteredVideos(dataObject);
        console.log(dataObject);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching saved posts:", error); // Handle errors
      });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRefresh = () => {
    fetch("/api/posts/update_posts", { method: "PUT" })
      .then((res) => {
        setLoading(true);
        if (!res.ok) {
          throw new Error("Failed to update posts");
        }
        return res.json(); // Parse the JSON from the response
      })
      .then(() => {
        // After updating posts, fetch the saved posts
        return fetch("/api/posts/saved_posts");
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch saved posts");
        }
        return res.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const dataObject = JSON.parse(data);
        setVideos(dataObject);
        setFilteredVideos(dataObject);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching saved posts:", error); // Handle errors
        setLoading(false);
      });
  };

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" }).then((res) => {
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto flex">
            <Input
              type="search"
              placeholder="Search videos..."
              className="pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="secondary" className="ml-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial"
              onClick={handleRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex-1 sm:flex-initial"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : Array.isArray(filteredVideos) && filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <Link
                href={`/post/${video.shortcode}`}
                key={video.post_id}
                className="block"
              >
                <div className="aspect-square relative group">
                  <img
                    src={`api/posts/proxy?url=${encodeURIComponent(
                      video.post_img
                    )}`}
                    alt={video.post_owner}
                    className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-200 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <p className="text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center p-2">
                      {truncateCaption(video.caption)}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts available. Please refresh.</p>
          )}
        </div>
      </div>
    </div>
  );
}
