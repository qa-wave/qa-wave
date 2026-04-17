"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Building2, User } from "lucide-react";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";

/* ------------------------------------------------------------------ */
/*  Form state                                                         */
/* ------------------------------------------------------------------ */

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  currentStack: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  teamSize: "",
  currentStack: "",
  message: "",
};

/* ------------------------------------------------------------------ */
/*  Field component                                                    */
/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  icon?: typeof User;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-accent-light">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground",
            "placeholder:text-neutral-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
            "transition-colors duration-200",
            Icon && "pl-10",
          )}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Form Section                                               */
/* ------------------------------------------------------------------ */

export function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // Simulate submission — replace with real API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper className="pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* ---- Left: info ---- */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Book a Discovery Call
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-400">
              30 minutes. No sales pitch. We&apos;ll discuss your current QA
              setup, identify coverage gaps, and outline what agentic AI testing
              could look like for your team.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  What to expect
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    Quick assessment of your current test automation maturity
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    Identification of quick wins and coverage blind spots
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    Honest evaluation of whether qawave is the right fit
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground">
                  Prefer email?
                </h3>
                <a
                  href="mailto:hello@qawave.ai"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-accent-light hover:text-accent-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  hello@qawave.ai
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---- Right: form ---- */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.15 },
              },
            }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-raised p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted">
                  <CheckCircle className="h-8 w-8 text-accent-light" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">
                  Message sent
                </h2>
                <p className="mt-3 max-w-sm text-base text-neutral-400">
                  We&apos;ll get back to you within one business day to schedule
                  your discovery call.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    required
                    placeholder="Jan Novak"
                    value={form.name}
                    onChange={update("name")}
                    icon={User}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    required
                    placeholder="jan@company.com"
                    value={form.email}
                    onChange={update("email")}
                    icon={Mail}
                  />
                  <Field
                    label="Company"
                    name="company"
                    required
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={update("company")}
                    icon={Building2}
                  />
                  <Field
                    label="Role"
                    name="role"
                    placeholder="QA Lead, CTO, VP Engineering..."
                    value={form.role}
                    onChange={update("role")}
                  />
                  <div>
                    <label
                      htmlFor="teamSize"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      QA team size
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={form.teamSize}
                      onChange={(e) => update("teamSize")(e.target.value)}
                      className={cn(
                        "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground",
                        "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
                        "transition-colors duration-200",
                        !form.teamSize && "text-neutral-600",
                      )}
                    >
                      <option value="">Select...</option>
                      <option value="1-3">1-3 people</option>
                      <option value="4-8">4-8 people</option>
                      <option value="9-20">9-20 people</option>
                      <option value="20+">20+ people</option>
                    </select>
                  </div>
                  <Field
                    label="Current test stack"
                    name="currentStack"
                    placeholder="Cypress, Playwright, Selenium..."
                    value={form.currentStack}
                    onChange={update("currentStack")}
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    What&apos;s your biggest QA challenge right now?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your current testing situation, coverage goals, or specific pain points..."
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    className={cn(
                      "w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground",
                      "placeholder:text-neutral-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
                      "transition-colors duration-200",
                    )}
                  />
                </div>

                {status === "error" && (
                  <p className="mt-3 text-sm text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3",
                    "bg-accent text-sm font-semibold text-white",
                    "hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface",
                    "transition-colors duration-200",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Request a Discovery Call
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-neutral-600">
                  No spam. No sales calls. Just a technical conversation about
                  your QA challenges.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
