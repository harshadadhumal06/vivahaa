"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import VineDivider from "./VineDivider";

const stats = [
  { value: "312", label: "Weddings Designed" },
  { value: "11", label: "Years of Practice" },
  { value: "48", label: "Partner Venues" },
  { value: "100%", label: "Present on the Day" },
];

const team = [
  {
    id: "team-priya-menon",
    name: "Priya Menon",
    role: "Founder & Lead Planner",
    bio: "Sets the vision for every wedding and leads the couple relationship start to finish.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "team-arjun-rao",
    name: "Arjun Rao",
    role: "Creative & Décor Director",
    bio: "Translates each couple's story into palette, florals, and every styled detail.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "team-fatima-shaikh",
    name: "Fatima Shaikh",
    role: "Logistics & Vendor Relations",
    bio: "Runs venue bookings, vendor contracts, and the master timeline behind the scenes.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "team-devika-nair",
    name: "Devika Nair",
    role: "Client Experience Lead",
    bio: "Your first call and last text — keeps every couple calm from booking to send-off.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ivory py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop"
              alt="Planner arranging florals before a ceremony"
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden aspect-[4/5] w-40 overflow-hidden rounded-2xl border-4 border-ivory shadow-card sm:block md:w-52">
            <Image
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop"
              alt="Couple sharing a quiet moment"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">About the Studio</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest md:text-5xl">
              We plan weddings like we&rsquo;re invited to them.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="my-6 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
            <p className="max-w-lg font-body leading-relaxed text-charcoal/70">
              Evermore &amp; Co. began with a single promise: no two weddings
              should ever feel templated. Our small team of planners,
              stylists, and coordinators works with a handful of couples each
              season, so every detail &mdash; the flowers, the pacing, the
              speeches, the quiet in-between moments &mdash; gets our full
              attention.
            </p>
            <p className="mt-4 max-w-lg font-body leading-relaxed text-charcoal/70">
              We show up early, stay late, and disappear into the background
              exactly when you need us to.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <p className="font-display text-3xl text-gold-dark transition-transform duration-300 group-hover:-translate-y-1 md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-xs uppercase tracking-wider text-charcoal/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">The People Behind It</p>
          <h3 className="mt-4 font-display text-3xl text-forest md:text-4xl">
            Meet the team
          </h3>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={(i % 4) * 0.1}>
              <div
                id={member.id}
                className="group scroll-mt-28 text-center"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-full shadow-card">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                </div>
                <h4 className="mt-5 font-display text-xl text-forest">
                  {member.name}
                </h4>
                <p className="mt-1 font-body text-xs uppercase tracking-wide text-gold-dark">
                  {member.role}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">
                  {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <VineDivider />
    </section>
  );
}
