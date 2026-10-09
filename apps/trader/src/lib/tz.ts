/**
 * Wall-clock helpers for real time zones (Intl, so daylight saving is always right), used by the trading-day
 * schedule and the options-cut countdown.
 */

/** Offset of `tz` from UTC at instant `t`, in minutes (east positive). */
export function tzOffset(t: number, tz: string): number {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const p = Object.fromEntries(f.formatToParts(new Date(t)).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  return Math.round((asUtc - Math.floor(t / 1000) * 1000) / 60000);
}

/** The UTC instant of wall-clock `hh:mm` on `ymd` (YYYY-MM-DD) in `tz`. */
export function zoned(ymd: string, hhmm: string, tz: string): number {
  const [y, m, d] = ymd.split('-').map(Number);
  const [hh, mm] = hhmm.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let t = guess - tzOffset(guess, tz) * 60000;
  t = guess - tzOffset(t, tz) * 60000;
  return t;
}

/** YYYY-MM-DD of instant `t` in `tz`. */
export function ymdIn(t: number, tz: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
}

/** "HH:MM" of instant `t` in `tz` (or the visitor's zone when tz is undefined). */
export function hhmmIn(t: number, tz?: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(t));
}

/** Day of week (0 = Sunday) of instant `t` in `tz`. */
export function dowIn(t: number, tz: string): number {
  const w = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(new Date(t));
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(w);
}

export const NY = 'America/New_York';

/** The next options cut: 10:00 New York on a weekday, after `now`. */
export function nextOptionsCut(now: number): number {
  let ymd = ymdIn(now, NY);
  for (let i = 0; i < 9; i++) {
    const t = zoned(ymd, '10:00', NY);
    const dow = dowIn(t, NY);
    if (t > now && dow >= 1 && dow <= 5) return t;
    // next calendar day in New York
    ymd = ymdIn(zoned(ymd, '12:00', NY) + 24 * 3600 * 1000, NY);
  }
  return now + 24 * 3600 * 1000;
}

/* ───────────── calendar files (RFC 5545) */

const VTZ: Record<string, string> = {
  'America/New_York':
    'BEGIN:VTIMEZONE\r\nTZID:America/New_York\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
  'Europe/London':
    'BEGIN:VTIMEZONE\r\nTZID:Europe/London\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
  'Asia/Tokyo':
    'BEGIN:VTIMEZONE\r\nTZID:Asia/Tokyo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:JST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
};

export type CalEvent = { uid: string; title: string; ymd: string; start: string; end: string; tz: string; days?: string; description?: string };

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const fold = (l: string) => (l.length <= 74 ? l : l.match(/.{1,73}/g)!.join('\r\n '));
const stamp = (t: number) => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** A calendar file with weekly-recurring events in their own time zones. */
export function buildIcs(events: CalEvent[]): string {
  const zones = Array.from(new Set(events.map((e) => e.tz)));
  const now = stamp(Date.now());
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kalks//Trading day//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  for (const z of zones) if (VTZ[z]) lines.push(VTZ[z]);
  for (const e of events) {
    const d = e.ymd.replace(/-/g, '');
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.uid}@kalkstrade.com`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=${e.tz}:${d}T${e.start.replace(':', '')}00`,
      `DTEND;TZID=${e.tz}:${d}T${e.end.replace(':', '')}00`,
      ...(e.days ? [`RRULE:FREQ=WEEKLY;BYDAY=${e.days}`] : []),
      fold(`SUMMARY:${esc(e.title)}`),
      ...(e.description ? [fold(`DESCRIPTION:${esc(e.description)}`)] : []),
      'END:VEVENT',
    );
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

export function downloadText(name: string, text: string, type = 'text/calendar;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
