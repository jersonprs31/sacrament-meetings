import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meetings",
  },
  description: "Plan and manage ward sacrament meetings.",
  metadataBase: new URL('https://sacrament-meetings-jerson.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <SessionProvider>
          <Header />
          <main className="flex-grow max-w-5xl w-full mx-auto p-4 sm:p-6">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}