const currency = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});

const profiles = {
  student: {
    label: "UTM final-year student",
    income: 1200,
    balance: 540,
    fixedCost: 690,
    safeFloor: 20,
    categories: [
      { name: "Food", spent: 238, safe: 205 },
      { name: "Transport", spent: 74, safe: 96 },
      { name: "Shopping", spent: 146, safe: 88 },
      { name: "Bills", spent: 182, safe: 190 },
      { name: "Study", spent: 64, safe: 90 },
    ],
  },
  graduate: {
    label: "First-year analyst",
    income: 3200,
    balance: 1280,
    fixedCost: 1750,
    safeFloor: 45,
    categories: [
      { name: "Food", spent: 410, safe: 390 },
      { name: "Transport", spent: 260, safe: 320 },
      { name: "Shopping", spent: 420, safe: 280 },
      { name: "Bills", spent: 780, safe: 820 },
      { name: "Family", spent: 220, safe: 240 },
    ],
  },
};

const state = {
  profile: "student",
  income: profiles.student.income,
  balance: profiles.student.balance,
  savings: 720,
  debt: 180,
  streak: 12,
  points: 420,
  roundUp: true,
  cooling: true,
  split: 8,
  alerts: 3,
  circleSaved: 1860,
  activeTopic: "food",
};

const coachCopy = {
  food: {
    kicker: "Aina, your cash flow can recover this week.",
    body: "Move RM 36 from two food delivery swaps into Goal Pocket tonight. It protects your streak and keeps your weekend safe-to-spend above RM 20.",
  },
  transport: {
    kicker: "Transport is under control.",
    body: "You are RM 22 below your usual transport line. Keep the buffer in Wallet until Friday, then sweep any leftover into Emergency Pocket.",
  },
  shopping: {
    kicker: "Debt Shield sees a BNPL risk.",
    body: "Your shopping spend is above the peer-safe range. Put purchases above RM 80 into a 12-hour cooling window and save RM 15 immediately.",
  },
  income: {
    kicker: "Payday can do the hard part.",
    body: "An 8% split moves money before it feels available. At your current income, the Emergency Pocket receives RM 96 on payday.",
  },
};

const transactions = [
  {
    merchant: "Mamak Corner",
    category: "Food",
    amount: 18,
    detail: "Normal spend. Round-up can save RM 2.",
    action: "Save RM2",
    type: "roundup",
  },
  {
    merchant: "Food delivery",
    category: "Food",
    amount: 42,
    detail: "Third delivery this week. Swap one order for a RM 12 save.",
    action: "Save RM36",
    type: "save-diff",
  },
  {
    merchant: "Fashion BNPL",
    category: "Shopping",
    amount: 96,
    detail: "Debt Shield flags this as impulse risk.",
    action: "Pause purchase",
    type: "cooloff",
  },
  {
    merchant: "Bookstore",
    category: "Study",
    amount: 32,
    detail: "Study spend is within plan.",
    action: "Keep plan",
    type: "keep",
  },
];

const challenges = [
  {
    id: "canteen",
    title: "Campus Canteen Week",
    detail: "Choose two lower-cost meals and save the difference.",
    progress: 66,
    reward: "+80 points",
    tone: "tone-green",
  },
  {
    id: "buffer",
    title: "RM 50 Buffer Sprint",
    detail: "Move small leftovers into Emergency Pocket before Sunday.",
    progress: 38,
    reward: "GX fee waiver badge",
    tone: "tone-blue",
  },
  {
    id: "bnpl",
    title: "BNPL Pause",
    detail: "Hold discretionary purchases for 12 hours before checkout.",
    progress: 20,
    reward: "+120 points",
    tone: "tone-coral",
  },
];

