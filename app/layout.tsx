import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bettercallmo.dev"),
  title: "Better Call Mo | Web Development & Business Growth",
  description:
    "Better Call Mo helps small and medium businesses build professional websites that attract customers, build trust, and grow sales. Let's take your business online with modern, fast, and SEO-friendly web design.",
  keywords: [
    "Web developer",
    "hire web developer",
    "wordpress developer",
    "frontend developer",
    "backend developer",
    "professional web developer",
    "i need web developer",
    "how to find web developer",
    "web development",
    "business website",
    "SEO",
    "Better Call Mo",
    "small business growth",
    "professional website design",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Better Call Mo | Web Development & Business Growth",
    description:
      "We build websites that help your business grow. Professional design, SEO, and user-friendly experiences for small and medium businesses.",
  },
  authors: [{ name: "Better Call Mo" }],
  openGraph: {
    title: "Better Call Mo | Web Development & Business Growth",
    description:
      "We build websites that help your business grow. Professional design, SEO, and user-friendly experiences for small and medium businesses.",
    url: "https://bettercallmo.dev",
    siteName: "Better Call Mo",
    images: [
      {
        url: "https://bettercallmo.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Better Call Mo Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
