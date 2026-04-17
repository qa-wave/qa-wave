import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://qawave.ai";

export const metadata: Metadata = {
  title: {
    default: "qawave.ai — The Edge of QA Automation",
    template: "%s | qawave.ai",
  },
  description:
    "We help engineering teams implement agentic AI testing — from strategy through production. Autonomous coverage, intelligent maintenance, and full governance.",
  keywords: [
    "agentic testing",
    "autonomous QA",
    "AI test automation",
    "QA consulting",
    "test automation services",
    "qawave",
    "AI QA",
    "software testing",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "qawave.ai",
    title: "qawave.ai — The Edge of QA Automation",
    description:
      "QA automation consulting & implementation. We deploy agentic AI testing that autonomously discovers gaps, adapts to changes, and maintains full audit trails.",
  },
  twitter: {
    card: "summary_large_image",
    title: "qawave.ai — The Edge of QA Automation",
    description:
      "QA automation consulting & implementation. Agentic AI testing from strategy through production.",
  },
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
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "qawave.ai",
  description:
    "QA automation consulting and implementation. We help engineering teams deploy agentic AI testing — from strategy through production.",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  sameAs: ["https://github.com/qa-wave"],
  serviceType: "QA Automation Consulting",
  areaServed: "Worldwide",
  knowsAbout: [
    "Agentic AI Testing",
    "Test Automation",
    "QA Engineering",
    "Autonomous Testing",
    "Software Quality Assurance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
