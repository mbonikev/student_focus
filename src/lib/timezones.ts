export interface Timezone {
  value: string;
  label: string;
  offset: string;
}

export const TIMEZONES: Timezone[] = [
  // Americas
  { value: "America/New_York", label: "New York", offset: "UTC−5/−4" },
  { value: "America/Chicago", label: "Chicago", offset: "UTC−6/−5" },
  { value: "America/Denver", label: "Denver", offset: "UTC−7/−6" },
  { value: "America/Los_Angeles", label: "Los Angeles", offset: "UTC−8/−7" },
  { value: "America/Anchorage", label: "Anchorage", offset: "UTC−9/−8" },
  { value: "Pacific/Honolulu", label: "Honolulu", offset: "UTC−10" },
  { value: "America/Toronto", label: "Toronto", offset: "UTC−5/−4" },
  { value: "America/Vancouver", label: "Vancouver", offset: "UTC−8/−7" },
  { value: "America/Mexico_City", label: "Mexico City", offset: "UTC−6/−5" },
  { value: "America/Bogota", label: "Bogotá", offset: "UTC−5" },
  { value: "America/Lima", label: "Lima", offset: "UTC−5" },
  { value: "America/Santiago", label: "Santiago", offset: "UTC−4/−3" },
  { value: "America/Sao_Paulo", label: "São Paulo", offset: "UTC−3/−2" },
  { value: "America/Buenos_Aires", label: "Buenos Aires", offset: "UTC−3" },
  { value: "America/Caracas", label: "Caracas", offset: "UTC−4" },

  // Europe
  { value: "UTC", label: "UTC", offset: "UTC+0" },
  { value: "Europe/London", label: "London", offset: "UTC+0/+1" },
  { value: "Europe/Dublin", label: "Dublin", offset: "UTC+0/+1" },
  { value: "Europe/Lisbon", label: "Lisbon", offset: "UTC+0/+1" },
  { value: "Europe/Paris", label: "Paris", offset: "UTC+1/+2" },
  { value: "Europe/Berlin", label: "Berlin", offset: "UTC+1/+2" },
  { value: "Europe/Rome", label: "Rome", offset: "UTC+1/+2" },
  { value: "Europe/Madrid", label: "Madrid", offset: "UTC+1/+2" },
  { value: "Europe/Amsterdam", label: "Amsterdam", offset: "UTC+1/+2" },
  { value: "Europe/Brussels", label: "Brussels", offset: "UTC+1/+2" },
  { value: "Europe/Zurich", label: "Zurich", offset: "UTC+1/+2" },
  { value: "Europe/Vienna", label: "Vienna", offset: "UTC+1/+2" },
  { value: "Europe/Warsaw", label: "Warsaw", offset: "UTC+1/+2" },
  { value: "Europe/Prague", label: "Prague", offset: "UTC+1/+2" },
  { value: "Europe/Stockholm", label: "Stockholm", offset: "UTC+1/+2" },
  { value: "Europe/Oslo", label: "Oslo", offset: "UTC+1/+2" },
  { value: "Europe/Copenhagen", label: "Copenhagen", offset: "UTC+1/+2" },
  { value: "Europe/Helsinki", label: "Helsinki", offset: "UTC+2/+3" },
  { value: "Europe/Athens", label: "Athens", offset: "UTC+2/+3" },
  { value: "Europe/Bucharest", label: "Bucharest", offset: "UTC+2/+3" },
  { value: "Europe/Kiev", label: "Kyiv", offset: "UTC+2/+3" },
  { value: "Europe/Istanbul", label: "Istanbul", offset: "UTC+3" },
  { value: "Europe/Moscow", label: "Moscow", offset: "UTC+3" },

  // Africa
  { value: "Africa/Cairo", label: "Cairo", offset: "UTC+2" },
  { value: "Africa/Johannesburg", label: "Johannesburg", offset: "UTC+2" },
  { value: "Africa/Lagos", label: "Lagos", offset: "UTC+1" },
  { value: "Africa/Nairobi", label: "Nairobi", offset: "UTC+3" },
  { value: "Africa/Casablanca", label: "Casablanca", offset: "UTC+1" },

  // Asia
  { value: "Asia/Dubai", label: "Dubai", offset: "UTC+4" },
  { value: "Asia/Riyadh", label: "Riyadh", offset: "UTC+3" },
  { value: "Asia/Tehran", label: "Tehran", offset: "UTC+3:30" },
  { value: "Asia/Karachi", label: "Karachi", offset: "UTC+5" },
  { value: "Asia/Kolkata", label: "Mumbai / Delhi", offset: "UTC+5:30" },
  { value: "Asia/Dhaka", label: "Dhaka", offset: "UTC+6" },
  { value: "Asia/Yangon", label: "Yangon", offset: "UTC+6:30" },
  { value: "Asia/Bangkok", label: "Bangkok", offset: "UTC+7" },
  { value: "Asia/Jakarta", label: "Jakarta", offset: "UTC+7" },
  { value: "Asia/Singapore", label: "Singapore", offset: "UTC+8" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur", offset: "UTC+8" },
  { value: "Asia/Shanghai", label: "Shanghai / Beijing", offset: "UTC+8" },
  { value: "Asia/Hong_Kong", label: "Hong Kong", offset: "UTC+8" },
  { value: "Asia/Taipei", label: "Taipei", offset: "UTC+8" },
  { value: "Asia/Seoul", label: "Seoul", offset: "UTC+9" },
  { value: "Asia/Tokyo", label: "Tokyo", offset: "UTC+9" },

  // Oceania
  { value: "Australia/Perth", label: "Perth", offset: "UTC+8" },
  { value: "Australia/Darwin", label: "Darwin", offset: "UTC+9:30" },
  { value: "Australia/Brisbane", label: "Brisbane", offset: "UTC+10" },
  { value: "Australia/Sydney", label: "Sydney", offset: "UTC+10/+11" },
  { value: "Australia/Melbourne", label: "Melbourne", offset: "UTC+10/+11" },
  { value: "Pacific/Auckland", label: "Auckland", offset: "UTC+12/+13" },
  { value: "Pacific/Fiji", label: "Fiji", offset: "UTC+12" },
];

export function getTimezoneLabel(value: string): string {
  const tz = TIMEZONES.find((t) => t.value === value);
  if (tz) return tz.label;
  // Fallback: extract city name from IANA string
  const parts = value.split("/");
  return parts[parts.length - 1].replace(/_/g, " ");
}
