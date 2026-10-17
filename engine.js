// Snooze Math engine - last bell, sliced doze and morning margin honesty.
// Pure clock arithmetic; this page never tells you when to sleep.

function assertPositive(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(label + " must be above zero");
  }
}

function parseClock(text) {
  const m = String(text).trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) {
    throw new Error("use HH:MM, like 6:30");
  }
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) {
    throw new Error("use HH:MM, like 6:30");
  }
  return h * 60 + min;
}

function fmtClock(mins) {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return h + ":" + mm;
}

function tenths(x) {
  return Math.floor(x * 10 + 0.5) / 10;
}

function fixed1(x) {
  return tenths(x).toFixed(1);
}

// The last-bell truth: the alarm you set is not the alarm that wakes you.
function lastBellTruth(alarm, snoozes, snoozeMin) {
  assertPositive(snoozes, "the snooze count");
  assertPositive(snoozeMin, "the snooze length");
  const start = parseClock(alarm);
  const last = start + snoozes * snoozeMin;
  return "The " + fmtClock(start) + " alarm with " + snoozes + " " +
    (snoozes === 1 ? "snooze" : "snoozes") + " of " + snoozeMin + " minutes rings last at " +
    fmtClock(last) + " - the alarm you set is not the alarm that wakes you.";
}

// The slice truth: what the snoozes actually add up to.
function sliceTruth(snoozes, snoozeMin) {
  assertPositive(snoozes, "the snooze count");
  assertPositive(snoozeMin, "the snooze length");
  const total = tenths(snoozes * snoozeMin);
  return snoozes + " " + (snoozes === 1 ? "snooze" : "snoozes") + " of " + snoozeMin +
    " minutes is " + fixed1(total) + " minutes of doze in " + snoozes + " " +
    (snoozes === 1 ? "slice" : "slices") + " - nobody dreams in " + snoozeMin + " minutes.";
}

// The margin truth: how many snoozes the morning actually has room for.
function marginTruth(alarm, door, snoozeMin) {
  assertPositive(snoozeMin, "the snooze length");
  const start = parseClock(alarm);
  const end = parseClock(door);
  if (end <= start) {
    throw new Error("the door time must be after the alarm");
  }
  const margin = end - start;
  const fits = Math.floor(margin / snoozeMin);
  const spare = margin - fits * snoozeMin;
  return "From the " + fmtClock(start) + " alarm to the " + fmtClock(end) + " door there are " +
    margin + " minutes - room for " + fits + " " + (fits === 1 ? "snooze" : "snoozes") +
    " of " + snoozeMin + " with " + spare + " " + (spare === 1 ? "minute" : "minutes") +
    " to spare; snooze number " + (fits + 1) + " eats the door.";
}

if (typeof module !== "undefined") {
  module.exports = { lastBellTruth, sliceTruth, marginTruth, parseClock, fmtClock, tenths, fixed1 };
}
