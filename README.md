xu# GX Resilience Prototype

Chosen case study: Case Study 2, The Youth Resilience Challenge.

This prototype is a mobile-first GXBank feature concept that helps Malaysian tertiary students and fresh graduates turn daily banking into a financial habit-builder. It uses simulated banking data to demonstrate AI nudges, automated savings, debt-risk prevention, savings streaks, rewards, and social accountability.

## How to Run

Open `index.html` in a browser. No installation, build step, API key, or internet connection is required.

## Simple Demo Path

Use only these five steps during judging:

1. Home: say this screen shows whether the student is financially safe today.
2. Click `Check spending`: show that AI detects risky spending before it becomes debt.
3. Click `Save RM36`: show that the app turns advice into an immediate saving action.
4. Go to `Auto Save` and click `Simulate salary day`: show automatic salary saving.
5. Go to `Rewards` and click `Claim progress`: show gamified habit building.

Optional final screen: go to `Friends` and click `Save RM10 with friends` to show social accountability.

For a beginner-friendly explanation, read `QUICK_START.md`.

## Case Study Fit

- Behavioural nudges: spending alerts, safe-to-spend guidance, savings streaks, milestone rewards, and cooling-off prompts.
- AI guidance: spending-pattern scan, context-aware coach messages, and next-best-action queue.
- Automated savings: round-up savings, salary-triggered Emergency Pocket transfers, and impulse-spend cooling rules.
- Gamification: challenge cards, points, streaks, progress bars, and rewards.
- Social accountability: private Resilience Circle with pooled goals and anonymous benchmarks.
- GXBank integration: simulated debit card moments, Goal Pockets, salary split automation, and Debt Shield mode.

## Prototype Scope

The prototype is intentionally front-end only so it is easy to submit and demo during the hackathon. All data is simulated in `app.js`. A production version would connect to GXBank transaction feeds, consent management, notification rails, and secure savings-pocket APIs.

## Files

- `index.html`: app structure and SVG icon sprite.
- `styles.css`: responsive UI and visual system.
- `app.js`: simulated data, scoring logic, AI-style nudges, and interactions.
- `SUBMISSION_NOTES.md`: pitch notes and implementation talking points.
