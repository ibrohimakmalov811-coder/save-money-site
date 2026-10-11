export interface MissionOption {
  id: string;
  label: string;
  description?: string;
  isCorrect?: boolean;
  impact?: {
    cashChange: number;
    savingsChange: number;
    explanation: string;
  };
}

export interface NeedsWantsItem {
  id: string;
  name: string;
  priceUZS: number;
  category: 'need' | 'want';
  icon: string;
  reason: string;
}

export interface Mission {
  id: string;
  title: string;
  titleUz: string;
  titleRu: string;
  category: 'Budgeting' | 'Saving' | 'Spending' | 'Safety' | 'Planning';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMin: number;
  xpReward: number;
  description: string;
  descriptionUz: string;
  descriptionRu: string;
  learningObjectives: string[];
  type: 'budget_allocation' | 'needs_wants_sort' | 'savings_calculation' | 'scenario_choice' | 'scam_spotter';
  initialState?: Record<string, unknown>;
  content: {
    story: string;
    instructions: string;
    taskData?: Record<string, unknown>;
  };
}

export const missions: Mission[] = [
  {
    id: 'build-first-budget',
    title: 'Build Your First Budget',
    titleUz: 'Birinchi Byudjetingizni Tuzing',
    titleRu: 'Создайте свой первый бюджет',
    category: 'Budgeting',
    difficulty: 'Beginner',
    durationMin: 8,
    xpReward: 50,
    description: 'You received a monthly student stipend of 1 000 000 UZS. Allocate it across Needs, Wants, and Savings using the 50/30/20 rule.',
    descriptionUz: 'Sizga 1 000 000 so‘m oylik stipendiya tushdi. Uni 50/30/20 qoidasi asosida Ehtiyojlar, Istaklar va Jamg‘armaga taqsimlang.',
    descriptionRu: 'Вы получили студенческую стипендию 1 000 000 UZS. Распределите её на Потребности, Желания и Накопления по правилу 50/30/20.',
    learningObjectives: [
      'Understand the 50/30/20 budgeting rule',
      'Ensure essential living costs are covered first',
      'Reserve at least 20% for future financial cushion',
    ],
    type: 'budget_allocation',
    content: {
      story: 'You are studying at an IT academy in Tashkent and received a 1 000 000 UZS monthly learning stipend. Without a plan, small daily purchases will make it vanish before the 20th of the month.',
      instructions: 'Adjust the sliders to allocate exactly 1 000 000 UZS. Target approximately 50% for Needs, 30% for Wants, and at least 20% for Savings.',
      taskData: {
        totalIncomeUZS: 1000000,
        targetNeedsPercent: 50,
        targetWantsPercent: 30,
        targetSavingsPercent: 20,
      },
    },
  },
  {
    id: 'needs-vs-wants',
    title: 'Needs vs. Wants Sorting',
    titleUz: 'Ehtiyojlar va Istaklar Saralash',
    titleRu: 'Потребности против Желаний',
    category: 'Spending',
    difficulty: 'Beginner',
    durationMin: 6,
    xpReward: 40,
    description: 'Categorize 6 everyday student purchases into essential survival needs versus discretionary lifestyle wants.',
    descriptionUz: 'Har kungi 6 ta xaridni zaruriy ehtiyojlar va ixtiyoriy istaklarga ajrating.',
    descriptionRu: 'Распределите 6 повседневных покупок на жизненно важные потребности и необязательные желания.',
    learningObjectives: [
      'Distinguish true necessities from momentary desires',
      'Recognize how lifestyle creep drains student finances',
      'Prioritize spending without feeling deprived',
    ],
    type: 'needs_wants_sort',
    content: {
      story: 'Your cart contains both school essentials and fun upgrades. Categorize each item correctly to optimize your wallet.',
      instructions: 'Click on each item to classify it as either a "Need" (zarurat) or a "Want" (istak).',
      taskData: {
        items: [
          { id: 'item-1', name: 'Metro & Bus Monthly Pass', priceUZS: 170000, category: 'need', icon: 'Bus', reason: 'Essential transportation to attend classes and work on time.' },
          { id: 'item-2', name: 'Exclusive Game Battlepass Skin', priceUZS: 120000, category: 'want', icon: 'Gamepad2', reason: 'Pure entertainment. Great for fun, but not necessary for living.' },
          { id: 'item-3', name: 'Nutritious Daily Canteen Lunch', priceUZS: 450000, category: 'need', icon: 'Utensils', reason: 'Fuel for physical energy and sharp cognitive focus during study.' },
          { id: 'item-4', name: 'Designer Branded Sneakers', priceUZS: 1200000, category: 'want', icon: 'Shirt', reason: 'You already own footwear; luxury brands are status wants.' },
          { id: 'item-5', name: 'Home Internet for Coding Homework', priceUZS: 200000, category: 'need', icon: 'Wifi', reason: 'Vital infrastructure for IT coursework, repos, and homework.' },
          { id: 'item-6', name: 'Specialty Caramel Iced Latte Daily', priceUZS: 320000, category: 'want', icon: 'Coffee', reason: 'Convenience luxury; homemade tea or simple coffee costs 90% less.' },
        ],
      },
    },
  },
  {
    id: 'save-for-laptop',
    title: 'Save for Your First Laptop',
    titleUz: 'Birinchi Noutbukingizga Pul Yig‘ish',
    titleRu: 'Накопите на первый ноутбук',
    category: 'Saving',
    difficulty: 'Intermediate',
    durationMin: 10,
    xpReward: 60,
    description: 'Calculate the optimal savings strategy to buy a 6 000 000 UZS coding laptop in 6 months without taking high-interest loans.',
    descriptionUz: 'Qimmat foizli kreditlarsiz 6 oyda 6 000 000 so‘mlik noutbuk sotib olish rejasini tuzing.',
    descriptionRu: 'Рассчитайте план накоплений на ноутбук за 6 000 000 UZS за 6 месяцев без грабительских кредитов.',
    learningObjectives: [
      'Calculate time-to-goal: Target / Monthly contribution',
      'Compare debt interest costs against patient saving',
      'Establish automated discipline for high-value tech tools',
    ],
    type: 'savings_calculation',
    content: {
      story: 'You need an upgrade to code React and Python projects. A solid refurbished laptop costs 6 000 000 UZS. You currently have 1 000 000 UZS saved.',
      instructions: 'Calculate how much you must save each month to buy it in exactly 5 months, and choose the most prudent financing path.',
      taskData: {
        goalTargetUZS: 6000000,
        alreadySavedUZS: 1000000,
        targetMonths: 5,
        requiredMonthlyUZS: 1000000,
      },
    },
  },
  {
    id: 'survive-emergency',
    title: 'Survive an Unexpected Expense',
    titleUz: 'Kutilmagan Xarajatni Yengish',
    titleRu: 'Справиться с неожиданными расходами',
    category: 'Planning',
    difficulty: 'Intermediate',
    durationMin: 8,
    xpReward: 75,
    description: 'Disaster strikes! Your phone screen shattered, costing 350 000 UZS to repair. Choose how to handle it without going into debt.',
    descriptionUz: 'Kutilmagan xarajat! Telefon ekrani sinib 350 000 so‘m ta’mirlash talab qilinmoqda. Qarzga botmasdan hal qiling.',
    descriptionRu: 'Экстренная ситуация! Экран телефона разбился, ремонт стоит 350 000 UZS. Решите проблему без микрозаймов.',
    learningObjectives: [
      'Understand the power of a dedicated emergency buffer',
      'Make trade-offs between leisure spending and essential repairs',
      'Avoid high-interest microloans for emergency shortfalls',
    ],
    type: 'scenario_choice',
    content: {
      story: 'You drop your phone on the metro steps. The display is black and you cannot submit your academy attendance. Repair costs 350 000 UZS immediately. Your total monthly entertainment fund is 200 000 UZS, and your emergency buffer holds 400 000 UZS.',
      instructions: 'Examine the 3 solutions and select the one with the best long-term financial health impact.',
      taskData: {
        options: [
          {
            id: 'opt-loan',
            label: 'Take a quick online microloan at 45% annual rate with instant payout',
            isCorrect: false,
            impact: {
              cashChange: 0,
              savingsChange: -150000,
              explanation: 'High-interest debt traps young earners. Paying back 45% interest on an easily solvable emergency damages your future stipend.',
            },
          },
          {
            id: 'opt-buffer',
            label: 'Pay 350 000 UZS using your emergency buffer, and replenish it next month',
            isCorrect: true,
            impact: {
              cashChange: 0,
              savingsChange: -350000,
              explanation: 'Excellent decision! This is precisely why emergency funds exist: to prevent debt without hurting your daily necessities.',
            },
          },
          {
            id: 'opt-skip-food',
            label: 'Skip lunch for two weeks and avoid paying internet bills',
            isCorrect: false,
            impact: {
              cashChange: 0,
              savingsChange: 0,
              explanation: 'Sacrificing health and essential study connectivity harms your productivity and learning potential.',
            },
          },
        ],
      },
    },
  },
  {
    id: 'spot-financial-scam',
    title: 'Spot the Financial Scam',
    titleUz: 'Moliyaviy Firibgarlikni Aniqlash',
    titleRu: 'Распознайте финансовое мошенничество',
    category: 'Safety',
    difficulty: 'Advanced',
    durationMin: 7,
    xpReward: 80,
    description: 'Inspect a suspicious Telegram message offering "Guaranteed 50% weekly profit on crypto investments". Identify the 3 red flags.',
    descriptionUz: 'Telegramdagi "Haftasiga 50% kafolatlangan foyda" taklifini tekshiring va 3 ta asosiy xavf belgisini toping.',
    descriptionRu: 'Изучите подозрительное сообщение в Telegram с "гарантированной прибылью 50% в неделю". Найдите 3 красных флага.',
    learningObjectives: [
      'Spot the red flag of "Guaranteed" high returns',
      'Identify urgent pressure tactics ("Only 2 hours left!")',
      'Never share SMS verification codes or transfer money to private unverified wallets',
    ],
    type: 'scam_spotter',
    content: {
      story: 'A channel bot called "@TashkentCryptoFastWealth" messages you: "Salam student! Transfer 100 000 UZS right now and get 150 000 UZS back in 48 hours guaranteed. Offer expires in 45 minutes! Send card details and SMS code."',
      instructions: 'Select all the legitimate warning signs that prove this is a scam.',
      taskData: {
        flags: [
          { id: 'flag-1', text: 'Promises "Guaranteed 50%" return with zero risk (No legal investment can guarantee abnormal returns)', isScamIndicator: true },
          { id: 'flag-2', text: 'High pressure urgency countdown ("Expires in 45 minutes")', isScamIndicator: true },
          { id: 'flag-3', text: 'Asks to send card details and SMS one-time verification password', isScamIndicator: true },
          { id: 'flag-4', text: 'Uses standard polite greetings', isScamIndicator: false },
        ],
      },
    },
  },
];
