# Snooze Math

Alarm honesty. The alarm you set is not the alarm that wakes you. Snooze Math counts the last bell, totals the sliced doze, and checks how many snoozes the morning actually has room for.

## What it computes

- **The last-bell truth** - alarm time plus snoozes times snooze length: the clock time of the bell that actually wakes you.
- **The slice truth** - snoozes times length: the doze you bought, in slices.
- **The margin truth** - alarm to out-the-door minutes, divided by snooze length: how many fit and which one eats the door.

## Boundary

Clock arithmetic only. Snooze Math never tells you when to sleep or how much sleep you need.

## Files

- `index.html` - landing page with the honesty pitch and the boundary.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic, shared by the app and the tests.
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json` (12 cases).
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/snoozemath/
Repo: https://github.com/iLanis-agent/snoozemath
