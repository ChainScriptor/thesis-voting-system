"use client";

import { Menu, X } from "lucide-react";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { BarChart, PieChart, Users, CalendarClock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Επισκόπηση",
      href: "/admin",
      icon: <BarChart className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Ψηφοφορίες",
      href: "/admin/polls",
      icon: <PieChart className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Υποψήφιοι",
      href: "/admin/candidates",
      icon: <Users className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Χρονοδιάγραμμα",
      href: "/admin/schedule",
      icon: <CalendarClock className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-50 text-neutral-700 dark:text-neutral-200"
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-start gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-8">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 bg-background text-foreground overflow-y-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
