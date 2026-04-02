"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-8 h-8 flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
          >
            F
          </div>
          <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Focus
          </span>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-5"
            >
              <div
                className="border px-4 py-5"
                style={{ borderColor: "var(--green)", background: "color-mix(in srgb, var(--green) 8%, transparent)" }}
              >
                <p className="text-sm font-medium" style={{ color: "var(--green)" }}>
                  Reset link sent
                </p>
                <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                  Check <strong>{email}</strong> for a password reset link. It may take a minute to arrive.
                </p>
              </div>
              <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
                Didn&apos;t receive it? Check your spam folder, or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="underline hover:text-[var(--text)] transition-colors"
                >
                  try again
                </button>
                .
              </p>
              <Link
                href="/login"
                className="flex items-center gap-2 text-xs transition-colors hover:text-[var(--text)]"
                style={{ color: "var(--text-subtle)" }}
              >
                <ArrowLeft size={12} />
                Back to sign in
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="text-base font-semibold" style={{ color: "var(--text)" }}>
                  Reset your password
                </h1>
                <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm border bg-transparent outline-none"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs px-3 py-2 border"
                      style={{
                        borderColor: "var(--red)",
                        color: "var(--red)",
                        background: "color-mix(in srgb, var(--red) 8%, transparent)",
                      }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-fg)",
                    opacity: loading ? 0.7 : 1,
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  Send reset link
                </motion.button>
              </form>

              <Link
                href="/login"
                className="flex items-center gap-2 text-xs transition-colors hover:text-[var(--text)]"
                style={{ color: "var(--text-subtle)" }}
              >
                <ArrowLeft size={12} />
                Back to sign in
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
