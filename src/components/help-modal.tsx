"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Section {
  title: string;
  items: { label: string; desc: string }[];
}

const sections: Section[] = [
  {
    title: "Timer",
    items: [
      { label: "Modes", desc: "Switch between Focus, Short Break, and Long Break using the tabs at the top." },
      { label: "Start / Pause", desc: "Press the large circle button to start or pause the timer." },
      { label: "Reset", desc: "The ↺ button resets the current timer without changing the mode." },
      { label: "Add time", desc: "While running, a +Xm button appears to extend the current session." },
      { label: "Session dots", desc: "Four dots track your progress through a pomodoro cycle. After every 4 focus sessions a long break is suggested." },
      { label: "Active task", desc: "Select a task from the widget at the bottom to track pomodoros against it. The count updates automatically when a focus session finishes." },
    ],
  },
  {
    title: "Tasks",
    items: [
      { label: "Add a task", desc: "Type in the input at the top and press Enter or the + button. Set an estimated pomodoro count with the Est. dropdown." },
      { label: "Complete", desc: "Click the circle icon on the left to mark a task done. Click again to reopen it." },
      { label: "Set active", desc: "Hover a task and click the target icon (⊙) to make it the active task shown on the Timer page." },
      { label: "Filter", desc: "Use All / Active / Done tabs to filter the list." },
      { label: "Clear done", desc: "The 'Clear done' link in the footer removes all completed tasks at once." },
    ],
  },
  {
    title: "Notes",
    items: [
      { label: "New note", desc: "Click the + button in the sidebar header to create a new note." },
      { label: "Edit", desc: "Click any note in the list to open it. Edit the title in the top bar and the body in the main area." },
      { label: "Delete", desc: "Click the trash icon in the editor header to delete the current note." },
      { label: "Word count", desc: "A live word and character count is shown in the footer bar." },
    ],
  },
  {
    title: "Clocks",
    items: [
      { label: "Styles", desc: "Six clock styles are available: Minimal, macOS, Analog, Flip, Binary, and Terminal." },
      { label: "Expand", desc: "Click any clock card to open it in a full-page overlay." },
      { label: "Fullscreen", desc: "In the overlay, click Fullscreen (or press F) to enter native fullscreen. Press Esc or click Close to exit." },
    ],
  },
  {
    title: "Stats",
    items: [
      { label: "Overview cards", desc: "Shows today's sessions and focus minutes, all-time totals, completed tasks, and today's pomodoro count." },
      { label: "Bar charts", desc: "Two charts cover the last 7 days — one for session counts, one for total focus minutes." },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Themes", desc: "Pick separate themes for light and dark mode. The app switches automatically with your OS." },
      { label: "Font", desc: "Choose from several font options that apply across the whole app." },
      { label: "Timer durations", desc: "Adjust Focus, Short Break, and Long Break lengths in minutes." },
      { label: "Long break interval", desc: "Set how many focus sessions trigger a long break (default 4)." },
      { label: "Auto-start", desc: "Enable auto-start for breaks and/or pomodoros so the next session begins without interaction." },
      { label: "Add minutes amount", desc: "Controls how many minutes the +Xm button adds while the timer is running." },
      { label: "Sign out", desc: "Logs you out. If a timer is running you will be asked to confirm first." },
    ],
  },
];

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.45)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative flex flex-col border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              width: "min(680px, 92vw)",
              maxHeight: "82vh",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  How to use Student Focus
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>
                  A quick overview of every feature
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {section.title}
                  </p>
                  <div className="flex flex-col border" style={{ borderColor: "var(--border)" }}>
                    {section.items.map((item, i) => (
                      <div
                        key={item.label}
                        className="flex gap-4 px-4 py-2.5"
                        style={{
                          borderBottom: i < section.items.length - 1 ? "1px solid var(--border)" : "none",
                        }}
                      >
                        <span
                          className="text-xs font-medium shrink-0 w-32"
                          style={{ color: "var(--text)" }}
                        >
                          {item.label}
                        </span>
                        <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
