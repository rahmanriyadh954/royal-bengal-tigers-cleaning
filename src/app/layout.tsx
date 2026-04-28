import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Suspense } from "react";
import ClientWrapper from "./ClientWrapper"; // এটা নিচে বানিয়ে দিচ্ছি

// ১. তোর সেই কষ্টের SEO এবং মেটাডাটা
export const metadata: Metadata = {
  title: {
    default: "Royal Bengal Tigers Cleaning | Tasmania's Best",
    template: "%s | Royal Bengal Tigers"
  },
  description: "Tasmania's most trusted professional cleaning service. From residential to commercial deep cleaning, we pounce on every mess with tiger-like precision.",
  keywords: ["Cleaning Tasmania", "Hobart Cleaners", "Professional House Cleaning", "Office Cleaning Tasmania", "End of Lease Clean"],
  authors: [{ name: "Royal Bengal Tigers Team" }],
  creator: "Royal Bengal Tigers",
  publisher: "Royal Bengal Tigers Cleaning Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Royal Bengal Tigers Cleaning Pro",
    description: "Premium cleaning services in Hobart and across Tasmania.",
    url: "https://tascleaningpro.au",
    siteName: "Tasmania Cleaning Pro",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFD700",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <Suspense>
          <ClientWrapper>
            <div id="root-container" className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}