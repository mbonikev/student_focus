import { useEffect, useRef, useCallback } from "react";
import { create } from "zustand";
import { useAppStore } from "@/store/app-store";

type TimerMode = "focus" | "short" | "long";

interface TimerState {
  mode: TimerMode;
  running: boolean;
  secondsLeft: number;
  sessionCount: number;
  setMode: (m: TimerMode) => void;
  setRunning: (r: boolean) => void;
  setSecondsLeft: (s: number) => void;
  tick: () => void;
  incrementSession: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  mode: "focus",
  running: false,
  secondsLeft: 25 * 60,
  sessionCount: 0,
  setMode: (mode) => set({ mode }),
  setRunning: (running) => set({ running }),
  setSecondsLeft: (secondsLeft) => set({ secondsLeft }),
  tick: () => set((s) => ({ secondsLeft: Math.max(0, s.secondsLeft - 1) })),
  incrementSession: () => set((s) => ({ sessionCount: s.sessionCount + 1 })),
}));

export function useTimer() {
  const {
    mode,
    running,
    secondsLeft,
    sessionCount,
    setMode,
    setRunning,
    setSecondsLeft,
    tick,
    incrementSession,
  } = useTimerStore();

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    recordSession,
    incrementTaskPomodoro,
    incrementDailyPomodoros,
    activeTaskId,
  } = useAppStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getDuration = useCallback(
    (m: TimerMode) => {
      if (m === "focus") return focusDuration;
      if (m === "short") return shortBreakDuration;
      return longBreakDuration;
    },
    [focusDuration, shortBreakDuration, longBreakDuration]
  );

  /* Reset when mode changes */
  const switchMode = useCallback(
    (m: TimerMode) => {
      setMode(m);
      setRunning(false);
      setSecondsLeft(getDuration(m));
    },
    [setMode, setRunning, setSecondsLeft, getDuration]
  );

  /* Handle session completion */
  const onComplete = useCallback(() => {
    setRunning(false);

    if (mode === "focus") {
      const mins = Math.floor(focusDuration / 60);
      recordSession("focus", mins);
      incrementSession();
      incrementDailyPomodoros();
      if (activeTaskId) incrementTaskPomodoro(activeTaskId);

      const nextSession = sessionCount + 1;
      const nextMode =
        nextSession % longBreakInterval === 0 ? "long" : "short";

      if (autoStartBreaks) {
        setMode(nextMode);
        setSecondsLeft(getDuration(nextMode));
        setRunning(true);
      } else {
        switchMode(nextMode);
      }
    } else {
      const type = mode === "short" ? "short" : "long";
      recordSession(type, Math.floor(getDuration(mode) / 60));

      if (autoStartPomodoros) {
        setMode("focus");
        setSecondsLeft(focusDuration);
        setRunning(true);
      } else {
        switchMode("focus");
      }
    }
  }, [
    mode,
    sessionCount,
    focusDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    activeTaskId,
    recordSession,
    incrementSession,
    incrementDailyPomodoros,
    incrementTaskPomodoro,
    getDuration,
    setMode,
    setRunning,
    setSecondsLeft,
    switchMode,
  ]);

  /* Tick interval */
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        const store = useTimerStore.getState();
        if (store.secondsLeft <= 1) {
          clearInterval(intervalRef.current!);
          onComplete();
        } else {
          tick();
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onComplete, tick]);

  const toggle = () => setRunning(!running);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(getDuration(mode));
  };

  return {
    mode,
    running,
    secondsLeft,
    sessionCount,
    switchMode,
    toggle,
    reset,
    getDuration,
  };
}
