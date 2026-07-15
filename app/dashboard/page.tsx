"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  UtensilsCrossed,
  Users2,
  Heart,
  Settings,
  Check,
  Trash2,
  LogOut,
  AlertTriangle,
  X,
  Phone,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { areas, formatINR } from "@/data/indiaVenues";
import { cuisines } from "@/data/indiaCuisine";
import { packages } from "@/data/packages";
import SaveButton from "@/components/SaveButton";

type Tab = "venue" | "cuisine" | "package" | "settings";

const TAB_META: Record<Tab, { label: string; icon: typeof Heart }> = {
  venue: { label: "Saved Venues", icon: MapPin },
  cuisine: { label: "Saved Cuisines", icon: UtensilsCrossed },
  package: { label: "Saved Packages", icon: Heart },
  settings: { label: "Settings", icon: Settings },
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardShell />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory">
      <p className="font-body text-sm text-charcoal/45">Loading your account&hellip;</p>
    </main>
  );
}

function DashboardShell() {
  const { user, hydrated, savedItems, openAuthModal } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "venue";
  const [tab, setTab] = useState<Tab>(
    ["venue", "cuisine", "package", "settings"].includes(initialTab)
      ? initialTab
      : "venue"
  );

  if (!hydrated) return <LoadingScreen />;

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <div className="max-w-sm text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Phone size={22} />
          </span>
          <p className="eyebrow">Account</p>
          <h1 className="mt-3 font-display text-3xl text-forest">
            Sign in to view your dashboard
          </h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">
            Create an account with just your mobile number to save venues,
            cuisines, and packages you love.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3">
            <button onClick={openAuthModal} className="btn-primary">
              Sign In / Create Account
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-sm text-charcoal/50 hover:text-forest"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const savedVenues = areas.filter((a) => savedItems.venue.includes(a.id));
  const savedCuisines = cuisines.filter((c) => savedItems.cuisine.includes(c.id));
  const savedPackages = packages.filter((p) => savedItems.package.includes(p.id));

  return (
    <main className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-36">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 font-body text-xs text-charcoal/45 hover:text-forest"
            >
              <ArrowLeft size={13} />
              Back to site
            </Link>
            <p className="eyebrow">My Account</p>
            <h1 className="mt-2 font-display text-4xl text-forest">
              Welcome back
            </h1>
            <p className="mt-1 font-body text-sm text-charcoal/55">
              +91 {user.phone.slice(0, 5)} {user.phone.slice(5)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-line/70 pb-px">
          {(Object.keys(TAB_META) as Tab[]).map((key) => {
            const meta = TAB_META[key];
            const Icon = meta.icon;
            const count =
              key === "venue"
                ? savedVenues.length
                : key === "cuisine"
                ? savedCuisines.length
                : key === "package"
                ? savedPackages.length
                : null;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 rounded-t-xl border-b-2 px-4 py-3 font-body text-sm transition-all duration-300 ${
                  tab === key
                    ? "border-forest text-forest"
                    : "border-transparent text-charcoal/50 hover:text-forest"
                }`}
              >
                <Icon size={15} />
                {meta.label}
                {count !== null && count > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 font-body text-[11px] ${
                      tab === key
                        ? "bg-forest text-ivory"
                        : "bg-forest/10 text-forest/70"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === "venue" && (
              <TabPanel key="venue">
                {savedVenues.length === 0 ? (
                  <EmptyState
                    icon={MapPin}
                    text="No venues saved yet."
                    ctaLabel="Browse Venues"
                    ctaHref="/#venues"
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedVenues.map((area) => (
                      <div
                        key={area.id}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-white shadow-card"
                      >
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={area.image}
                            alt={area.area}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <SaveButton
                            type="venue"
                            id={area.id}
                            variant="dark"
                            className="absolute right-3 top-3"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-xl text-forest">
                            {area.area}
                          </h3>
                          <p className="mt-1 flex items-center gap-1 font-body text-xs text-charcoal/50">
                            <MapPin size={11} />
                            {area.state}
                          </p>
                          <div className="mt-3 flex items-center justify-between font-body text-sm">
                            <span className="text-charcoal/55">Per plate</span>
                            <span className="font-medium text-forest">
                              ₹{formatINR(area.plateMin)}–₹{formatINR(area.plateMax)}
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between font-body text-sm">
                            <span className="flex items-center gap-1 text-charcoal/55">
                              <Users2 size={12} />
                              Capacity
                            </span>
                            <span className="font-medium text-forest">
                              {area.capacity}
                            </span>
                          </div>
                          <a
                            href="#contact"
                            className="mt-4 inline-flex items-center justify-center rounded-full border border-forest/25 py-2 font-body text-xs text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                          >
                            Check Availability
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
            )}

            {tab === "cuisine" && (
              <TabPanel key="cuisine">
                {savedCuisines.length === 0 ? (
                  <EmptyState
                    icon={UtensilsCrossed}
                    text="No cuisines saved yet."
                    ctaLabel="Browse Cuisines"
                    ctaHref="/#cuisine"
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedCuisines.map((c) => (
                      <div
                        key={c.id}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-white shadow-card"
                      >
                        <div className="relative h-36 w-full overflow-hidden">
                          <Image
                            src={c.image}
                            alt={c.state}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <SaveButton
                            type="cuisine"
                            id={c.id}
                            variant="dark"
                            className="absolute right-3 top-3"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-xl text-forest">
                            {c.state}
                          </h3>
                          <p className="mt-1 font-body text-xs uppercase tracking-wide text-charcoal/45">
                            {c.dietProfile}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {c.dishes.slice(0, 3).map((d) => (
                              <span
                                key={d.name}
                                className="rounded-full bg-forest/5 px-2 py-0.5 font-body text-[11px] text-forest/70"
                              >
                                {d.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
            )}

            {tab === "package" && (
              <TabPanel key="package">
                {savedPackages.length === 0 ? (
                  <EmptyState
                    icon={Heart}
                    text="No packages saved yet."
                    ctaLabel="Browse Packages"
                    ctaHref="/#packages"
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="relative flex flex-col rounded-3xl border border-line/70 bg-white p-6 shadow-card"
                      >
                        <SaveButton
                          type="package"
                          id={pkg.id}
                          variant="light"
                          className="absolute right-5 top-5"
                        />
                        <h3 className="font-display text-2xl text-forest">
                          {pkg.name}
                        </h3>
                        <p className="mt-1 font-body text-sm text-charcoal/55">
                          {pkg.tagline}
                        </p>
                        <p className="mt-4 font-display text-3xl text-gold-dark">
                          {pkg.price}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {pkg.includes.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 font-body text-xs text-charcoal/65"
                            >
                              <Check size={13} className="mt-0.5 shrink-0 text-forest" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          className="mt-5 inline-flex items-center justify-center rounded-full border border-forest/25 py-2 font-body text-xs text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                        >
                          Enquire Now
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
            )}

            {tab === "settings" && (
              <TabPanel key="settings">
                <SettingsPanel />
              </TabPanel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function EmptyState({
  icon: Icon,
  text,
  ctaLabel,
  ctaHref,
}: {
  icon: typeof Heart;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-line py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/5 text-forest/40">
        <Icon size={20} />
      </span>
      <p className="mt-4 font-body text-sm text-charcoal/50">{text}</p>
      <Link href={ctaHref} className="btn-outline mt-6">
        {ctaLabel}
      </Link>
    </div>
  );
}

function SettingsPanel() {
  const { user, logout, deleteAccount } = useAuth();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = async () => {
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    deleteAccount();
    router.push("/");
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Account info */}
      <div className="rounded-3xl border border-line/70 bg-white p-7 shadow-card">
        <p className="eyebrow">Account Details</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10 text-forest">
              <Phone size={17} />
            </span>
            <div>
              <p className="font-body text-xs text-charcoal/45">
                Mobile Number
              </p>
              <p className="font-body text-sm text-charcoal">
                +91 {user.phone.slice(0, 5)} {user.phone.slice(5)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10 text-forest">
              <CalendarDays size={17} />
            </span>
            <div>
              <p className="font-body text-xs text-charcoal/45">
                Member Since
              </p>
              <p className="font-body text-sm text-charcoal">{memberSince}</p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn-outline mt-6 w-full sm:w-auto"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>

      {/* Danger zone */}
      <div className="rounded-3xl border border-rose/60 bg-rose-light/20 p-7">
        <p className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-rose-700">
          <AlertTriangle size={13} />
          Danger Zone
        </p>
        <h3 className="mt-3 font-display text-xl text-charcoal">
          Delete your account
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
          This permanently deletes your account and every venue, cuisine, and
          package you&rsquo;ve saved. This action can&rsquo;t be undone.
        </p>
        <button
          onClick={() => setConfirmOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose-700/40 px-6 py-3 font-body text-sm text-rose-700 transition-all duration-300 hover:bg-rose-700 hover:text-ivory"
        >
          <Trash2 size={15} />
          Delete My Account
        </button>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-forest-dark/80 p-4 backdrop-blur-sm"
            onClick={() => !deleting && setConfirmOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-ivory p-8 shadow-soft"
            >
              {!deleting && (
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="absolute right-5 top-5 text-charcoal/40 hover:text-forest"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              )}
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-light/60 text-rose-700">
                <AlertTriangle size={20} />
              </span>
              <h3 className="mt-5 font-display text-2xl text-forest">
                Are you sure?
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                Type <strong>DELETE</strong> to confirm. Your account and all
                saved items will be permanently removed.
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                disabled={deleting}
                className="mt-4 w-full rounded-xl border border-line bg-transparent px-4 py-3 font-body text-sm uppercase tracking-widest text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/30 focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20"
              />
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  disabled={deleting}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirmText !== "DELETE" || deleting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-700 px-6 py-3.5 font-body text-sm text-ivory transition-all duration-300 hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deleting ? "Deleting…" : "Delete Account"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
