import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "qawave.ai // swiss-mono",
  description:
    "Variant B — SWISS MONO. Linear / Stripe precision engineering aesthetic for qawave.ai.",
  robots: { index: false, follow: false },
};

export default function DesignBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        The root layout renders a global Navbar + Footer. This variant is a
        full-page takeover with its own fixed left sidebar, so we hide those
        chrome elements for this route via a scoped style tag. Keeps the root
        layout untouched and intact for the canonical site.
      */}
      <style>{`
        body > header, body > footer { display: none !important; }
        body > main { padding: 0; margin: 0; }
      `}</style>
      {children}
    </>
  );
}
