import { GalleryPageComponent } from "@/components/gallery-page";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getAuthStatus() {
  const cookieStore = cookies();

  try {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL is not defined");
    }

    const response = await fetch(`${baseUrl}/auth/status`, {
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch auth status");
    }

    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
}

export default async function Home() {
  const isAuthenticated = await getAuthStatus();
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <GalleryPageComponent />;
}
