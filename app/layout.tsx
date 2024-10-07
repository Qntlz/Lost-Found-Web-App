import type { Metadata } from "next";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "Lost & Found App",
  description: "test",
  icons: {
    icon: '/logo.png',
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
