"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LogOut, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const mockVideos = [
  {
    id: 1,
    title: "Fun video 1",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Exciting video 2",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Interesting video 3",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    title: "Amazing video 4",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    title: "Cool video 5",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    title: "Awesome video 6",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
];

export function GalleryPageComponent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  const handleSearch = () => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRefresh = () => {
    // In a real application, you would fetch new data here
    // For this example, we'll just randomize the order of the videos
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
    setFilteredVideos(shuffled);
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
          {filteredVideos.map((video) => (
            <Link href={`/post/${video.id}`} key={video.id} className="block">
              <div className="aspect-square relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-200 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <p className="text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center p-2">
                    {video.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
