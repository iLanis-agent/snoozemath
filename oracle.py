import json, math, re

def parse_clock(text):
    m = re.match(r"^(\d{1,2}):(\d{2})$", text.strip())
    if not m:
        raise ValueError("use HH:MM, like 6:30")
    h, mn = int(m.group(1)), int(m.group(2))
    if h > 23 or mn > 59:
        raise ValueError("use HH:MM, like 6:30")
    return h * 60 + mn

def fmt_clock(mins):
    m = mins % 1440
    return f"{m // 60}:{m % 60:02d}"

def tenths(x):
    return math.floor(x * 10 + 0.5) / 10

def fixed1(x):
    return f"{tenths(x):.1f}"

def last_bell(alarm, n, snooze):
    start = parse_clock(alarm)
    last = start + n * snooze
    word = "snooze" if n == 1 else "snoozes"
    return (f"The {fmt_clock(start)} alarm with {n} {word} of {snooze} minutes rings last at "
            f"{fmt_clock(last)} - the alarm you set is not the alarm that wakes you.")

def slice_truth(n, snooze):
    total = tenths(n * snooze)
    word = "snooze" if n == 1 else "snoozes"
    sl = "slice" if n == 1 else "slices"
    return (f"{n} {word} of {snooze} minutes is {fixed1(total)} minutes of doze in {n} {sl} - "
            f"nobody dreams in {snooze} minutes.")

def margin_truth(alarm, door, snooze):
    start = parse_clock(alarm)
    end = parse_clock(door)
    if end <= start:
        raise ValueError("the door time must be after the alarm")
    margin = end - start
    fits = margin // snooze
    spare = margin - fits * snooze
    fw = "snooze" if fits == 1 else "snoozes"
    sw = "minute" if spare == 1 else "minutes"
    return (f"From the {fmt_clock(start)} alarm to the {fmt_clock(end)} door there are "
            f"{margin} minutes - room for {fits} {fw} of {snooze} with {spare} {sw} to "
            f"spare; snooze number {fits + 1} eats the door.")

cases = []
for a, n, s in [("6:30", 3, 9), ("7:00", 1, 10), ("5:45", 4, 9), ("6:15", 2, 5)]:
    cases.append({"fn": "lastBellTruth", "args": [a, n, s], "expected": last_bell(a, n, s)})
for n, s in [(3, 9), (1, 10), (5, 9), (2, 15)]:
    cases.append({"fn": "sliceTruth", "args": [n, s], "expected": slice_truth(n, s)})
for a, d, s in [("6:30", "7:45", 9), ("7:00", "8:00", 10), ("6:00", "6:20", 9), ("5:30", "7:30", 12)]:
    cases.append({"fn": "marginTruth", "args": [a, d, s], "expected": margin_truth(a, d, s)})

with open("expected.json", "w") as f:
    json.dump(cases, f, indent=2)
    f.write("\n")
print(len(cases), "cases written")
