// src/components/Header.tsx
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ClipboardPlus, Vote, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileVerificationDialog from "@/components/verification/ProfileVerificationDialog";
import { Switch } from "@/components/ui/switch";

export default function Header() {
  const { user } = useUser();
  const [profileComplete, setProfileComplete] = useState(false);

  // dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/profile?clerkId=${user.id}`)
      .then((r) => r.json())
      .then((json) => {
        const complete =
          json.success &&
          json.data?.gender &&
          json.data?.birthdate &&
          json.data?.occupation &&
          json.data?.location;
        setProfileComplete(!!complete);
      })
      .catch(() => setProfileComplete(false));
  }, [user?.id]);

  const buttonClass = profileComplete
    ? "bg-green-500 hover:bg-green-600 text-white"
    : "bg-yellow-500 hover:bg-yellow-600 text-white";

  const buttonText = profileComplete ? "Εγγεγραμμένος" : "Εγγραφή στοιχείων";

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-black shadow-sm px-4 py-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Vote className="w-6 h-6 text-black dark:text-white" />
            <span className="text-xl font-bold text-black dark:text-white">
              Ηλεκτρονικές Ψηφοφορίες
            </span>
          </Link>
        </div>

        {/* Search (only on sm+) */}
        {user && (
          <form
            action="/search"
            className="hidden sm:block sm:w-full max-w-lg mx-auto"
          >
            <input
              type="text"
              name="query"
              placeholder="Αναζήτηση Ψηφοφορίας"
              className="w-full border rounded px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2 sm:gap-0">
          {/* Dark mode toggle */}
          <div className="flex items-center space-x-1 px-2">
            <Sun
              className={`h-5 w-5 transition-opacity ${
                isDarkMode ? "opacity-50" : "opacity-100"
              }`}
            />
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
            <Moon
              className={`h-5 w-5 transition-opacity ${
                isDarkMode ? "opacity-100" : "opacity-50"
              }`}
            />
          </div>

          {/* Admin link — εμφανίζεται σε όλους τους συνδεδεμένους χρήστες */}
          {user && (
            <Link
              href="/admin"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <ClipboardPlus className="w-5 h-5" />
              <span>Διαχείριση Ψηφοφοριών</span>
            </Link>
          )}

          {/* Profile verification */}
          {user && (
            <ProfileVerificationDialog
              onSuccess={() => setProfileComplete(true)}
              trigger={
                <Button className={`${buttonClass} text-sm py-2 px-4 rounded`}>
                  {buttonText}
                </Button>
              }
            />
          )}

          {/* User buttons */}
          {user ? (
            <div className="ml-0 sm:ml-4">
              <UserButton />
            </div>
          ) : (
            <div className="flex space-x-2">
              <SignInButton mode="modal">
                <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Σύνδεση
                </span>
              </SignInButton>
              <SignUpButton mode="modal">
                <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Εγγραφή
                </span>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
