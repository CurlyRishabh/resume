import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Toaster from "./components/Toaster";
import XRay from "./components/XRay";
import VitalsReporter from "./components/VitalsReporter";
import { resume } from "./data/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${resume.name.full} - Software Engineer`;
const description = `${resume.summary} ${resume.tagline}`;

export const metadata = {
  title,
  description,
  keywords: "Software Engineer, LLM agents, browser automation, Playwright, Kubernetes, TypeScript, Python, Distributed Systems, Rishabh Singh Bisht",
  authors: [{ name: resume.name.full, url: resume.contact.github }],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1014" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name.full,
  jobTitle: resume.headline,
  email: `mailto:${resume.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: resume.contact.city, addressCountry: resume.contact.country },
  sameAs: [resume.contact.github, resume.contact.linkedin],
  alumniOf: resume.education.map((edu) => ({ "@type": "CollegeOrUniversity", name: edu.institution })),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="mx-auto max-w-[46rem] px-5 pb-24">
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster />
        <XRay />
        <VitalsReporter />
      </body>
    </html>
  );
}
