"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const fields = [
  { id: "name", label: "Your Names", type: "text", placeholder: "Alex & Jordan" },
  { id: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { id: "date", label: "Wedding Date", type: "date", placeholder: "" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-forest py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow text-gold-light">Let&rsquo;s Talk</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
            Tell us about your day
          </h2>
          <p className="mt-5 max-w-md font-body leading-relaxed text-ivory/60">
            Share a few details and we&rsquo;ll follow up within two business
            days to schedule your complimentary discovery call.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4 text-ivory/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light">
                <Mail size={18} />
              </span>
              <span className="font-body text-sm">hello@evermoreandco.com</span>
            </div>
            <div className="flex items-center gap-4 text-ivory/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light">
                <Phone size={18} />
              </span>
              <span className="font-body text-sm">+1 (212) 555-0148</span>
            </div>
            <div className="flex items-center gap-4 text-ivory/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light">
                <MapPin size={18} />
              </span>
              <span className="font-body text-sm">
                214 Willow Street, Brooklyn, NY
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-[2rem] bg-ivory p-7 shadow-soft md:p-10">
            {submitted ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="text-gold" size={44} />
                <h3 className="mt-5 font-display text-2xl text-forest">
                  Message sent
                </h3>
                <p className="mt-2 max-w-xs font-body text-sm text-charcoal/60">
                  Thank you for reaching out. We&rsquo;ll be in touch within
                  two business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline mt-7"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={field.id === "name" ? "sm:col-span-2" : ""}
                    >
                      <label
                        htmlFor={field.id}
                        className="mb-2 block font-body text-xs uppercase tracking-wider text-charcoal/55"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-line bg-transparent px-4 py-3 font-body text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="venue"
                    className="mb-2 block font-body text-xs uppercase tracking-wider text-charcoal/55"
                  >
                    Estimated Guest Count
                  </label>
                  <select
                    id="venue"
                    required
                    className="w-full rounded-xl border border-line bg-transparent px-4 py-3 font-body text-sm text-charcoal outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option>Under 50</option>
                    <option>50&ndash;100</option>
                    <option>100&ndash;200</option>
                    <option>200+</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-body text-xs uppercase tracking-wider text-charcoal/55"
                  >
                    Tell us your vision
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Style, must-haves, dream venue&hellip;"
                    className="w-full resize-none rounded-xl border border-line bg-transparent px-4 py-3 font-body text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Enquiry <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
