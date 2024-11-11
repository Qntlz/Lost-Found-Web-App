"use client";

import { usePathname } from "next/navigation"; // Import the hook
import Header from "../ui/header/navbar";
import SideNavXL from "../ui/home/SidenavSimple";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/login", "/signup", "/test", "/"];
  const hideSideNavRoutes = ["/post/make"]

  return (
    <div>
      <link rel="icon" href="/logo.svg" />
      {/* Conditionally render Header only on routes not listed in hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(pathname) && <Header />}
      <div className="xl:flex flex-col">
        {!hideHeaderRoutes.includes(pathname) && !hideSideNavRoutes.includes(pathname) && < SideNavXL />}
      </div>
      <div className="">

        {children}
      </div>
    </div>
  );
}
