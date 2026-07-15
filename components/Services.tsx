"use client";

import {
  Flower2,
  Calendar,
  Palette,
  Users,
  Music4,
  Camera,
} from "lucide-react";
import Reveal from "./Reveal";
import VineDivider from "./VineDivider";

const services = [
  {
    icon: Calendar,
    title: "Full Planning",
    desc: "From save-the-dates to the send-off, we hold the entire timeline so you can hold each other.",
  },
  {
    icon: Palette,
    title: "Design & Styling",
    desc: "Palette, florals, tablescapes, and lighting curated into one cohesive, unmistakably-yours look.",
  },
  {
    icon: Users,
    title: "Day-of Coordination",
    desc: "Already planned it yourselves? We step in the final month and run the day flawlessly.",
  },
  {
    icon: Flower2,
    title: "Florals & Decor",
    desc: "In-house floral design, from bridal bouquets to ceremony arches and reception centerpieces.",
  },
  {
    icon: Music4,
    title: "Vendor Curation",
    desc: "Caterers, musicians, photographers — hand-picked from our trusted circle of collaborators.",
  },
  {
    icon: Camera,
    title: "Rehearsal & Logistics",
    desc: "Guest flow, seating logic, and a rehearsal that leaves nothing to chance on the big day.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-parchment py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">What We Offer</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Services, tailored to you
          </h2>
          <p className="mt-5 font-body text-charcoal/65">
            Book us for one piece of the puzzle or the entire picture &mdash;
            every service is shaped around how you actually want to plan.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.12}>
                <div className="card-lift group h-full rounded-3xl border border-line/70 bg-ivory p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/5 text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-ivory">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/65">
                    {service.desc}
                  </p>
                  <div className="mt-6 h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-20" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <div className="mt-20">
        <VineDivider />
      </div>
    </section>
  );
}
