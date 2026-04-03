# Student Focus

A minimal productivity app for students built around the Pomodoro technique. Stay on task with a focused timer, manage what you're working on, jot down notes, and track your study habits over time — all in one clean interface.

---

<!-- SCREENSHOT: Full app overview — timer page in dark mode, sidebar visible -->

---

## What it does

Student Focus combines the tools a student actually needs during a study session:

- A **Pomodoro timer** that structures work into focused intervals with breaks
- A **task list** that ties directly into the timer so you always know what you're working on
- A **notes panel** for quick thoughts without leaving the app
- **Clock widgets** for ambient display or fullscreen focus mode
- **Stats** to see your consistency over time
- **Theming and font options** so the app feels like yours

---

## Getting started

### Prerequisites

- Node.js 18+
- A Supabase project (for auth and data sync)

### Installation

```bash
git clone https://github.com/your-username/student_focus.git
cd student_focus
npm install
```

Create a `.env.local` file at the root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to use

### Timer

<!-- SCREENSHOT: Timer page — circular timer, mode tabs at top, session dots, active task widget below -->

The timer is the core of the app. It follows the Pomodoro technique: work in focused bursts, then rest.

| Session | Default length |
|---|---|
| Focus | 25 min |
| Short Break | 5 min |
| Long Break | 15 min |

After every 4 focus sessions a long break is suggested automatically.

- **Switch modes** using the Focus / Short Break / Long Break tabs at the top
- **Start or pause** with the large circle button
- **Reset** the current session with the ↺ button (does not switch mode)
- **Add time** — while the timer is running a `+Xm` button appears to extend the session on the fly
- **Session dots** — four dots fill as focus sessions complete and reset each cycle
- **Active task widget** — select a task directly from the timer page; its pomodoro count increments automatically each time a focus session finishes

When a session ends an alert sound plays and a popup appears. Click **Dismiss** to continue to the next session.

---

### Tasks

<!-- SCREENSHOT: Tasks page — mix of active and completed tasks, pomodoro dot indicators visible, one task hovered showing the target and trash icons -->

Keep track of what needs to get done and estimate how many pomodoros each item will take.

- **Add a task** — type in the input at the top and press `Enter` or click `+`. Use the **Est.** dropdown to set a pomodoro estimate
- **Complete** — click the circle on the left to mark a task done; click again to reopen it
- **Set as active** — hover a task and click the target icon (⊙) to make it the active task on the Timer page. Click again to deactivate
- **Pomodoro progress** — each task shows `done / estimated` with filled squares as a visual indicator
- **Filter** — use the **All / Active / Done** tabs to narrow the list
- **Clear done** — click *Clear done* in the footer to remove all completed tasks at once

---

### Notes

<!-- SCREENSHOT: Notes page — two-panel layout, note selected on the left, text visible in the editor, word count in footer -->

A lightweight editor for anything you need to write down mid-session.

- **New note** — click `+` in the sidebar header
- **Edit** — click a note in the list to open it; the title is editable in the top bar and the body below
- **Delete** — click the trash icon in the editor header to remove the current note
- **Word count** — a live word and character count is shown in the footer bar
- On mobile the list and editor are separate views; use the `←` back arrow to return to the list

---

### Clocks

<!-- SCREENSHOT: Clocks page — 6-clock grid with card labels below, one card mid-hover showing the expand icon -->

Six clock styles available as standalone widgets or as a fullscreen ambient display.

| Style | Description |
|---|---|
| Minimal | Clean typographic time display |
| macOS | Ambient screensaver-style glow |
| Analog | Classic precision hand clock |
| Flip | Mechanical flip-digit animation |
| Binary | Time encoded in binary bits |
| Terminal | Phosphor-green retro terminal |

- **Expand** — click any clock card to open it in a full-page overlay
- **Fullscreen** — click *Fullscreen* in the overlay controls to enter native fullscreen
- **Close** — press `Esc` or click *Close*
- Controls auto-hide after 2.5 seconds; move the mouse to bring them back

<!-- SCREENSHOT: A clock in fullscreen — e.g. macOS clock in dark mode, controls visible at the top -->

---

### Stats

<!-- SCREENSHOT: Stats page — stat cards row and both bar charts with real data filled in -->

A summary of your study habits over time.

- **Overview cards** — today's focus sessions, today's focus minutes, all-time session count, all-time focus time, completed tasks, and today's pomodoro count
- **Sessions chart** — bar chart of focus session counts for the last 7 days; today's bar is highlighted in the accent color
- **Minutes chart** — horizontal bar chart of total focus minutes per day for the last 7 days

Data is recorded automatically each time a focus session completes.

---

### Settings

<!-- SCREENSHOT: Settings page — theme grid visible with one theme selected, timer duration controls below -->

Accessible from the gear icon at the bottom of the sidebar.

**Appearance**

- **Themes** — separate pickers for light mode and dark mode; the app detects your OS setting and switches automatically
- **Font** — choose from Inter, JetBrains Mono, Space Grotesk, Geist, Geist Mono, Plus Jakarta Sans, or IBM Plex Mono

**Timer**

| Setting | Description |
|---|---|
| Focus duration | Length of a focus session (1–90 min) |
| Short break | Length of a short break (1–30 min) |
| Long break | Length of a long break (1–60 min) |
| Long break after | Focus sessions before a long break triggers (2–8) |
| Auto-start breaks | Automatically start break timers when focus ends |
| Auto-start pomodoros | Automatically start the next focus session after a break |
| Add minutes amount | How many minutes the `+Xm` button adds while running (1–30) |

**Account**

- Your email is shown in the top-right corner. Click **Sign out** to log out. If a timer is active you will be asked to confirm first.

---

## Navigation

The sidebar on the left gives access to every section. If you try to switch tabs or sign out while a timer is running, a confirmation prompt appears so you don't accidentally interrupt your session.

Click the **?** icon at the very bottom of the sidebar for a quick in-app reference at any time.

---

## Tech stack

- [Next.js](https://nextjs.org/) — React framework
- [Supabase](https://supabase.com/) — authentication and database
- [Zustand](https://zustand-demo.pmnd.rs/) — client state
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Lucide](https://lucide.dev/) — icons
