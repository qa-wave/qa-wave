// ============================================================
// Variant D "Luxury Studio" — Fraunces editorial serif
// Used for display headlines and statement moments.
// Scoped to this variant only; not added to root layout.
// ============================================================
import { Fraunces } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
