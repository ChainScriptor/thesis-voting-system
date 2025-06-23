// src/components/Header.tsx
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Form from "next/form";
import { ClipboardPlus, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileVerificationDialog from "@/components/verification/ProfileVerificationDialog";

export default function Header() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "voting_admin";

  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const checkProfile = async () => {
      try {
        const res = await fetch(`/api/profile?clerkId=${user.id}`);
        const json = await res.json();

        if (
          json.success &&
          json.data &&
          json.data.gender &&
          json.data.birthdate &&
          json.data.occupation &&
          json.data.location
        ) {
          setProfileComplete(true);
        } else {
          setProfileComplete(false);
        }
      } catch (error) {
        console.error("Error fetching profile status:", error);
        setProfileComplete(false);
      }
    };

    checkProfile();
  }, [user?.id]);

  const buttonClass = profileComplete
    ? "bg-green-500 hover:bg-green-600 text-white"
    : "bg-yellow-500 hover:bg-yellow-600 text-white";

  const buttonText = profileComplete ? "Εγγεγραμμένος" : "Εγγραφή στοιχείων";

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 w-full">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center space-x-2">
          <Vote className="w-6 h-6 text-black dark:text-white" />
          <span className="text-xl font-bold text-black dark:text-white">
            Ηλεκτρονικές Ψηφοφορίες
          </span>
        </Link>

        {user && (
          <Form action="/search" className="hidden sm:block w-full max-w-lg mx-4">
            <input
              type="text"
              name="query"
              placeholder="Αναζήτηση Ψηφοφορίας"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border w-full"
            />
          </Form>
        )}

        <div className="flex items-center space-x-2">
          {user && isAdmin && (
            <Link
              href="/admin"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <ClipboardPlus className="w-5 h-5" />
              <span>Διαχείριση Ψηφοφοριών</span>
            </Link>
          )}

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

          {user ? (
            <div className="ml-4">
              <UserButton />
            </div>
          ) : (
            <div className="flex space-x-2">
              <SignInButton mode="modal">
                <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Σύνδεση
                </span>
              </SignInButton>

              <SignUpButton mode="modal">
                <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
