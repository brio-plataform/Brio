import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Brio - Plataforma de Conhecimento Colaborativo",
    template: "%s | Brio"
  },
  description: "Brio é uma plataforma aberta onde o conhecimento é central, acessível e democrático, promovendo o aprendizado colaborativo e debates construtivos.",
  keywords: [
    "conhecimento",
    "educação",
    "colaboração",
    "pesquisa",
    "ciência",
    "aprendizado",
    "debate",
    "academia"
  ],
  authors: [
    {
      name: "Maicon Barbosa",
      url: "https://github.com/ompo-dev"
    }
  ],
  creator: "Maicon Barbosa",
  publisher: "Brio Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brio-platform.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://brio-platform.vercel.app',
    title: 'Brio - Plataforma de Conhecimento Colaborativo',
    description: 'Uma plataforma aberta onde o conhecimento é central, acessível e democrático.',
    siteName: 'Brio Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brio Platform Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brio - Plataforma de Conhecimento Colaborativo',
    description: 'Uma plataforma aberta onde o conhecimento é central, acessível e democrático.',
    creator: '@maiconbarbosa',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-dark.png', media: '(prefers-color-scheme: dark)' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification=your_code',
    yandex: 'yandex-verification=your_code',
  },
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
