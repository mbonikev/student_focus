import { useEffect, useRef, useCallback } from "react";
import { create } from "zustand";
import { useAppStore } from "@/store/app-store";

type TimerMode = "focus" | "short" | "long";

interface TimerState {
  mode: TimerMode;
  running: boolean;
  secondsLeft: number;
  sessionCount: number;
  alertVisible: boolean;
  pendingNextMode: TimerMode | null;
  pendingAutoStart: boolean;
  setMode: (m: TimerMode) => void;
  setRunning: (r: boolean) => void;
  setSecondsLeft: (s: number) => void;
  tick: () => void;
  incrementSession: () => void;
  setAlert: (visible: boolean, nextMode?: TimerMode, autoStart?: boolean) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  mode: "focus",
  running: false,
  secondsLeft: 25 * 60,
  sessionCount: 0,
  alertVisible: false,
  pendingNextMode: null,
  pendingAutoStart: false,
  setMode: (mode) => set({ mode }),
  setRunning: (running) => set({ running }),
  setSecondsLeft: (secondsLeft) => set({ secondsLeft }),
  tick: () => set((s) => ({ secondsLeft: Math.max(0, s.secondsLeft - 1) })),
  incrementSession: () => set((s) => ({ sessionCount: s.sessionCount + 1 })),
  setAlert: (visible, nextMode, autoStart) =>
    set({
      alertVisible: visible,
      pendingNextMode: nextMode ?? null,
      pendingAutoStart: autoStart ?? false,
    }),
}));

export function useTimer() {
  const {
    mode,
    running,
    secondsLeft,
    sessionCount,
    alertVisible,
    setMode,
    setRunning,
    setSecondsLeft,
    tick,
    incrementSession,
    setAlert,
  } = useTimerStore();

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    addMinutesDuration,
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

      setAlert(true, nextMode, autoStartBreaks);
    } else {
      const type = mode === "short" ? "short" : "long";
      recordSession(type, Math.floor(getDuration(mode) / 60));

      setAlert(true, "focus", autoStartPomodoros);
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
    setRunning,
    setAlert,
  ]);

  /* Dismiss the alert and transition to the pending mode */
  const dismissAlert = useCallback(() => {
    const { pendingNextMode, pendingAutoStart } = useTimerStore.getState();
    setAlert(false);
    if (!pendingNextMode) return;
    setMode(pendingNextMode);
    setSecondsLeft(getDuration(pendingNextMode));
    if (pendingAutoStart) {
      setRunning(true);
    }
  }, [setAlert, setMode, setSecondsLeft, setRunning, getDuration]);

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
  const addMinutes = () =>
    setSecondsLeft(useTimerStore.getState().secondsLeft + addMinutesDuration * 60);

  return {
    mode,
    running,
    secondsLeft,
    sessionCount,
    alertVisible,
    addMinutesDuration,
    switchMode,
    dismissAlert,
    addMinutes,
    toggle,
    reset,
    getDuration,
  };
}
