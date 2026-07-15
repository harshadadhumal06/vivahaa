"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Laurel from "./Laurel";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ivory pt-24"
    >
      {/* Ambient background photo */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding ceremony under a floral arch"
          fill
          priority
          className="object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/90 to-ivory" />
      </div>

      {/* floating petals */}
      <motion.div
        className="absolute left-[8%] top-[22%] h-3 w-3 rounded-full bg-rose/70"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[12%] top-[32%] h-2 w-2 rounded-full bg-gold/70"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute right-[20%] bottom-[26%] h-2.5 w-2.5 rounded-full bg-forest/30"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Laurel className="absolute -left-2 top-0 h-40 w-24 md:h-56 md:w-32 md:-left-16" />
        <Laurel flip className="absolute -right-2 top-0 h-40 w-24 md:h-56 md:w-32 md:-right-16" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          Wedding Planning Studio &middot; Est. 2014
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[15vw] leading-[0.95] text-forest sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Your Story,
          <br />
          <span className="italic text-gold-dark">Beautifully Told</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-7 max-w-xl text-balance font-body text-base leading-relaxed text-charcoal/70 md:text-lg"
        >
          We design weddings the way you remember them &mdash; unhurried,
          personal, and quietly extraordinary. From first walkthrough to last
          dance, Evermore &amp; Co. carries every detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn-primary">
            Begin Your Story
          </a>
          <a href="#packages" className="btn-outline">
            View Packages
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-forest/50 hover:text-gold transition-colors"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
