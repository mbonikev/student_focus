"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";

type Status = "idle" | "loading" | "success" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  /* Supabase puts the recovery token in the URL hash.
     The client SDK picks it up and fires an auth state change. */
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    // Also check if we already have a valid session (page reload)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setStatus("idle");
    } else {
      setStatus("success");
      setTimeout(() => router.push("/"), 2000);
    }
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
          {/* Success state */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border px-4 py-5"
              style={{
                borderColor: "var(--green)",
                background: "color-mix(in srgb, var(--green) 8%, transparent)",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "var(--green)" }}>
                Password updated
              </p>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                Redirecting you to the app…
              </p>
            </motion.div>
          )}

          {/* No recovery session — link expired or invalid */}
          {status !== "success" && !sessionReady && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-5"
            >
              <div
                className="border px-4 py-5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  Verifying reset link…
                </p>
                <p className="text-xs mt-1.5" style={{ color: "var(--text-subtle)" }}>
                  If this takes more than a few seconds your link may have expired.
                </p>
              </div>
              <Link
                href="/forgot-password"
                className="flex items-center gap-2 text-xs transition-colors hover:text-[var(--text)]"
                style={{ color: "var(--text-subtle)" }}
              >
                <ArrowLeft size={12} />
                Request a new link
              </Link>
            </motion.div>
          )}

          {/* Password form */}
          {status !== "success" && sessionReady && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="text-base font-semibold" style={{ color: "var(--text)" }}>
                  Choose a new password
                </h1>
                <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
                  Must be at least 6 characters.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* New password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="new-password"
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      name="new-password"
                      type={showPw ? "text" : "password"}
                      required
                      autoFocus
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 pr-10 text-sm border bg-transparent outline-none"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-[var(--text)]"
                      style={{ color: "var(--text-subtle)" }}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Confirm */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="confirm-password"
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={showPw ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 pr-10 text-sm border bg-transparent outline-none"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-[var(--text)]"
                      style={{ color: "var(--text-subtle)" }}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Strength indicator */}
                {password.length > 0 && (
                  <PasswordStrength password={password} />
                )}

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
                  disabled={status === "loading"}
                  className="w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-fg)",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                  Update password
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const label = ["Too short", "Weak", "Fair", "Strong", "Very strong"][score];
  const color = ["var(--red)", "var(--red)", "var(--yellow)", "var(--green)", "var(--green)"][score];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-0.5"
            animate={{ background: i < score ? color : "var(--border)" }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
      <span className="text-[10px]" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
