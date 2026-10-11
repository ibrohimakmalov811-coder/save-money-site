export interface LifeDecisionOption {
  id: string;
  label: string;
  description: string;
  cashImpactUZS: number;
  savingsImpactUZS: number;
  happinessImpact: number; // e.g. -10 to +20
  financialIQScore: number; // 0 to 100
  feedback: string;
}

export interface LifeEvent {
  id: string;
  month: number;
  title: string;
  titleUz: string;
  titleRu: string;
  description: string;
  descriptionUz: string;
  descriptionRu: string;
  options: LifeDecisionOption[];
}

export interface LifeScenario {
  id: string;
  title: string;
  titleUz: string;
  titleRu: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  monthlyIncomeUZS: number;
  baseLivingCostsUZS: number;
  initialSavingsUZS: number;
  durationMonths: number;
  summary: string;
  events: LifeEvent[];
}

export const lifeScenarios: LifeScenario[] = [
  {
    id: 'first-semester-it',
    title: 'First Semester at the IT Academy',
    titleUz: 'IT Akademiyasidagi Birinchi Semestr',
    titleRu: 'Первый семестр в IT-Академии',
    difficulty: 'Intermediate',
    monthlyIncomeUZS: 800000,
    baseLivingCostsUZS: 450000,
    initialSavingsUZS: 300000,
    durationMonths: 3,
    summary: 'Manage your monthly allowance of 800 000 UZS across 3 critical months while navigating unexpected social pressures, broken equipment, and education investments.',
    events: [
      {
        id: 'event-m1',
        month: 1,
        title: 'Month 1: Best Friend\'s Birthday Bash',
        titleUz: '1-Oy: Eng Yaqin Do‘stingizning Tug‘ilgan Kuni',
        titleRu: 'Месяц 1: День рождения лучшего друга',
        description: 'Your close friends plan a lavish party at a rooftop restaurant. Everyone is chipping in 250 000 UZS each. This represents over 30% of your total monthly allowance.',
        descriptionUz: 'Do‘stlaringiz qimmat restoranda ziyofat rejalashtirmoqda. Har bir kishi 250 000 so‘mdan tashlaydi. Bu oylik byudjetingizning 30% dan ko‘pi.',
        descriptionRu: 'Друзья собираются в модном кафе. С каждого по 250 000 UZS — это треть вашего месячного бюджета.',
        options: [
          {
            id: 'opt-attend-full',
            label: 'Attend and pay full 250 000 UZS from your student allowance',
            description: 'Enjoy the party fully, but wipe out your entire entertainment budget for the rest of the month.',
            cashImpactUZS: -250000,
            savingsImpactUZS: 0,
            happinessImpact: +20,
            financialIQScore: 60,
            feedback: 'You had great fun with friends, but with zero cash left for the remaining 3 weeks, you will have to walk everywhere and skip canteen snacks.',
          },
          {
            id: 'opt-budget-gift',
            label: 'Propose a thoughtful personal gift (100 000 UZS) and join for tea/dessert',
            description: 'Celebrate friendship meaningfully while respecting your personal financial boundary.',
            cashImpactUZS: -100000,
            savingsImpactUZS: 0,
            happinessImpact: +15,
            financialIQScore: 95,
            feedback: 'Brilliant balance! True friends value your presence and thoughtfulness, not extravagant spending. You preserved 150 000 UZS in your buffer.',
          },
          {
            id: 'opt-skip-ghost',
            label: 'Refuse without explanation and stay home feeling isolated',
            description: 'Save 100% of the money, but strain your relationship with your friends.',
            cashImpactUZS: 0,
            savingsImpactUZS: 0,
            happinessImpact: -15,
            financialIQScore: 50,
            feedback: 'Money is a tool for living a fulfilling life, not an excuse to isolate yourself. Communicating openly about a budget is a better life skill.',
          },
        ],
      },
      {
        id: 'event-m2',
        month: 2,
        title: 'Month 2: Laptop Charger Short Circuit',
        titleUz: '2-Oy: Noutbuk Zaryadkasi Kuyishi',
        titleRu: 'Месяц 2: Сгорела зарядка от ноутбука',
        description: 'During exam prep, sparks fly and your laptop charger dies. A genuine replacement at Malika market costs 280 000 UZS, while a cheap unbranded knockoff costs 90 000 UZS.',
        descriptionUz: 'Imtihon oldidan zaryadlovchi kabel kuyib qoldi. Asl nusxasi 280 000 so‘m, arzon sifatsizi esa 90 000 so‘m.',
        descriptionRu: 'Перед экзаменом сгорел блок питания. Оригинал стоит 280 000 UZS, дешёвая подделка — 90 000 UZS.',
        options: [
          {
            id: 'opt-genuine-buffer',
            label: 'Buy the reliable certified charger (280 000 UZS) using your savings buffer',
            description: 'Safeguard your multi-million som coding laptop from power surges and fires.',
            cashImpactUZS: 0,
            savingsImpactUZS: -280000,
            happinessImpact: +10,
            financialIQScore: 95,
            feedback: 'Smart risk management! Protecting high-value productive assets (laptop) is the ideal reason to use an emergency fund.',
          },
          {
            id: 'opt-knockoff',
            label: 'Buy the 90 000 UZS knockoff to save cash today',
            description: 'Cheap solution, but high risk of battery degradation or internal motherboard frying.',
            cashImpactUZS: -90000,
            savingsImpactUZS: 0,
            happinessImpact: 0,
            financialIQScore: 40,
            feedback: 'Dangerous false economy! Cheap uncertified chargers lack voltage regulators. A motherboard replacement would cost 2 000 000 UZS.',
          },
        ],
      },
      {
        id: 'event-m3',
        month: 3,
        title: 'Month 3: Paid IT Freelance Micro-Gig',
        titleUz: '3-Oy: Birinchi Pullik Frilans Buyurtmasi',
        titleRu: 'Месяц 3: Первый оплачиваемый фриланс-заказ',
        description: 'A local business owner offers you 400 000 UZS to create a landing page. It requires 15 hours of focused work over the weekend.',
        descriptionUz: 'Mahalliy tadbirkor oddiy veb-sahifa tayyorlab berish uchun 400 000 so‘m taklif qildi.',
        descriptionRu: 'Владелец малого бизнеса предлагает 400 000 UZS за создание простого лендинга на выходных.',
        options: [
          {
            id: 'opt-take-gig-save',
            label: 'Accept the contract, deliver quality code, and save 75% into your tech fund',
            description: 'Gain real client experience and inject fresh capital into your savings goals.',
            cashImpactUZS: +100000,
            savingsImpactUZS: +300000,
            happinessImpact: +25,
            financialIQScore: 100,
            feedback: 'Outstanding move! Earning extra active income while allocating the majority directly to savings catapults your financial progress!',
          },
          {
            id: 'opt-take-gig-splurge',
            label: 'Accept the contract and spend the entire 400 000 UZS on new sneakers immediately',
            description: 'You worked hard, so you spend it immediately on status items.',
            cashImpactUZS: 0,
            savingsImpactUZS: 0,
            happinessImpact: +10,
            financialIQScore: 55,
            feedback: 'You traded 15 hours of labor for a temporary status item without improving your safety buffer. Lifestyle inflation slows down your independence.',
          },
        ],
      },
    ],
  },
];
