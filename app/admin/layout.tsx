// app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  BarChart,
  PieChart,
  CalendarClock,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems: NavItem[] = [
    {
      href: "/admin",
      label: "Επισκόπηση",
      icon: <BarChart className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      href: "/admin/create-poll",
      label: "Ψηφοφορίες",
      icon: <PieChart className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      href: "/admin/my-polls",
      label: "Οι Ψηφοφορίες Μου",
      icon: <UserCheck className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      href: "/admin/schedule",
      label: "Χρονοδιάγραμμα",
      icon: <CalendarClock className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-start gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-8">
              {navItems.map((item, idx) => (
                <SidebarLink key={idx} link={item} />
              ))}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Mobile Nav Panel */}
      <nav className="flex flex-col md:hidden bg-neutral-100 dark:bg-neutral-800 border-b border-border overflow-y-auto">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 hover:bg-muted dark:hover:bg-muted transition-colors",
            )}
          >
            {icon}
            <span className="text-sm font-medium text-foreground dark:text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-background text-foreground overflow-y-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
