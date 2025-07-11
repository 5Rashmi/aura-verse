"use client";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { spaceMono } from "@/styles/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const hideNavbar =
    pathName.startsWith("/sign-up") || pathName.startsWith("/sign-in");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // or check auth/data
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} antialiased bg-[url('/bg/dark-sky.webp')] bg-cover bg-center`}
      >
        {loading ? (
          <div className="min-h-screen w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {!hideNavbar && <NavBar />}
            {children}
          </>
        )}
        ;
      </body>
    </html>
  );
}
