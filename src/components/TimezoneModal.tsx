"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, Check } from "lucide-react";
import { TIMEZONES } from "@/lib/timezones";

interface Props {
  open: boolean;
  onClose: () => void;
  current: string;
  onSelect: (tz: string) => void;
}

export function TimezoneModal({ open, onClose, current, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = TIMEZONES.filter(
    (tz) =>
      tz.label.toLowerCase().includes(search.toLowerCase()) ||
      tz.value.toLowerCase().includes(search.toLowerCase()) ||
      tz.offset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="tz-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 200,
            }}
          />

          {/* Centering wrapper */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 201,
              pointerEvents: "none",
            }}
          >
            <motion.div
              key="tz-modal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              style={{
                pointerEvents: "all",
                width: "min(420px, 92vw)",
                maxHeight: "68vh",
                display: "flex",
                flexDirection: "column",
                background: "var(--ck-bg)",
                border: "1px solid var(--ck-border)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.1rem 1.4rem",
                  borderBottom: "1px solid var(--ck-border)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter, system-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ck-muted)",
                  }}
                >
                  Timezone
                </span>
                <button
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--ck-icon)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Search */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.7rem 1.4rem",
                  borderBottom: "1px solid var(--ck-border)",
                  flexShrink: 0,
                }}
              >
                <Search size={13} style={{ color: "var(--ck-muted)", flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search city or timezone…"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--ck-text)",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-inter, system-ui)",
                    width: "100%",
                    outline: "none",
                  }}
                />
              </div>

              {/* List */}
              <div style={{ overflowY: "auto", flex: 1 }}>
                {filtered.length === 0 ? (
                  <div
                    style={{
                      padding: "2rem 1.4rem",
                      textAlign: "center",
                      color: "var(--ck-muted)",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-inter, system-ui)",
                    }}
                  >
                    No results
                  </div>
                ) : (
                  filtered.map((tz) => {
                    const selected = current === tz.value;
                    return (
                      <button
                        key={tz.value}
                        onClick={() => { onSelect(tz.value); onClose(); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0.65rem 1.4rem",
                          background: selected ? "var(--ck-surface)" : "none",
                          border: "none",
                          borderBottom: "1px solid var(--ck-border)",
                          cursor: "pointer",
                          fontFamily: "var(--font-inter, system-ui)",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "var(--ck-surface)"; }}
                        onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = "none"; }}
                      >
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: selected ? "var(--ck-text)" : "var(--ck-muted)",
                          }}
                        >
                          {tz.label}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--ck-muted)",
                              opacity: 0.65,
                            }}
                          >
                            {tz.offset}
                          </span>
                          {selected && (
                            <Check size={13} style={{ color: "var(--ck-text)", flexShrink: 0 }} />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
