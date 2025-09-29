"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { BarChart, PieChart, CalendarClock, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  mobile?: boolean;
}

const navItems = [
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

export default function AdminSidebar({ mobile }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    // Mobile version: simple nav
    return (
      <>
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 hover:bg-muted dark:hover:bg-muted transition-colors"
            )}
          >
            {icon}
            <span className="text-sm font-medium text-foreground dark:text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </>
    );
  }

  // Desktop version: sidebar
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-start gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-8">
          {navItems.map((item, idx) => (
            <SidebarLink key={idx} link={item} />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}