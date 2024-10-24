"use client";

import { usePathname } from "next/navigation"; // Import the hook
import Header from "../ui/home/header/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/login", "/signup","/"];
  const title = document.title.includes ("");

  console.log(title);
  
  return (
    <html lang="en">
      <body>
        {/* Conditionally render Header only on routes not listed in hideHeaderRoutes */}
        {!hideHeaderRoutes.includes(pathname) && <Header />}
        {children}
      </body>
    </html>
  );
}