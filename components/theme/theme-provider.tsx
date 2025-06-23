// components/theme/theme-provider.tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [, setIsDark] = useState(false);

  useEffect(() => {
    // Φόρτωσε από localStorage αν υπάρχει αποθηκευμένο θέμα
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
}
