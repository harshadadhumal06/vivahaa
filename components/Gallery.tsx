"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Reveal from "./Reveal";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    alt: "Bride and groom under a floral arch",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    alt: "Reception table styled with candles and florals",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1521543387316-e9c4934a4bf5?q=80&w=1200&auto=format&fit=crop",
    alt: "Couple laughing together",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
    alt: "Bridal bouquet close up",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop",
    alt: "First dance under string lights",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    alt: "Wedding rings on a linen table",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop",
    alt: "Guests celebrating during the toast",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=1200&auto=format&fit=crop",
    alt: "Wedding cake detail",
    tall: false,
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <section id="gallery" className="relative bg-parchment py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Real Moments</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            From weddings we&rsquo;ve planned
          </h2>
          <p className="mt-5 font-body text-charcoal/65">
            A small window into days we were lucky enough to help design.
          </p>
        </Reveal>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 4) * 0.08}>
              <button
                onClick={() => setActiveIndex(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl shadow-card ${
                  photo.tall ? "h-96" : "h-64"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-forest-dark/0 opacity-0 transition-all duration-500 group-hover:bg-forest-dark/30 group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-forest scale-75 transition-transform duration-500 group-hover:scale-100">
                    <Expand size={18} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-dark/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 text-ivory/80 hover:text-gold transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 text-ivory/70 hover:text-gold transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={34} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 text-ivory/70 hover:text-gold transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={34} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[70vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                className="rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
