import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Analytics from "./analytics"; 
import "./globals.css";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import AutumnLeavesConditional from "./components/AutumnLeavesConditional";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Autumn Farris | Full Stack Developer",
  description:
    "Professional portfolio of Autumn Farris, a passionate full-stack developer specializing in modern web technologies and user-centered design.",
  keywords:
    "Autumn Farris, Full Stack Developer, React, Next.js, TypeScript, Web Development, Software Engineer",
  authors: [{ name: "Autumn Farris" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Autumn Farris | Full Stack Developer",
    description:
      "Professional portfolio showcasing modern web development projects and expertise in React, TypeScript, and full-stack technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autumn Farris | Full Stack Developer",
    description:
      "Professional portfolio showcasing modern web development projects and expertise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        <Analytics />
        <AutumnLeavesConditional />
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
