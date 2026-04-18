import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "qawave.ai // luxury-studio",
  description:
    "Variant D — LUXURY STUDIO. Pentagram / IDEO high-end consulting agency aesthetic for qawave.ai.",
  robots: { index: false, follow: false },
};

export default function DesignDLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        The root layout mounts a dark Navbar + Footer. Variant D is a full-page
        luxury takeover with its own chrome and warm background — hide the
        global elements for this route only. Keeps the canonical site intact.
      */}
      <style>{`
        body > header, body > footer { display: none !important; }
        body > main { padding: 0; margin: 0; }
        body:has(.luxury-studio) {
          background: #F5F2ED;
          color: #1A1A1A;
          color-scheme: light;
        }
      `}</style>
      {children}
    </>
  );
}
