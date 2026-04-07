"use client";

import { useState, useEffect } from "react";
import { getTimezoneLabel } from "@/lib/timezones";

export interface ClockData {
  hours: string;
  minutes: string;
  seconds: string;
  hours12: string;
  ampm: "AM" | "PM";
  day: string;
  date: string;
  month: string;
  year: string;
  timezoneLabel: string;
}

const PLACEHOLDER: ClockData = {
  hours: "00",
  minutes: "00",
  seconds: "00",
  hours12: "12",
  ampm: "AM",
  day: "",
  date: "",
  month: "",
  year: "",
  timezoneLabel: "",
};

export function useClockTime(timezone: string): ClockData {
  const [data, setData] = useState<ClockData>(PLACEHOLDER);

  useEffect(() => {
    setData(getTick(timezone));
    const id = setInterval(() => setData(getTick(timezone)), 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return data;
}

function getTick(timezone: string): ClockData {
  const now = new Date();

  // Validate timezone, fall back to local if invalid
  let tz = timezone;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
  } catch {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const parts24 = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(now);

  const parts12 = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const p24: Record<string, string> = {};
  parts24.forEach((p) => { p24[p.type] = p.value; });

  const p12: Record<string, string> = {};
  parts12.forEach((p) => { p12[p.type] = p.value; });

  return {
    hours: (p24.hour ?? "00").padStart(2, "0"),
    minutes: (p24.minute ?? "00").padStart(2, "0"),
    seconds: (p24.second ?? "00").padStart(2, "0"),
    hours12: (p12.hour ?? "12").padStart(2, "0"),
    ampm: ((p12.dayPeriod ?? "AM").toUpperCase().startsWith("P") ? "PM" : "AM") as "AM" | "PM",
    day: p24.weekday ?? "",
    date: p24.day ?? "",
    month: p24.month ?? "",
    year: p24.year ?? "",
    timezoneLabel: getTimezoneLabel(tz),
  };
}
