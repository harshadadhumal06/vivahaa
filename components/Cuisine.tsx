"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, BadgeCheck, Info, X, Leaf, Drumstick, ChevronDown, ChevronUp } from "lucide-react";
import Reveal from "./Reveal";
import VineDivider from "./VineDivider";
import SaveButton from "./SaveButton";
import { cuisines } from "@/data/indiaCuisine";
import { regions, type Region } from "@/data/indiaVenues";

const INITIAL_COUNT = 6;

export default function Cuisine() {
  const [activeRegion, setActiveRegion] = useState<Region | "All">("All");
  const [activeState, setActiveState] = useState<string>("All");
  const [showMethodology, setShowMethodology] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const statesInRegion = useMemo(() => {
    const pool =
      activeRegion === "All"
        ? cuisines
        : cuisines.filter((c) => c.region === activeRegion);
    return Array.from(new Set(pool.map((c) => c.state))).sort();
  }, [activeRegion]);

  const filtered = useMemo(() => {
    return cuisines.filter((c) => {
      const regionMatch = activeRegion === "All" || c.region === activeRegion;
      const stateMatch = activeState === "All" || c.state === activeState;
      return regionMatch && stateMatch;
    });
  }, [activeRegion, activeState]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const remaining = filtered.length - visible.length;

  const handleRegionSelect = (region: Region | "All") => {
    setActiveRegion(region);
    setActiveState("All");
    setShowAll(false);
  };

  const handleStateSelect = (state: string) => {
    setActiveState(state);
    setShowAll(false);
  };

  return (
    <section id="cuisine" className="relative bg-parchment py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Regional Wedding Cuisine</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Every state has a flavour of its own
          </h2>
          <p className="mt-5 font-body text-charcoal/65">
            Signature dishes and wedding-feast traditions from all{" "}
            {cuisines.length} states and union territories we plan in.
          </p>
          <button
            onClick={() => setShowMethodology(true)}
            className="mt-4 inline-flex items-center gap-1.5 font-body text-xs text-gold-dark underline-offset-4 hover:underline"
          >
            <Info size={13} />
            About this photography &amp; sourcing
          </button>
        </Reveal>

        {/* Region filter */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {(["All", ...regions] as (Region | "All")[]).map((region) => (
              <button
                key={region}
                onClick={() => handleRegionSelect(region)}
                className={`rounded-full border px-5 py-2 font-body text-sm transition-all duration-300 ${
                  activeRegion === region
                    ? "border-forest bg-forest text-ivory"
                    : "border-line text-charcoal/65 hover:border-forest/40 hover:text-forest"
                }`}
              >
                {region === "All" ? "All Regions" : region}
              </button>
            ))}
          </div>
        </Reveal>

        {/* State filter */}
        <Reveal delay={0.15}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleStateSelect("All")}
              className={`rounded-full px-3.5 py-1.5 font-body text-xs uppercase tracking-wide transition-all duration-300 ${
                activeState === "All"
                  ? "bg-gold/20 text-gold-dark"
                  : "text-charcoal/45 hover:text-gold-dark"
              }`}
            >
              All States
            </button>
            {statesInRegion.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`rounded-full px-3.5 py-1.5 font-body text-xs uppercase tracking-wide transition-all duration-300 ${
                  activeState === state
                    ? "bg-gold/20 text-gold-dark"
                    : "text-charcoal/45 hover:text-gold-dark"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cuisine grid */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-ivory shadow-card card-lift"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.state}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                    <SaveButton type="cuisine" id={c.id} variant="dark" />
                    {c.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-forest/90 px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-ivory">
                        <BadgeCheck size={12} />
                        Real dish photo
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="flex items-center gap-1.5 font-body text-xs text-ivory/85">
                      <MapPin size={12} />
                      {c.region} India
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-forest">
                    {c.state}
                  </h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-wide text-charcoal/45">
                    {c.dietProfile}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.dishes.map((d) => (
                      <span
                        key={d.name}
                        className="inline-flex items-center gap-1 rounded-full bg-forest/5 px-2.5 py-1 font-body text-[11px] text-forest/75"
                      >
                        {d.veg ? (
                          <Leaf size={10} className="text-green-700" />
                        ) : (
                          <Drumstick size={10} className="text-rose-700" />
                        )}
                        {d.name}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-charcoal/60">
                    {c.weddingFeast}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="group inline-flex items-center gap-2 rounded-full border border-forest/25 bg-transparent px-8 py-3.5 font-body text-sm tracking-wide text-forest transition-all duration-500 hover:border-forest hover:bg-forest hover:text-ivory"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </>
              ) : (
                <>
                  Show {remaining} More State{remaining === 1 ? "" : "s"}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-20">
        <VineDivider />
      </div>

      {/* Methodology modal */}
      <AnimatePresence>
        {showMethodology && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-dark/80 p-4 backdrop-blur-sm"
            onClick={() => setShowMethodology(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg rounded-3xl bg-ivory p-8 shadow-soft"
            >
              <button
                onClick={() => setShowMethodology(false)}
                className="absolute right-5 top-5 text-charcoal/40 hover:text-forest"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <p className="eyebrow">Photography &amp; Sourcing</p>
              <h3 className="mt-3 font-display text-2xl text-forest">
                What&rsquo;s real here, and what&rsquo;s representative
              </h3>
              <div className="mt-4 space-y-3 font-body text-sm leading-relaxed text-charcoal/65">
                <p>
                  Every dish named on this page is genuine regional or wedding
                  cuisine — nothing invented, and every photo is a real
                  Wikimedia Commons photograph. Cards marked{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs text-forest">
                    <BadgeCheck size={11} /> Real dish photo
                  </span>{" "}
                  link to genuine photography of that exact dish, or a real
                  regional thali photographed in that region.
                </p>
                <p>
                  A few thali photos (North Indian states with a similar
                  thali style) are reused honestly across neighbouring states
                  rather than a state-specific shot — that's noted on each
                  entry. States without a verified badge still use a real
                  photo of an Indian wedding celebration, just not one
                  specific to that state's own cuisine — swap in a
                  dish-specific photo whenever you have one.
                </p>
                <p>
                  This is reference content on wedding-menu traditions, not a
                  live "what's cooking" feed — compiled 2026.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
