"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, ShieldCheck, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    pendingPhone,
    cancelPendingPhone,
    sendOtp,
    verifyOtp,
    resendOtp,
    resendCooldown,
  } = useAuth();

  const [phoneInput, setPhoneInput] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset local state whenever the modal opens/closes or the step changes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setTimeout(() => {
        setPhoneInput("");
        setOtpDigits(["", "", "", "", "", ""]);
        setError(null);
        setNotice(null);
        setDevOtp(null);
        setSuccess(false);
      }, 300);
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    setError(null);
    setOtpDigits(["", "", "", "", "", ""]);
  }, [pendingPhone]);

  useEffect(() => {
    if (pendingPhone) {
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  }, [pendingPhone]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await sendOtp(phoneInput);
    setLoading(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setNotice(res.message);
    setDevOtp(res.devOtp ?? null);
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    const res = await resendOtp();
    setLoading(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setNotice(res.message);
    setDevOtp(res.devOtp ?? null);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digits = [...otpDigits];
    digits[index] = value.slice(-1);
    setOtpDigits(digits);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const digits = text.split("");
    while (digits.length < 6) digits.push("");
    setOtpDigits(digits);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join("");
    if (code.length !== 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await verifyOtp(code);
    setLoading(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setSuccess(true);
  };

  const handleClose = () => {
    closeAuthModal();
  };

  const handleBack = () => {
    cancelPendingPhone();
    setNotice(null);
    setDevOtp(null);
    setError(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-forest-dark/80 p-4 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-ivory p-8 shadow-soft"
        >
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 text-charcoal/40 hover:text-forest"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {success ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="text-gold" size={44} />
              <h3 className="mt-5 font-display text-2xl text-forest">
                Welcome to Evermore &amp; Co.
              </h3>
              <p className="mt-2 max-w-xs font-body text-sm text-charcoal/60">
                You&rsquo;re signed in. You can now save your favourite
                venues, cuisines, and packages to your account.
              </p>
              <button onClick={handleClose} className="btn-primary mt-7">
                Continue
              </button>
            </div>
          ) : !pendingPhone ? (
            <>
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                <Phone size={20} />
              </span>
              <p className="eyebrow">Sign In</p>
              <h3 className="mt-3 font-display text-2xl text-forest">
                Enter your mobile number
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                We&rsquo;ll text you a one-time code to verify it&rsquo;s you
                — no password needed.
              </p>

              <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-body text-xs uppercase tracking-wider text-charcoal/55"
                  >
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-xl border border-line bg-transparent transition-all duration-300 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
                    <span className="pl-4 font-body text-sm text-charcoal/50">
                      +91
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoFocus
                      required
                      placeholder="98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full bg-transparent px-3 py-3 font-body text-sm text-charcoal outline-none placeholder:text-charcoal/35"
                    />
                  </div>
                </div>

                {error && (
                  <p className="font-body text-xs text-rose-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending
                      OTP&hellip;
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <p className="text-center font-body text-[11px] leading-relaxed text-charcoal/40">
                  By continuing you agree to be contacted about your wedding
                  enquiry. We never share your number.
                </p>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="mb-4 inline-flex items-center gap-1.5 font-body text-xs text-charcoal/50 hover:text-forest"
              >
                <ArrowLeft size={13} /> Change number
              </button>
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                <ShieldCheck size={20} />
              </span>
              <p className="eyebrow">Verify OTP</p>
              <h3 className="mt-3 font-display text-2xl text-forest">
                Enter the 6-digit code
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                Sent to +91 {pendingPhone}.
              </p>

              {devOtp && (
                <p className="mt-3 rounded-xl bg-gold/10 px-4 py-3 font-body text-xs leading-relaxed text-gold-dark">
                  <strong>Demo mode</strong> — no SMS gateway is connected, so
                  here&rsquo;s your code: <strong>{devOtp}</strong>
                </p>
              )}

              <form onSubmit={handleVerify} className="mt-6 space-y-4">
                <div
                  className="flex justify-between gap-2"
                  onPaste={handleOtpPaste}
                >
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="h-12 w-11 rounded-xl border border-line bg-transparent text-center font-display text-xl text-charcoal outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  ))}
                </div>

                {error && (
                  <p className="font-body text-xs text-rose-700">{error}</p>
                )}
                {notice && !error && (
                  <p className="font-body text-xs text-forest/70">{notice}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />{" "}
                      Verifying&hellip;
                    </>
                  ) : (
                    "Verify & Sign In"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  className="w-full text-center font-body text-xs text-gold-dark disabled:text-charcoal/35"
                >
                  {resendCooldown > 0
                    ? `Resend OTP in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
