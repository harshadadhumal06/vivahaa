"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// DEMO-MODE NOTICE
// ---------------------------------------------------------------------------
// This project ships without a backend/database, so mobile-number + OTP
// login is simulated entirely client-side (localStorage stands in for a
// users table, and a module-level Map stands in for a server OTP cache).
// The full UX — send OTP, 5 min expiry, resend cooldown, wrong-code
// handling, session persistence, saved items scoped per-account, and
// account deletion — works end-to-end for development and demos.
//
// To go to production, replace `requestOtp` / `confirmOtp` below with calls
// to real server endpoints backed by an SMS/OTP provider, e.g.:
//   - Firebase Phone Auth
//   - Twilio Verify
//   - MSG91 / 2Factor (widely used for Indian numbers)
// and replace the localStorage "tables" with a real database. Everything
// above this context (the modal, the save buttons, the dashboard) can stay
// exactly as-is — only the three functions inside sendOtp/verifyOtp that
// touch localStorage/otpStore need to become network calls.
// ---------------------------------------------------------------------------

export interface AuthUser {
  phone: string; // 10-digit Indian mobile number, no country code
  name: string | null;
  createdAt: string;
}

export type ItemType = "venue" | "cuisine" | "package";
type SavedBucket = Record<ItemType, string[]>;
type SavedMap = Record<string, SavedBucket>;

interface StoredOtp {
  code: string;
  expiresAt: number;
}

const USERS_KEY = "ec_users_v1";
const SESSION_KEY = "ec_session_v1";
const SAVED_KEY = "ec_saved_items_v1";
const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_S = 30;

function emptyBucket(): SavedBucket {
  return { venue: [], cuisine: [], package: [] };
}

function readUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readSavedMap(): SavedMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeSavedMap(map: SavedMap) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(map));
}

// Simulated server-side OTP cache (module scope survives re-renders,
// resets on a hard page reload — same lifecycle a serverless OTP cache
// would have without a persistent store).
const otpStore = new Map<string, StoredOtp>();

interface OtpResult {
  ok: boolean;
  message: string;
  devOtp?: string; // surfaced only because there's no real SMS gateway wired up
}

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;

  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  pendingPhone: string | null;
  resendCooldown: number;

  sendOtp: (phone: string) => Promise<OtpResult>;
  resendOtp: () => Promise<OtpResult>;
  verifyOtp: (code: string) => Promise<{ ok: boolean; message: string }>;
  cancelPendingPhone: () => void;

  logout: () => void;
  deleteAccount: () => void;

  savedItems: SavedBucket;
  toggleSaved: (type: ItemType, id: string) => void;
  isSaved: (type: ItemType, id: string) => boolean;
  savedCount: number;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [savedItems, setSavedItems] = useState<SavedBucket>(emptyBucket());

  // Hydrate session from localStorage on mount
  useEffect(() => {
    try {
      const sessionPhone = localStorage.getItem(SESSION_KEY);
      if (sessionPhone) {
        const found = readUsers().find((u) => u.phone === sessionPhone);
        if (found) {
          setUser(found);
          setSavedItems(readSavedMap()[found.phone] || emptyBucket());
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setPendingPhone(null);
  };
  const cancelPendingPhone = () => setPendingPhone(null);

  const generateAndStoreOtp = (phone: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { code, expiresAt: Date.now() + OTP_TTL_MS });
    // eslint-disable-next-line no-console
    console.info(`[demo mode] OTP for +91 ${phone}: ${code}`);
    return code;
  };

  const sendOtp = async (rawPhone: string): Promise<OtpResult> => {
    const phone = rawPhone.replace(/\D/g, "").slice(-10);
    if (phone.length !== 10) {
      return { ok: false, message: "Enter a valid 10-digit mobile number." };
    }
    await new Promise((r) => setTimeout(r, 500)); // simulate network latency
    const code = generateAndStoreOtp(phone);
    setPendingPhone(phone);
    setResendCooldown(RESEND_COOLDOWN_S);
    return { ok: true, message: `OTP sent to +91 ${phone}.`, devOtp: code };
  };

  const resendOtp = async (): Promise<OtpResult> => {
    if (!pendingPhone) {
      return { ok: false, message: "Enter your mobile number first." };
    }
    if (resendCooldown > 0) {
      return { ok: false, message: "Please wait before requesting a new OTP." };
    }
    await new Promise((r) => setTimeout(r, 400));
    const code = generateAndStoreOtp(pendingPhone);
    setResendCooldown(RESEND_COOLDOWN_S);
    return { ok: true, message: "A new OTP has been sent.", devOtp: code };
  };

  const verifyOtp = async (code: string) => {
    if (!pendingPhone) {
      return { ok: false, message: "Start over — no phone number on file." };
    }
    const entry = otpStore.get(pendingPhone);
    if (!entry) {
      return { ok: false, message: "OTP expired. Please resend." };
    }
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(pendingPhone);
      return { ok: false, message: "OTP expired. Please resend." };
    }
    if (entry.code !== code.trim()) {
      return { ok: false, message: "Incorrect OTP. Please try again." };
    }
    otpStore.delete(pendingPhone);

    const users = readUsers();
    let account = users.find((u) => u.phone === pendingPhone);
    if (!account) {
      account = {
        phone: pendingPhone,
        name: null,
        createdAt: new Date().toISOString(),
      };
      users.push(account);
      writeUsers(users);
    }
    localStorage.setItem(SESSION_KEY, account.phone);
    setUser(account);
    setSavedItems(readSavedMap()[account.phone] || emptyBucket());
    setPendingPhone(null);
    setAuthModalOpen(false);
    return { ok: true, message: "Signed in successfully." };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setSavedItems(emptyBucket());
  };

  const deleteAccount = () => {
    if (!user) return;
    writeUsers(readUsers().filter((u) => u.phone !== user.phone));
    const saved = readSavedMap();
    delete saved[user.phone];
    writeSavedMap(saved);
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setSavedItems(emptyBucket());
  };

  const toggleSaved = (type: ItemType, id: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    setSavedItems((prev) => {
      const set = new Set(prev[type]);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      const next = { ...prev, [type]: Array.from(set) };
      const saved = readSavedMap();
      saved[user.phone] = next;
      writeSavedMap(saved);
      return next;
    });
  };

  const isSaved = (type: ItemType, id: string) =>
    savedItems[type]?.includes(id) ?? false;

  const savedCount =
    savedItems.venue.length + savedItems.cuisine.length + savedItems.package.length;

  const value: AuthContextValue = {
    user,
    hydrated,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    pendingPhone,
    resendCooldown,
    sendOtp,
    resendOtp,
    verifyOtp,
    cancelPendingPhone,
    logout,
    deleteAccount,
    savedItems,
    toggleSaved,
    isSaved,
    savedCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
