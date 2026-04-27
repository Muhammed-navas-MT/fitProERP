export const DEFAULT_TIME_ZONE = "Asia/Kolkata";

export function getDatePartsByTimeZone(
  date: Date = new Date(),
  timeZone: string = DEFAULT_TIME_ZONE,
) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function isPastSlot(
  slotDate: string,
  startTime: string,
  timeZone: string = DEFAULT_TIME_ZONE,
): boolean {
  const now = getDatePartsByTimeZone(new Date(), timeZone);

  if (slotDate < now.date) return true;
  if (slotDate > now.date) return false;

  return startTime <= now.time;
}
