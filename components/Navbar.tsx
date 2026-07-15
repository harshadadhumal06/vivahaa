"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Venues", href: "#venues" },
  { label: "Cuisine", href: "#cuisine" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const { user, hydrated, openAuthModal, logout, savedCount } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [accountMenuOpen]);

  const displayPhone = user ? `+91 ${user.phone.slice(0, 5)} ${user.phone.slice(5)}` : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-line/60 bg-ivory/90 px-5 py-2.5 shadow-card backdrop-blur-md"
            : "border-transparent bg-transparent px-5 py-4"
        }`}
      >
        <a
          href="#home"
          className="font-display text-xl italic tracking-wide text-forest"
        >
          Evermore <span className="text-gold not-italic">&amp;</span> Co.
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="underline-grow font-body text-[13px] uppercase tracking-widest text-forest/80 transition-colors hover:text-forest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact">
            <span className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 font-body text-[13px] tracking-wide text-ivory transition-all duration-500 hover:bg-gold hover:shadow-soft">
              Begin Your Story
            </span>
          </a>

          {hydrated && !user && (
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/25 px-5 py-2.5 font-body text-[13px] tracking-wide text-forest transition-all duration-500 hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <User size={14} />
              Sign In
            </button>
          )}

          {hydrated && user && (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountMenuOpen((s) => !s)}
                className="relative inline-flex items-center gap-1.5 rounded-full border border-forest/25 px-4 py-2.5 font-body text-[13px] tracking-wide text-forest transition-all duration-500 hover:border-forest"
              >
                <User size={14} />
                {user.phone.slice(0, 5)}&hellip;
                {savedCount > 0 && (
                  <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-body text-[10px] text-ivory">
                    {savedCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-2xl border border-line/70 bg-ivory shadow-soft"
                  >
                    <div className="border-b border-line/70 px-4 py-3">
                      <p className="font-body text-xs text-charcoal/45">
                        Signed in as
                      </p>
                      <p className="font-body text-sm text-forest">
                        {displayPhone}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 font-body text-sm text-charcoal/75 transition-colors hover:bg-forest/5 hover:text-forest"
                    >
                      <LayoutDashboard size={15} />
                      My Dashboard
                    </Link>
                    <Link
                      href="/dashboard?tab=venue"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 font-body text-sm text-charcoal/75 transition-colors hover:bg-forest/5 hover:text-forest"
                    >
                      <Heart size={15} />
                      Saved Items
                      {savedCount > 0 && (
                        <span className="ml-auto rounded-full bg-forest/10 px-2 py-0.5 text-[11px] text-forest">
                          {savedCount}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-3 font-body text-sm text-charcoal/75 transition-colors hover:bg-rose/20 hover:text-rose-700"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {hydrated && user && (
            <Link href="/dashboard" className="relative text-forest" aria-label="My Dashboard">
              <User size={22} />
              {savedCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-body text-[9px] text-ivory">
                  {savedCount}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setOpen(true)}
            className="text-forest"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto"
            style={{ backgroundColor: "#142720" }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setOpen(false)}
                className="text-ivory"
                style={{ color: "#FAF6EF" }}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-col items-center gap-7 pb-10 pt-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl italic transition-colors hover:text-gold-light"
                    style={{ color: "#FAF6EF" }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mx-auto flex max-w-xs flex-col items-center gap-4 border-t border-ivory/15 pb-16 pt-8">
              {hydrated && user ? (
                <>
                  <p className="font-body text-sm text-ivory/60">
                    {displayPhone}
                  </p>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-body text-sm text-forest"
                  >
                    <LayoutDashboard size={15} />
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="inline-flex items-center gap-2 font-body text-sm text-ivory/60 hover:text-ivory"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    openAuthModal();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-body text-sm text-forest"
                >
                  <User size={15} />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
