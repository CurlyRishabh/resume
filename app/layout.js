import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rishabh Singh Bisht - Software Engineer, AI Automation and Distributed Systems",
  description: "Software Engineer with 2.5+ years of experience building production LLM agent platforms and highly-available backend systems with TypeScript, Node.js, Playwright, Redis and Kubernetes.",
  keywords: "Software Engineer, LLM agents, AI automation, distributed systems, TypeScript, Node.js, Playwright, Kubernetes, Rishabh Singh Bisht",
  author: "Rishabh Singh Bisht",
  openGraph: {
    title: "Rishabh Singh Bisht - Software Engineer",
    description: "Building production LLM agent platforms and the distributed systems behind them",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Singh Bisht - Software Engineer",
    description: "Building production LLM agent platforms and the distributed systems behind them",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
