import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* ------------------------------------------------------------------ */
/*  Preferences                                                         */
/* ------------------------------------------------------------------ */
export async function loadPreferences(userId: string) {
  const { data } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function upsertPreferences(userId: string, prefs: Record<string, unknown>) {
  await supabase
    .from("user_preferences")
    .upsert({ user_id: userId, ...prefs, updated_at: new Date().toISOString() });
}

/* ------------------------------------------------------------------ */
/*  Tasks                                                               */
/* ------------------------------------------------------------------ */
export async function loadTasks(userId: string) {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  return data ?? [];
}

export async function insertTask(userId: string, task: {
  id: string; text: string; done: boolean; pomodoros_estimate: number; pomodoros_done: number; created_at: string;
}) {
  await supabase.from("tasks").insert({ user_id: userId, ...task });
}

export async function updateTask(id: string, patch: Record<string, unknown>) {
  await supabase.from("tasks").update(patch).eq("id", id);
}

export async function deleteTask(id: string) {
  await supabase.from("tasks").delete().eq("id", id);
}

/* ------------------------------------------------------------------ */
/*  Notes                                                               */
/* ------------------------------------------------------------------ */
export async function loadNotes(userId: string) {
  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function insertNote(userId: string, note: {
  id: string; title: string; content: string; updated_at: string;
}) {
  await supabase.from("notes").insert({ user_id: userId, ...note });
}

export async function updateNote(id: string, patch: Record<string, unknown>) {
  await supabase.from("notes").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
}

export async function deleteNote(id: string) {
  await supabase.from("notes").delete().eq("id", id);
}

/* ------------------------------------------------------------------ */
/*  Stats                                                               */
/* ------------------------------------------------------------------ */
export async function loadStats(userId: string) {
  const { data } = await supabase
    .from("focus_stats")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(30);
  return data ?? [];
}

export async function upsertStat(userId: string, stat: {
  date: string;
  focus_sessions: number;
  short_breaks: number;
  long_breaks: number;
  total_focus_minutes: number;
}) {
  await supabase.from("focus_stats").upsert(
    { user_id: userId, ...stat },
    { onConflict: "user_id,date" }
  );
}
