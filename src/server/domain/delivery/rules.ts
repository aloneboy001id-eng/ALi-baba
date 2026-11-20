export type DeliveryRule = {
  dayOfWeek: number;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
};

function toMinutes(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;

  return hours * 60 + minutes;
}

export function isWithinOpeningHours(rule: DeliveryRule, time: string): boolean {
  if (rule.isClosed) return false;

  const opensAt = toMinutes(rule.opensAt);
  const closesAt = toMinutes(rule.closesAt);
  const currentTime = toMinutes(time);
  if (opensAt === null || closesAt === null || currentTime === null) return false;

  if (opensAt === closesAt) return true;
  if (opensAt < closesAt) return currentTime >= opensAt && currentTime <= closesAt;

  return currentTime >= opensAt || currentTime <= closesAt;
}

export function meetsMinimumOrder(subtotalMinor: number, minimumOrderMinor: number): boolean {
  return (
    Number.isInteger(subtotalMinor) &&
    Number.isInteger(minimumOrderMinor) &&
    subtotalMinor >= 0 &&
    minimumOrderMinor >= 0 &&
    subtotalMinor >= minimumOrderMinor
  );
}
