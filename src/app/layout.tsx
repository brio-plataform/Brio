import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Brio Platform",
  description: "Estrutura Ampliada do Brio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
        <div className="flex w-full h-full min-h-screen relative">
          <div className="sticky top-0 h-screen">
            <LeftSidebar />
          </div>
          {children}
        </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
