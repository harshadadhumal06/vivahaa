"use client";

import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SaveButton from "./SaveButton";
import { packages } from "@/data/packages";

export default function Packages() {
  return (
    <section id="packages" className="relative bg-forest py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-gold-light">Investment</p>
          <h2 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
            Packages built around your day
          </h2>
          <p className="mt-5 font-body text-ivory/60">
            Every package can flex &mdash; think of these as starting points,
            not boxes.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.12}>
              <div
                className={`group relative flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-3 ${
                  pkg.featured
                    ? "bg-gradient-to-b from-gold-light to-gold shadow-soft lg:scale-105"
                    : "border border-ivory/15 bg-forest-light/60 hover:border-gold/50"
                }`}
              >
                <SaveButton
                  type="package"
                  id={pkg.id}
                  variant="dark"
                  className="absolute right-6 top-6"
                />
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1 font-body text-[11px] uppercase tracking-widest text-ivory">
                    Most Loved
                  </span>
                )}
                <h3
                  className={`font-display text-3xl ${
                    pkg.featured ? "text-forest" : "text-ivory"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mt-1 font-body text-sm ${
                    pkg.featured ? "text-forest/70" : "text-ivory/55"
                  }`}
                >
                  {pkg.tagline}
                </p>

                <p
                  className={`mt-6 font-display text-4xl ${
                    pkg.featured ? "text-forest" : "text-gold-light"
                  }`}
                >
                  {pkg.price}
                  <span className="font-body text-sm font-normal opacity-60">
                    {" "}
                    starting
                  </span>
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 font-body text-sm ${
                        pkg.featured ? "text-forest/80" : "text-ivory/75"
                      }`}
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          pkg.featured ? "text-forest" : "text-gold-light"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-body text-sm tracking-wide transition-all duration-500 ${
                    pkg.featured
                      ? "bg-forest text-ivory hover:bg-forest-dark"
                      : "border border-ivory/30 text-ivory hover:border-gold hover:bg-gold hover:text-forest"
                  }`}
                >
                  Enquire Now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
