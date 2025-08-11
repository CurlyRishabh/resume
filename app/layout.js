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
  title: "Rishabh Singh Bisht - Full Stack Developer",
  description: "Solutions-oriented Full Stack Developer with 1+ years of experience in JavaScript, Python, React.js, and AI integration. Specialized in workflow automation and cloud infrastructure optimization.",
  keywords: "Full Stack Developer, React.js, Node.js, Python, AI/ML, JavaScript, Portfolio, Rishabh Singh Bisht",
  author: "Rishabh Singh Bisht",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Rishabh Singh Bisht - Full Stack Developer",
    description: "Solutions-oriented Full Stack Developer specializing in AI integration and workflow automation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Singh Bisht - Full Stack Developer",
    description: "Solutions-oriented Full Stack Developer specializing in AI integration and workflow automation",
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
