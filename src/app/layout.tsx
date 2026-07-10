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
  title: "Infinity Tap | Premium NFC Business Cards & Smart Networking",
  description: "Ditch paper business cards. Share your professional profile instantly with a single tap. Premium wood, custom titanium metal, and sleek matte black smart cards.",
  keywords: ["NFC business card", "smart business card", "digital business card", "titanium business card", "eco-friendly business card", "networking", "Infinity Tap"],
  authors: [{ name: "Infinity Tap Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-white overflow-x-hidden selection:bg-brand-violet/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
