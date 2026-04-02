"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";
import {
  loadPreferences,
  upsertPreferences,
  loadTasks,
  loadNotes,
  loadStats,
} from "@/lib/db";
import type { ThemeId, FontId } from "@/lib/themes";
import type { Task, Note, PomodoroStats } from "@/store/app-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const store = useAppStore();
  const hydrated = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    const hydrateFromDB = async (userId: string) => {
      if (hydrated.current) return;
      hydrated.current = true;

      const [prefs, tasks, notes, stats] = await Promise.all([
        loadPreferences(userId),
        loadTasks(userId),
        loadNotes(userId),
        loadStats(userId),
      ]);

      if (prefs) {
        store.setLightTheme((prefs.light_theme_id as ThemeId) ?? "light-default");
        store.setDarkTheme((prefs.dark_theme_id as ThemeId) ?? "dark-default");
        store.setFontId((prefs.font_id as FontId) ?? "inter");
        store.setTimerSettings({
          focusDuration: prefs.focus_duration,
          shortBreakDuration: prefs.short_break_duration,
          longBreakDuration: prefs.long_break_duration,
          longBreakInterval: prefs.long_break_interval,
          autoStartBreaks: prefs.auto_start_breaks,
          autoStartPomodoros: prefs.auto_start_pomodoros,
        });
        if (prefs.ambient_sound !== undefined) store.setAmbientSound(prefs.ambient_sound);
        if (prefs.sound_volume !== undefined) store.setSoundVolume(Number(prefs.sound_volume));
      } else {
        // First login — create default preferences row
        await upsertPreferences(userId, {
          light_theme_id: store.lightThemeId,
          dark_theme_id: store.darkThemeId,
          font_id: store.fontId,
          focus_duration: store.focusDuration,
          short_break_duration: store.shortBreakDuration,
          long_break_duration: store.longBreakDuration,
          long_break_interval: store.longBreakInterval,
          auto_start_breaks: store.autoStartBreaks,
          auto_start_pomodoros: store.autoStartPomodoros,
        });
      }

      if (tasks.length > 0) {
        store.setTasks(
          tasks.map((t: Record<string, unknown>) => ({
            id: t.id as string,
            text: t.text as string,
            done: t.done as boolean,
            createdAt: new Date(t.created_at as string).getTime(),
            pomodorosEstimate: t.pomodoros_estimate as number,
            pomodorosDone: t.pomodoros_done as number,
          })) as Task[]
        );
      }

      if (notes.length > 0) {
        store.setNotes(
          notes.map((n: Record<string, unknown>) => ({
            id: n.id as string,
            title: n.title as string,
            content: n.content as string,
            updatedAt: new Date(n.updated_at as string).getTime(),
          })) as Note[]
        );
      }

      if (stats.length > 0) {
        store.setStats(
          stats.map((s: Record<string, unknown>) => ({
            date: s.date as string,
            focusSessions: s.focus_sessions as number,
            shortBreaks: s.short_breaks as number,
            longBreaks: s.long_breaks as number,
            totalFocusMinutes: s.total_focus_minutes as number,
          })) as PomodoroStats[]
        );
      }
    };

    // Initial session check
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        store.setUser(user.id, user.email ?? null);
        hydrateFromDB(user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        store.setUser(session.user.id, session.user.email ?? null);
        if (event === "SIGNED_IN") {
          hydrated.current = false;
          hydrateFromDB(session.user.id);
        }
      } else {
        store.setUser(null, null);
        hydrated.current = false;
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
