// app/admin/layout.tsx
"use client";

import React from "react";
import DashboardLayout from "./layout/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
