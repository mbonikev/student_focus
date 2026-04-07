"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ClockLayout, Theme } from "@/hooks/useSettings";
import type { ClockData } from "@/hooks/useClockTime";
import { CLOCK_LAYOUTS } from "@/lib/clockLayouts";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  current: ClockLayout;
  onSelect: (layout: ClockLayout) => void;
  clock: ClockData;
  theme: Theme;
}

export function LayoutDrawer({ open, onClose, current, onSelect, clock, theme }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 100,
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 101,
              background: "var(--ck-bg)",
              borderTop: "1px solid var(--ck-border)",
              padding: "1.75rem 2rem 2.5rem",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
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
                Clock Layout
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

            {/* Previews */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {CLOCK_LAYOUTS.map(({ id, label, Component, vars: layoutVars }) => {
                const vars = layoutVars[theme];
                const active = current === id;

                return (
                  <button
                    key={id}
                    onClick={() => onSelect(id)}
                    style={{
                      position: "relative",
                      width: 220,
                      height: 130,
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: 0,
                      border: active ? `2px solid var(--ck-text)` : `1px solid var(--ck-border)`,
                      background: vars["--ck-bg"],
                      ...(vars as React.CSSProperties),
                    }}
                  >
                    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
                      <Component clock={clock} preview />
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "4px 8px",
                        textAlign: "center",
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: vars["--ck-muted"],
                        fontFamily: "var(--font-inter, system-ui)",
                        background: vars["--ck-bg"],
                      }}
                    >
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
