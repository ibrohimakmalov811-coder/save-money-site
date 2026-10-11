export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AcademyModule {
  id: string;
  slug: string;
  title: string;
  titleUz: string;
  titleRu: string;
  category: string;
  durationMin: number;
  xpReward: number;
  iconName: string;
  summary: string;
  summaryUz: string;
  summaryRu: string;
  sections: {
    heading: string;
    body: string;
  }[];
  quiz: QuizQuestion[];
}

export const academyModules: AcademyModule[] = [
  {
    id: 'module-1',
    slug: 'understanding-money',
    title: 'Understanding Money & Currency',
    titleUz: 'Pul va Valyutani Tushunish',
    titleRu: 'Понимание денег и валюты',
    category: 'Foundations',
    durationMin: 7,
    xpReward: 30,
    iconName: 'Coins',
    summary: 'Discover what money actually represents, why currency holds value, and the difference between nominal value and purchasing power.',
    summaryUz: 'Pul aslida nimani anglatishi, valyuta nima sababdan qadrli ekanligi va xarid qobiliyati haqida bilib oling.',
    summaryRu: 'Узнайте, что на самом деле представляют собой деньги и в чём разница между номиналом и покупательской способностью.',
    sections: [
      {
        heading: 'What is Money Really?',
        body: 'Money is not just paper notes or digital bank numbers; it is a universally accepted medium of exchange, a unit of account, and a store of value. Before currency, bartering goods (e.g., swapping 5 sacks of wheat for a pair of boots) was inefficient. Money solves this "coincidence of wants" problem.',
      },
      {
        heading: 'Nominal Value vs. Real Purchasing Power',
        body: 'Having 1 000 000 UZS in your pocket today sounds like a significant amount. But what matters is what that 1 000 000 UZS can actually buy. If the price of school lunches or metro fares doubles over several years, the nominal number remains 1 000 000 UZS, but your real purchasing power has dropped by half.',
      },
      {
        heading: 'Practical Student Example in Uzbekistan',
        body: 'Imagine you receive 500 000 UZS as an eid/birthday gift. You could spend it immediately on snacks, or store it in a bank deposit yielding returns. Money stored under a mattress quietly loses purchasing power to inflation, while money actively managed protects your future standard of living.',
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the most accurate definition of "purchasing power"?',
        options: [
          'The total number of physical banknotes in your wallet',
          'The quantity of real goods and services that your money can actually buy',
          'The maximum credit limit allowed by your bank',
          'The total amount of money printed by the central bank',
        ],
        correctIndex: 1,
        explanation: 'Purchasing power measures real economic value—the volume of groceries, tech tools, or transport tickets you can purchase with a given amount of currency.',
      },
      {
        id: 'q1-2',
        question: 'Why did human civilization transition from barter systems to currency?',
        options: [
          'Because banknotes are lighter to carry than metal swords',
          'Barter requires a "double coincidence of wants", making everyday trade inefficient',
          'Barter was outlawed in the ancient world',
          'Currency was invented purely to charge taxes',
        ],
        correctIndex: 1,
        explanation: 'Under barter, you could only trade if the person possessing what you wanted also wanted what you offered. Currency acts as a neutral intermediate medium for everyone.',
      },
    ],
  },
  {
    id: 'module-2',
    slug: 'budgeting-fundamentals',
    title: 'Budgeting Fundamentals & 50/30/20 Rule',
    titleUz: 'Byudjet Asoslari va 50/30/20 Qoidasi',
    titleRu: 'Основы бюджетирования и правило 50/30/20',
    category: 'Budgeting',
    durationMin: 8,
    xpReward: 35,
    iconName: 'PieChart',
    summary: 'Learn the proven framework to structure your income: 50% for Needs, 30% for Wants, and 20% for Savings and Future Goals.',
    summaryUz: 'Daromadni to‘g‘ri taqsimlash: 50% Ehtiyojlar, 30% Istaklar va 20% Jamg‘arma va kelajak maqsadlariga.',
    summaryRu: 'Изучите проверенное правило распределения дохода: 50% на потребности, 30% на желания и 20% на накопления.',
    sections: [
      {
        heading: 'Why Every Developer and Student Needs a Budget',
        body: 'A budget is not a prison sentence that stops you from enjoying life; it is a permission slip to spend with zero guilt because your essentials and savings are already safeguarded.',
      },
      {
        heading: 'The 50/30/20 Framework',
        body: '1. 50% Needs: Non-negotiable costs like metro transit, school canteen lunch, mobile data for study, and basic personal care.\n2. 30% Wants: Entertainment, cinema with friends, gaming subscriptions, and dining out.\n3. 20% Savings: Emergency buffer fund, equipment replacement fund (new laptop), and investing in skills.',
      },
      {
        heading: 'Example with 1 200 000 UZS Monthly Stipend',
        body: '• Needs (50%): 600 000 UZS (Metro pass + meals + home internet)\n• Wants (30%): 360 000 UZS (Coffee, outings, steam games)\n• Savings (20%): 240 000 UZS (Automated transfer to high-yield bank deposit)',
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Under the 50/30/20 rule, which category should a monthly home internet bill for IT coursework fall into?',
        options: [
          'Wants (30%)',
          'Needs (50%)',
          'Savings (20%)',
          'Investment portfolio',
        ],
        correctIndex: 1,
        explanation: 'For a student or tech learner, reliable internet is essential infrastructure required to submit code, access classes, and complete coursework.',
      },
      {
        id: 'q2-2',
        question: 'If a student earns 800 000 UZS per month, what is the recommended minimum savings target (20%)?',
        options: [
          '80 000 UZS',
          '160 000 UZS',
          '240 000 UZS',
          '400 000 UZS',
        ],
        correctIndex: 1,
        explanation: '800 000 UZS × 0.20 = 160 000 UZS. Automating this 160k UZS transfer on day 1 builds 1 920 000 UZS within one year!',
      },
    ],
  },
  {
    id: 'module-3',
    slug: 'needs-vs-wants',
    title: 'Mastering Needs vs. Wants',
    titleUz: 'Ehtiyojlar va Istaklar Chegarasi',
    titleRu: 'Различение потребностей и желаний',
    category: 'Spending',
    durationMin: 6,
    xpReward: 30,
    iconName: 'Scale',
    summary: 'Recognize psychological triggers that disguise luxury wants as fake needs, and master the 48-hour cooling rule.',
    summaryUz: 'Ixtiyoriy istaklarni zaruriyat deb adashtiruvchi omillar va 48 soatlik kutish qoidasi.',
    summaryRu: 'Распознавайте уловки маркетинга, выдающие желания за необходимость, и освойте правило 48 часов.',
    sections: [
      {
        heading: 'The Chameleon Effect of Modern Marketing',
        body: 'Advertising algorithms on social media are designed to make you feel that without the newest wireless earbuds or designer sneakers, you are falling behind. This transforms a pure "want" into an emotional "perceived need".',
      },
      {
        heading: 'The 48-Hour Cooling Rule',
        body: 'Whenever you see an impulse item costing more than 150 000 UZS, wait 48 hours before purchasing. In more than 70% of cases, the dopamine spike fades, and you realize you never genuinely needed it.',
      },
      {
        heading: 'Upgrades vs. Essentials',
        body: 'A basic sturdy winter jacket is a need. A jacket with a designer logo that costs 5 times more is 80% "want". You do not have to eliminate all wants, but acknowledging them prevents accidental overspending.',
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'What is the primary benefit of the "48-Hour Cooling Rule"?',
        options: [
          'It lets stores discount items by 50% automatically',
          'It allows impulse dopamine emotions to settle so you evaluate true utility',
          'It guarantees your bank account balance will double',
          'It prevents online payment gateways from charging fees',
        ],
        correctIndex: 1,
        explanation: 'Impulse buying is driven by short-term neurological dopamine bursts. A 48-hour pause resets rational evaluation.',
      },
    ],
  },
  {
    id: 'module-4',
    slug: 'saving-financial-goals',
    title: 'Saving Strategies & Emergency Buffers',
    titleUz: 'Jamg‘arma Strategiyasi va Xavfsizlik Yostig‘i',
    titleRu: 'Стратегии сбережений и финансовая подушка',
    category: 'Saving',
    durationMin: 8,
    xpReward: 35,
    iconName: 'ShieldCheck',
    summary: 'Why "Pay Yourself First" beats saving whatever is left at the end of the month, and how to build a 3-month safety buffer.',
    summaryUz: 'Nega "Avval o‘zingizga to‘lang" qoidasi qoldiqni yig‘ishdan samaraliroq va 3 oylik zaxira fondi tuzilishi.',
    summaryRu: 'Почему принцип "Сначала заплати себе" эффективнее сбережения остатков и как создать подушку на 3 месяца.',
    sections: [
      {
        heading: 'The Fatal Flaw: "I will save whatever is left"',
        body: 'If you wait until day 30 of the month to save remaining cash, you will almost always find zero UZS left. Human spending naturally expands to consume all available funds (Parkinson\'s Law of Money).',
      },
      {
        heading: 'Pay Yourself First',
        body: 'The moment your stipend, gift, or internship paycheck arrives, immediately move your savings quota (e.g., 20%) into a separate dedicated savings account or deposit before buying anything else.',
      },
      {
        heading: 'The Three Buckets of Savings',
        body: '1. Emergency Cushion: 1-3 months of living costs for urgent doctor visits or broken essential tech.\n2. Medium-term Goals: Coding laptop, English exam fees, or internship relocation.\n3. Long-term Wealth: High-interest compound growth.',
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What does the golden rule "Pay Yourself First" instruct you to do?',
        options: [
          'Buy luxury gadgets on the very first day of getting paid',
          'Transfer your savings goal percentage immediately upon receiving income before discretionary spending',
          'Pay off non-urgent debts before buying groceries',
          'Withdraw all money in physical cash banknotes',
        ],
        correctIndex: 1,
        explanation: 'Paying yourself first treats your future financial security as your highest-priority non-negotiable expense.',
      },
    ],
  },
  {
    id: 'module-5',
    slug: 'banking-and-interest',
    title: 'Banking Fundamentals & Compound Interest',
    titleUz: 'Bank Asoslari va Murakkab Foiz',
    titleRu: 'Банковские основы и сложный процент',
    category: 'Banking',
    durationMin: 9,
    xpReward: 40,
    iconName: 'Landmark',
    summary: 'Understand how national banks operate, how deposits earn interest, and why compound interest is the 8th wonder of the world.',
    summaryUz: 'Banklar faoliyati, omonatlar qanday foiz keltirishi va murakkab foizning kuchi.',
    summaryRu: 'Как работают банки, как депозиты приносят доход и почему сложный процент называют чудом света.',
    sections: [
      {
        heading: 'How Modern Banks Function',
        body: 'Banks are financial intermediaries licensed and regulated by the Central Bank of Uzbekistan. They accept deposits from savers and lend to entrepreneurs or homebuyers. In return for trusting the bank with your capital, they pay you annual interest.',
      },
      {
        heading: 'Simple vs. Compound Interest',
        body: 'Simple interest only pays on the initial principal. Compound interest pays interest on your principal PLUS all previously accumulated interest. Over 5 to 10 years, compounding accelerates growth exponentially.',
      },
      {
        heading: 'Rule of 72: A Quick Mental Math Hack',
        body: 'To estimate how many years it takes for your money to double at a given annual interest rate, divide 72 by the interest rate. At an 18% annual deposit rate in Uzbekistan: 72 / 18 = 4 years to double your initial capital!',
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Using the Rule of 72, how many years will it take for a bank deposit to double if it pays 12% annual interest?',
        options: [
          '12 years',
          '8.5 years',
          '6 years',
          '4 years',
        ],
        correctIndex: 2,
        explanation: '72 ÷ 12 = 6 years! In 6 years, your deposit will double without any extra active effort.',
      },
    ],
  },
  {
    id: 'module-6',
    slug: 'inflation-hidden-cost',
    title: 'Inflation: The Silent Purchasing Power Eater',
    titleUz: 'Inflyatsiya: Xarid Qobiliyatining Yashirin Yirtqichi',
    titleRu: 'Инфляция: скрытый пожиратель накоплений',
    category: 'Economics',
    durationMin: 7,
    xpReward: 35,
    iconName: 'TrendingDown',
    summary: 'Why keeping physical cash under a mattress guarantees loss, and how to beat inflation through smart yields.',
    summaryUz: 'Nega naqd pulni yostiq ostida saqlash yo‘qotishlarga olib keladi va uni qanday himoya qilish kerak.',
    summaryRu: 'Почему хранить наличные под матрасом убыточно и как защитить деньги от обесценивания.',
    sections: [
      {
        heading: 'What Causes Inflation?',
        body: 'Inflation is the general increase in the price of everyday goods and services over time. If a bowl of soup at the academy was 15 000 UZS two years ago and costs 20 000 UZS today, the currency has lost some purchasing power.',
      },
      {
        heading: 'The Cash Mattress Trap',
        body: 'If you store 10 000 000 UZS in physical cash at home during 10% annual inflation, you will still have exactly 10 000 000 UZS in paper after one year. However, it will only buy what 9 000 000 UZS could buy a year earlier. You lost 1 000 000 UZS in real economic value without spending a single som.',
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'If annual inflation is 10% and you hold 1 000 000 UZS in physical cash under your pillow for one year, what happened?',
        options: [
          'Your nominal banknotes decreased to 900 000 UZS',
          'Your nominal cash is still 1 000 000 UZS, but its real purchasing power dropped by ~10%',
          'Your money gained value due to deflation',
          'The bank took a service commission from your physical banknotes',
        ],
        correctIndex: 1,
        explanation: 'Nominal amount stays identical, but the actual quantity of goods it can buy decreases proportionally with inflation.',
      },
    ],
  },
  {
    id: 'module-7',
    slug: 'responsible-borrowing',
    title: 'Responsible Borrowing & Debt Traps',
    titleUz: 'Mas’uliyatli Qarz Olish va Qarz Tuzoqlari',
    titleRu: 'Ответственные займы и долговые ловушки',
    category: 'Debt',
    durationMin: 8,
    xpReward: 35,
    iconName: 'AlertCircle',
    summary: 'Differentiating productive leverage from toxic consumer microloans. How to read interest terms and penalties.',
    summaryUz: 'Foydali sarmoyaviy qarz va xavfli mikromoliyaviy qarzlar o‘rtasidagi farq.',
    summaryRu: 'Разница между продуктивными инвестициями и токсичными потребительскими микрокредитами.',
    sections: [
      {
        heading: 'Good Debt vs. Bad Debt',
        body: 'Good debt is used to acquire an asset that generates income or increases future earning power (e.g., student education loan for software engineering). Bad debt is borrowing money with high interest rates for depreciating luxuries (e.g., taking an online loan to buy concert tickets or brand clothes).',
      },
      {
        heading: 'The Danger of Microloans and Online Lending Apps',
        body: 'Fast online loans advertise "0% for first 3 days" but hide annual percentage rates (APR) exceeding 50% to 100% plus heavy compounding penalty fees. Never borrow money to pay for everyday living or entertainment.',
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Which of the following is an example of toxic "bad debt"?',
        options: [
          'A low-interest government subsidized educational loan to complete your IT degree',
          'A high-interest 40% microloan app to purchase designer clothes for a party',
          'A zero-interest equipment installment plan that matches your monthly planned budget',
          'A mortgage for a primary home within your debt-to-income limits',
        ],
        correctIndex: 1,
        explanation: 'Borrowing at high interest rates for lifestyle items you cannot afford creates a cycle of interest payments that drain your future income.',
      },
    ],
  },
  {
    id: 'module-8',
    slug: 'recognizing-financial-scams',
    title: 'Recognizing Digital Scams & Card Safety',
    titleUz: 'Kiber-Firibgarlik va Karta Xavfsizligi',
    titleRu: 'Распознавание мошенничества и защита карт',
    category: 'Safety',
    durationMin: 8,
    xpReward: 40,
    iconName: 'ShieldAlert',
    summary: 'Spot fake Telegram bots, social engineering, fraudulent SMS code phishing, and pyramid schemes targeting students.',
    summaryUz: 'Soxta Telegram botlar, ijtimoiy muhandislik va SMS parollarini o‘g‘irlash usullarini aniqlash.',
    summaryRu: 'Распознавание фейковых Telegram-ботов, фишинга кодов из SMS и финансовых пирамид.',
    sections: [
      {
        heading: 'The Anatomy of a Modern Phishing Attack',
        body: 'Scammers frequently send links looking like official bank apps (e.g., Click, Payme, or Uzum) claiming: "Your account is temporarily suspended! Enter your 16-digit card number and the 6-digit SMS code to verify immediately." The moment you submit that code, the attacker links your card to their wallet and drains your balance.',
      },
      {
        heading: 'The 3 Golden Rules of Card Protection',
        body: '1. NEVER share the 4-6 digit SMS confirmation code with anyone—even someone claiming to be "Bank Security". Real banks NEVER ask for your one-time code.\n2. Never click shortened links from unknown Telegram groups.\n3. If an investment promises "Guaranteed 50% or 100% return in days", it is 100% a fraudulent Ponzi pyramid scheme.',
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'A caller claiming to be "National Bank Security" asks you to read back the 6-digit SMS code sent to your phone to "cancel a suspicious transfer". What should you do?',
        options: [
          'Read the code immediately to protect your money',
          'Hang up immediately. Banks never request SMS codes; this is social engineering theft',
          'Ask them for their badge number, then read the code',
          'Send the code via Telegram chat instead',
        ],
        correctIndex: 1,
        explanation: 'Legitimate banks have back-office tools to freeze cards and NEVER need you to read your SMS one-time password. That code is the key authorizing your money out.',
      },
    ],
  },
];
