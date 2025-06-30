import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface ProfileData {
  id: number;
  clerkId: string;
  email: string;
  fullName: string;
  username: string;
  isAdmin: boolean;
  hasProfile: boolean;
  profile: {
    gender: string | null;
    birthdate: string | null;
    occupation: string | null;
    location: string | null;
  };
}

export const useProfileSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncProfile = useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile-sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          fullName: user.fullName || "",
          username: user.username || "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setProfileData(result.user);
        console.log("✅ Profile synced successfully:", result.user);
      } else {
        setError(result.message || "Failed to sync profile");
        console.error("❌ Profile sync failed:", result.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      setError(errorMessage);
      console.error("❌ Profile sync error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    syncProfile();
  }, [syncProfile]);

  return {
    profileData,
    isLoading,
    error,
    isSynced: !!profileData,
    hasProfile: profileData?.hasProfile || false,
    refresh: syncProfile,
  };
}; 