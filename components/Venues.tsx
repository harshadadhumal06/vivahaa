"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Users2, UtensilsCrossed, BadgeCheck, Info, X } from "lucide-react";
import Reveal from "./Reveal";
import VineDivider from "./VineDivider";
import SaveButton from "./SaveButton";
import { areas, regions, formatINR, type Region } from "@/data/indiaVenues";

const INITIAL_COUNT = 6;

export default function Venues() {
  const [activeRegion, setActiveRegion] = useState<Region | "All">("All");
  const [activeState, setActiveState] = useState<string>("All");
  const [showMethodology, setShowMethodology] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const statesInRegion = useMemo(() => {
    const pool =
      activeRegion === "All"
        ? areas
        : areas.filter((a) => a.region === activeRegion);
    return Array.from(new Set(pool.map((a) => a.state))).sort();
  }, [activeRegion]);

  const filtered = useMemo(() => {
    return areas.filter((a) => {
      const regionMatch = activeRegion === "All" || a.region === activeRegion;
      const stateMatch = activeState === "All" || a.state === activeState;
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

  const totalStates = useMemo(
    () => new Set(areas.map((a) => a.state)).size,
    []
  );

  return (
    <section id="venues" className="relative bg-ivory py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Venues Across India</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Explore venues, state by state
          </h2>
          <p className="mt-5 font-body text-charcoal/65">
            {areas.length} areas across {totalStates} states — with 2026
            market-rate pricing so you can shortlist by budget, not just by
            looks.
          </p>
          <button
            onClick={() => setShowMethodology(true)}
            className="mt-4 inline-flex items-center gap-1.5 font-body text-xs text-gold-dark underline-offset-4 hover:underline"
          >
            <Info size={13} />
            How we source this data
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

        {activeState !== "All" && (
          <p className="mt-4 text-center font-body text-xs text-charcoal/45">
            {filtered.length} area{filtered.length === 1 ? "" : "s"} in{" "}
            {activeState}
          </p>
        )}

        {/* Venue grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((area) => (
              <motion.div
                key={area.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-white shadow-card card-lift"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.area}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-body text-[10px] uppercase tracking-wider text-forest">
                    {area.tier}
                  </span>
                  <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                    <SaveButton type="venue" id={area.id} variant="dark" />
                    {area.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-forest/90 px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-ivory">
                        <BadgeCheck size={12} />
                        Verified pricing
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="flex items-center gap-1.5 font-body text-xs text-ivory/85">
                      <MapPin size={12} />
                      {area.state}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-forest">
                    {area.area}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {area.venueTypes.map((vt) => (
                      <span
                        key={vt}
                        className="rounded-full bg-forest/5 px-2.5 py-0.5 font-body text-[11px] text-forest/70"
                      >
                        {vt}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">
                    {area.highlight}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-line/70 pt-5">
                    <div className="flex items-center justify-between font-body text-sm">
                      <span className="flex items-center gap-1.5 text-charcoal/55">
                        <UtensilsCrossed size={14} className="text-gold-dark" />
                        Per plate
                      </span>
                      <span className="font-medium text-forest">
                        ₹{formatINR(area.plateMin)} – ₹{formatINR(area.plateMax)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-body text-sm">
                      <span className="flex items-center gap-1.5 text-charcoal/55">
                        <Users2 size={14} className="text-gold-dark" />
                        Capacity
                      </span>
                      <span className="font-medium text-forest">
                        {area.capacity}
                      </span>
                    </div>
                    <p className="pt-1 font-body text-xs text-charcoal/45">
                      Est. package: {area.packageEstimate}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-forest/25 py-2.5 font-body text-sm text-forest transition-all duration-500 hover:border-forest hover:bg-forest hover:text-ivory"
                  >
                    Check Availability
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-body text-charcoal/50">
            No areas in this state yet — try another region.
          </p>
        )}

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
                  Show {remaining} More Area{remaining === 1 ? "" : "s"}
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
              <p className="eyebrow">Data Methodology</p>
              <h3 className="mt-3 font-display text-2xl text-forest">
                Why this isn&rsquo;t a live price feed
              </h3>
              <div className="mt-4 space-y-3 font-body text-sm leading-relaxed text-charcoal/65">
                <p>
                  Indian wedding venues quote privately by date, season, guest
                  count and menu — there is no public real-time pricing API
                  for this industry, so we don&rsquo;t pretend to have one.
                </p>
                <p>
                  Instead, every area below is assigned a market{" "}
                  <strong>tier</strong> (Metro, State Capital, Heritage
                  Destination, Hill Resort, Beach &amp; Coastal, Kerala
                  Backwater, Pilgrimage Town, or Tier-2 Town) and priced from
                  2026 wedding-industry rate benchmarks for that tier. A
                  handful of areas also name a real flagship property; those
                  marked{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs text-forest">
                    <BadgeCheck size={11} /> Verified pricing
                  </span>{" "}
                  have that specific venue&rsquo;s numbers cross-checked
                  against multiple published 2026 sources; everything else is
                  a category-level estimate.
                </p>
                <p>
                  Photography: every area shows a real, working photo — none
                  are generated or invented. The areas marked{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs text-forest">
                    <BadgeCheck size={11} /> Verified pricing
                  </span>{" "}
                  (Jaipur, Hyderabad, Mumbai) and Goa&rsquo;s 5 areas each show
                  a genuine photo of that exact property or beach. Every other
                  area shows a real Wikimedia Commons photo representative of
                  its tier (e.g. a real Rajasthan palace wedding photo for
                  Heritage Destination areas, a real Kerala backwaters photo
                  for Kerala Backwater areas) — shared across areas of the
                  same tier where we don&rsquo;t yet have a unique photo for
                  that specific place.
                </p>
                <p>
                  Treat these as planning ranges, not quotes — always confirm
                  exact rates directly with the venue. Data last compiled July
                  2026.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
