import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Schedule a 30-minute discovery call with our QA automation team. We'll assess your current coverage, identify quick wins, and outline a roadmap.",
};

export default function ContactPage() {
  return <ContactForm />;
}
