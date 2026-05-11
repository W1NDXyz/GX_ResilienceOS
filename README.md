## GX Resilience Prototype

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


#
#
#

# Future Vision: Financial HabitOS

GX Resilience is designed as the first prototype layer of a larger behavioural-finance ecosystem called Financial HabitOS.

The long-term vision is to transform digital banking from a passive transaction viewer into an intelligent behavioural support system that helps users build financial resilience automatically over time.

Instead of only showing spending history after money is gone, Financial HabitOS aims to help users make healthier financial decisions before financial stress and debt occur.

## Planned Future Directions
- Predictive financial stress detection using behavioural patterns
- Adaptive AI coaching based on user habits and spending behaviour
- Automated resilience systems such as emergency-pocket transfers and impulse-spending cooldowns
- Behaviour-based financial scoring focused on consistency and resilience rather than only account balance
- Social accountability systems with private group savings and habit challenges
- Real-time AI intervention during risky spending moments
  
## Long-Term Goal

Our goal is to make healthy financial behaviour feel natural, timely, and automatic for students and young adults — reducing dependence on willpower alone.

GX Resilience represents the first prototype step toward that vision.
