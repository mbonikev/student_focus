"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Settings } from "@/hooks/useSettings";

interface Props {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
}

export function SettingsModal({ open, onClose, settings, update }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="settings-backdrop"
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
              key="settings-modal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              style={{
                pointerEvents: "all",
                width: "min(360px, 92vw)",
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
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter, system-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ck-text)",
                  }}
                >
                  Settings
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

              {/* Options */}
              <div style={{ padding: "0.5rem 0" }}>
                <SettingRow
                  label="Show date"
                  checked={settings.showDate}
                  onChange={(v) => update({ showDate: v })}
                />
                <SettingRow
                  label="Autohide Buttons"
                  description="Auto-hide toolbar in fullscreen"
                  checked={settings.ghostMode}
                  onChange={(v) => update({ ghostMode: v })}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function SettingRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.85rem 1.4rem",
        borderBottom: "1px solid var(--ck-border)",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
        <span
          style={{
            fontFamily: "var(--font-inter, system-ui)",
            fontSize: "0.875rem",
            color: "var(--ck-text)",
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              fontFamily: "var(--font-inter, system-ui)",
              fontSize: "0.72rem",
              color: "var(--ck-muted)",
            }}
          >
            {description}
          </span>
        )}
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: "2.5rem",
        height: "1.375rem",
        borderRadius: "9999px",
        border: "1px solid var(--ck-border)",
        background: checked ? "var(--ck-text)" : "var(--ck-surface)",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <motion.span
        animate={{ x: checked ? "1.2rem" : "0.15rem" }}
        transition={{ type: "spring", damping: 26, stiffness: 400 }}
        style={{
          position: "absolute",
          top: "50%",
          translateY: "-50%",
          width: "0.875rem",
          height: "0.875rem",
          borderRadius: "9999px",
          background: checked ? "var(--ck-bg)" : "var(--ck-muted)",
          display: "block",
        }}
      />
    </button>
  );
}
