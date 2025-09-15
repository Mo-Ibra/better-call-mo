import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Call Mo | Web Development & Business Growth",
  description:
    "Better Call Mo helps small and medium businesses build professional websites that attract customers, build trust, and grow sales. Let's take your business online with modern, fast, and SEO-friendly web design.",
  keywords: [
    "web development",
    "business website",
    "SEO",
    "Better Call Mo",
    "small business growth",
    "professional website design",
  ],
  authors: [{ name: "Better Call Mo" }],
  openGraph: {
    title: "Better Call Mo | Web Development & Business Growth",
    description:
      "We build websites that help your business grow. Professional design, SEO, and user-friendly experiences for small and medium businesses.",
    // url: "https://yourdomain.com",
    siteName: "Better Call Mo",
    // images: [
    //   {
    //     url: "https://yourdomain.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Better Call Mo Website Preview",
    //   },
    // ],
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
      </body>
    </html>
  );
}
