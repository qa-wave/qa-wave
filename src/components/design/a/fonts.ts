// ============================================================
// Variant A "Editorial" — Local font loaders
// Instrument Serif for display, JetBrains Mono for metadata.
// Scoped to this variant only; not added to root layout.
// ============================================================
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-editorial-serif",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-editorial-mono",
  display: "swap",
});
