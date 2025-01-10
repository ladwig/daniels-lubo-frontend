import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the current path is a mobile route
  const isMobileRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/mobile');

  return (
    <html lang="en">
      <body className={inter.className}>
        {isMobileRoute ? (
          // Mobile routes don't need the sidebar
          children
        ) : (
          // Web routes get the sidebar and main content layout
          <>
            <Sidebar />
            <main className="ml-64 p-8 bg-gray-50 min-h-screen">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  );
}
