"use client";

import { usePathname } from "next/navigation"; // Import the hook
import Header from "../ui/header/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/login", "/signup","/test","/"];
  
  return (
    <div>
      {/* Conditionally render Header only on routes not listed in hideHeaderRoutes */}
      <link rel="icon" href="/logo.svg" />
      {!hideHeaderRoutes.includes(pathname) && <Header />}
      {children}
    </div>
  );
}