const viewTitles = {
  dashboard: "Financial resilience dashboard",
  coach: "AI spending coach",
  autosave: "Auto Save rules",
  challenges: "Rewards and habits",
  community: "Friends saving circle",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function profile() {
  return profiles[state.profile];
}

function formatMYR(value) {
  return currency.format(Math.round(value)).replace("MYR", "RM");
}

function calculateScore() {
  const activeProfile = profile();
  const savingsRatio = Math.min(state.savings / 4000, 1) * 28;
  const cashRatio = Math.min(state.balance / Math.max(activeProfile.fixedCost, 1), 1) * 18;
  const automationBonus = (state.roundUp ? 7 : 0) + (state.cooling ? 7 : 0) + state.split * 0.5;
  const debtPenalty = Math.min(state.debt / Math.max(state.income, 1), 0.4) * 40;
  const streakBonus = Math.min(state.streak, 21) * 0.65;
  return Math.max(18, Math.min(96, Math.round(35 + savingsRatio + cashRatio + automationBonus + streakBonus - debtPenalty)));
}

function riskLabel() {
  const riskRatio = state.debt / Math.max(state.income, 1);
  const discretionaryOverrun = profile().categories
    .filter((item) => ["Food", "Shopping"].includes(item.name))
    .reduce((total, item) => total + Math.max(item.spent - item.safe, 0), 0);
  if (riskRatio > 0.18 || discretionaryOverrun > 120) return "High";
  if (riskRatio > 0.07 || discretionaryOverrun > 40) return "Medium";
  return "Low";
}

function safeSpend() {
  const daysLeft = 9;
  const plannedSavings = state.income * (state.split / 100);
  const cashAfterNeeds = state.balance - profile().fixedCost * 0.25 - plannedSavings * 0.25;
  return Math.max(profile().safeFloor, Math.round(cashAfterNeeds / daysLeft));
}

function projection() {
  const roundUpAmount = state.roundUp ? 130 : 0;
  const coolingAmount = state.cooling ? 90 : 0;
  const splitAmount = state.income * (state.split / 100) * 3;
  return Math.round(state.savings + roundUpAmount + coolingAmount + splitAmount);
}

function scoreStatus(score) {
  if (score >= 80) return "Resilient";
  if (score >= 62) return "Recovering";
  if (score >= 45) return "At risk";
  return "Urgent";
}

function renderShell() {
  const score = calculateScore();
  $("[data-score]").textContent = score;
  $("[data-score-status]").textContent = scoreStatus(score);
  $("[data-score-ring]").style.background = `conic-gradient(var(--green) ${score * 3.6}deg, #e8eee9 0)`;
  $("[data-alert-count]").textContent = state.alerts;

  const primary = riskLabel() === "High"
    ? "BNPL and shopping are trending above your safe range. Cooling-off is recommended."
    : "Food delivery is slightly above plan. One swap can keep your weekend safe-to-spend healthy.";
  $("[data-primary-nudge]").textContent = primary;
}

function renderDashboard() {
  const activeProfile = profile();
  $("[data-income-label]").textContent = formatMYR(state.income);
  $("[data-balance-label]").textContent = formatMYR(state.balance);
  $("[data-safe-spend]").textContent = formatMYR(safeSpend());
  $("[data-safe-note]").textContent = `Based on ${formatMYR(activeProfile.fixedCost)} fixed monthly needs`;
  $("[data-buffer]").textContent = `${Math.round((state.savings / 4000) * 100)}%`;
  $("[data-buffer-note]").textContent = `${formatMYR(state.savings)} of RM 4,000 target`;
  $("[data-risk]").textContent = riskLabel();
  $("[data-risk-note]").textContent = `BNPL exposure ${formatMYR(state.debt)}`;
  $("[data-streak]").textContent = `${state.streak} days`;

  renderSpendBars();
  renderNudges();
}

function renderSpendBars() {
  const maxSpend = Math.max(...profile().categories.map((item) => item.spent), 1);
  $("[data-spend-bars]").innerHTML = profile().categories
    .map((item) => {
      const width = Math.max(9, Math.round((item.spent / maxSpend) * 100));
      const warning = item.spent > item.safe ? "warning" : "";
      return `
        <div class="spend-row">
          <span>${item.name}</span>
          <div class="bar-track ${warning}" aria-label="${item.name} ${formatMYR(item.spent)} spent">
            <span style="width:${width}%"></span>
          </div>
          <strong>${formatMYR(item.spent)}</strong>
        </div>
      `;
    })
    .join("");
}

function currentNudges() {
  const category = profile().categories.find((item) => item.name === "Shopping");
  const food = profile().categories.find((item) => item.name === "Food");
  return [
    {
      title: "Save the difference tonight",
      body: `Shift ${formatMYR(Math.max(food.spent - food.safe, 22))} into Goal Pocket after one lower-cost meal swap.`,
      action: "Save RM36",
      type: "save-diff",
    },
    {
      title: "Activate cooling window",
      body: `Shopping is ${formatMYR(Math.max(category.spent - category.safe, 0))} above plan. Delay new discretionary card spends above RM 80.`,
      action: "Pause big spends",
      type: "cooloff",
    },
    {
      title: "Protect payday first",
      body: `${state.split}% salary split builds ${formatMYR(state.income * (state.split / 100))} before daily spending starts.`,
      action: "Simulate salary",
      type: "payday",
    },
  ];
}

function renderNudges() {
  $("[data-nudge-list]").innerHTML = currentNudges()
    .map(
      (nudge) => `
        <article class="nudge-item">
          <strong>${nudge.title}</strong>
          <p>${nudge.body}</p>
          <button type="button" data-nudge-type="${nudge.type}">${nudge.action}</button>
        </article>
      `,
    )
    .join("");
}

function renderCoach() {
  const copy = coachCopy[state.activeTopic];
  $("[data-coach-message]").innerHTML = `
    <p class="coach-kicker">${copy.kicker}</p>
    <p>${copy.body}</p>
  `;

  $$("[data-coach-topic]").forEach((button) => {
    button.classList.toggle("active", button.dataset.coachTopic === state.activeTopic);
  });

  $("[data-transactions]").innerHTML = transactions
    .map(
      (transaction) => `
        <article class="transaction-item">
          <div>
            <strong>${transaction.merchant}</strong>
            <span class="muted">${transaction.category}</span>
          </div>
          <span class="transaction-amount">${formatMYR(transaction.amount)}</span>
          <p>${transaction.detail}</p>
          <button type="button" data-transaction-action="${transaction.type}">${transaction.action}</button>
        </article>
      `,
    )
    .join("");
}

function renderAutosave() {
  $("[data-split-label]").textContent = `${state.split}%`;
  const projected = projection();
  const added = projected - state.savings;
  $("[data-projection-total]").textContent = formatMYR(projected);
  $("[data-projection-note]").textContent = `Round-ups plus payday split can add ${formatMYR(added)} in 90 days.`;
  $("[data-projection-bar]").style.height = `${Math.min(96, Math.max(12, (projected / 4000) * 100))}%`;
  $("[data-automation-summary]").innerHTML = `
    <div class="automation-item"><strong>Round-up estimate</strong><span>${state.roundUp ? "RM 130 in 90 days" : "Paused"}</span></div>
    <div class="automation-item"><strong>Cooling-off impact</strong><span>${state.cooling ? "Expected RM 90 avoided impulse spend" : "Paused"}</span></div>
    <div class="automation-item"><strong>Payday transfer</strong><span>${formatMYR(state.income * (state.split / 100))} per month</span></div>
  `;
  const roundup = $("[data-toggle='roundup']");
  const cooling = $("[data-toggle='cooling']");
  if (roundup) roundup.checked = state.roundUp;
  if (cooling) cooling.checked = state.cooling;
}

function renderChallenges() {
  $("[data-challenges]").innerHTML = challenges
    .map(
      (challenge) => `
        <article class="challenge-card">
          <div class="card-icon ${challenge.tone}"><svg><use href="#icon-trophy"></use></svg></div>
          <div>
            <h3>${challenge.title}</h3>
            <p>${challenge.detail}</p>
          </div>
          <div class="challenge-progress" aria-label="${challenge.progress}% complete">
            <span style="width:${challenge.progress}%"></span>
          </div>
          <strong>${challenge.reward}</strong>
          <button type="button" data-complete-challenge="${challenge.id}">Claim progress</button>
        </article>
      `,
    )
    .join("");
}

function renderCommunity() {
  const circleProgress = Math.min(100, Math.round((state.circleSaved / 3000) * 100));
  const progress = $(".circle-progress span");
  if (progress) progress.style.width = `${circleProgress}%`;
  const stats = $$(".circle-stats span");
  if (stats.length === 2) {
    stats[0].textContent = `${formatMYR(state.circleSaved)} saved`;
    stats[1].textContent = `${circleProgress}% to goal`;
  }
  $("[data-peer-saved]").textContent = state.savings > 900 ? "Top 28%" : "Top 38%";
  $("[data-peer-buffer]").textContent = state.savings > 1000 ? "Improving" : "Needs work";
}

function drawForecast() {
  const canvas = $("[data-forecast-chart]");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f5f7f2";
  ctx.fillRect(0, 0, width, height);

  const values = [
    { label: "Today", y: 132, color: "#d95d4c" },
    { label: "No rules", y: 116, color: "#b77a16" },
    { label: "GX mode", y: Math.max(44, 110 - state.split * 2.4), color: "#0b8f61" },
  ];

  ctx.strokeStyle = "#dfe6df";
  ctx.lineWidth = 1;
  [40, 80, 120].forEach((lineY) => {
    ctx.beginPath();
    ctx.moveTo(24, lineY);
    ctx.lineTo(width - 16, lineY);
    ctx.stroke();
  });

  values.forEach((item, index) => {
    const x = 44 + index * 82;
    const barHeight = height - item.y - 28;
    ctx.fillStyle = item.color;
    roundRect(ctx, x, item.y, 42, barHeight, 6);
    ctx.fill();
    ctx.fillStyle = "#64706b";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x + 21, height - 8);
  });

  const avoided = Math.max(52, Math.round(46 + state.split * 5.8 + (state.cooling ? 18 : 0)));
  $("[data-forecast-copy]").textContent = `With autopilot active, Aina is projected to avoid ${formatMYR(avoided)} in short-term debt this month.`;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function renderAll() {
  renderShell();
  renderDashboard();
  renderCoach();
  renderAutosave();
  renderChallenges();
  renderCommunity();
  drawForecast();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  $("[data-toast-region]").appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}

function applyAction(type) {
  if (type === "save-diff" || type === "apply-primary") {
    state.savings += 36;
    state.balance = Math.max(0, state.balance - 36);
    state.streak += 1;
    state.points += 40;
    showToast("RM 36 moved to Emergency Pocket.");
  }

  if (type === "cooloff") {
    state.cooling = true;
    state.debt = Math.max(0, state.debt - 24);
    state.alerts = Math.max(0, state.alerts - 1);
    showToast("Cooling-off rule is active for risky spends.");
  }

  if (type === "roundup") {
    state.savings += 2;
    state.points += 8;
    showToast("Round-up saved RM 2.");
  }

  if (type === "payday" || type === "simulate-payday") {
    const transfer = Math.round(state.income * (state.split / 100));
    state.savings += transfer;
    state.balance += Math.round(state.income * 0.92);
    state.streak += 1;
    showToast(`${formatMYR(transfer)} moved to Emergency Pocket on payday.`);
  }

  if (type === "keep") {
    state.points += 5;
    showToast("Plan maintained.");
  }

  renderAll();
}

function switchView(target) {
  $$("[data-view]").forEach((view) => view.classList.toggle("active", view.dataset.view === target));
  $$("[data-view-target]").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === target));
  $("[data-view-title]").textContent = viewTitles[target];
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-target]");
    if (viewButton) switchView(viewButton.dataset.viewTarget);

    const profileButton = event.target.closest("[data-profile]");
    if (profileButton) {
      state.profile = profileButton.dataset.profile;
      state.income = profiles[state.profile].income;
      state.balance = profiles[state.profile].balance;
      $$("[data-profile]").forEach((button) => button.classList.toggle("active", button === profileButton));
      $("[data-control='income']").value = state.income;
      $("[data-control='balance']").value = state.balance;
      document.querySelector(".profile-card .muted").textContent = profiles[state.profile].label;
      renderAll();
    }

    const coachButton = event.target.closest("[data-coach-topic]");
    if (coachButton) {
      state.activeTopic = coachButton.dataset.coachTopic;
      renderCoach();
    }

    const nudgeButton = event.target.closest("[data-nudge-type]");
    if (nudgeButton) applyAction(nudgeButton.dataset.nudgeType);

    const transactionButton = event.target.closest("[data-transaction-action]");
    if (transactionButton) applyAction(transactionButton.dataset.transactionAction);

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      const action = actionButton.dataset.action;
      if (action === "run-scan") {
        state.alerts += 1;
        state.activeTopic = riskLabel() === "High" ? "shopping" : "food";
        showToast("AI scan refreshed with the latest spending pattern.");
        renderAll();
      }
      if (action === "show-alerts") {
        showToast(`${state.alerts} active nudges need attention.`);
      }
      if (action === "apply-primary-nudge") {
        applyAction("apply-primary");
      }
      if (action === "simulate-payday") {
        applyAction("simulate-payday");
      }
      if (action === "boost-circle") {
        state.circleSaved += 10;
        state.savings += 10;
        state.points += 25;
        showToast("RM 10 added to the group goal.");
        renderAll();
      }
    }

    const challengeButton = event.target.closest("[data-complete-challenge]");
    if (challengeButton) {
      const challenge = challenges.find((item) => item.id === challengeButton.dataset.completeChallenge);
      if (challenge) {
        challenge.progress = Math.min(100, challenge.progress + 22);
        state.streak += 1;
        state.points += 60;
        state.savings += challenge.id === "buffer" ? 20 : 8;
        showToast(`${challenge.title} progress updated.`);
        renderAll();
      }
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-control='income']")) {
      state.income = Number(event.target.value);
      renderAll();
    }

    if (event.target.matches("[data-control='balance']")) {
      state.balance = Number(event.target.value);
      renderAll();
    }

    if (event.target.matches("[data-control='split']")) {
      state.split = Number(event.target.value);
      renderAll();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-toggle='roundup']")) {
      state.roundUp = event.target.checked;
      renderAll();
    }

    if (event.target.matches("[data-toggle='cooling']")) {
      state.cooling = event.target.checked;
      renderAll();
    }
  });
}

bindEvents();
renderAll();
