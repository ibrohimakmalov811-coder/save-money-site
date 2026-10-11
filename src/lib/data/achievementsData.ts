export interface Achievement {
  id: string;
  title: string;
  titleUz: string;
  titleRu: string;
  description: string;
  descriptionUz: string;
  descriptionRu: string;
  icon: string;
  xpBonus: number;
}

export const achievementsList: Achievement[] = [
  {
    id: 'first-mission',
    title: 'First Step to Wealth',
    titleUz: 'Birinchi Qadam',
    titleRu: 'Первый шаг к богатству',
    description: 'Completed your very first financial quest on MoneyQuest.',
    descriptionUz: 'MoneyQuest platformasida birinchi missiyangizni muvaffaqiyatli bajardingiz.',
    descriptionRu: 'Выполнили свою самую первую миссию на MoneyQuest.',
    icon: 'Flag',
    xpBonus: 50,
  },
  {
    id: 'budget-master',
    title: 'Budget Architect',
    titleUz: 'Byudjet Me’mori',
    titleRu: 'Архитектор бюджета',
    description: 'Designed and saved a balanced monthly budget in the simulator.',
    descriptionUz: 'Byudjet simulyatorida muvozanatli oylik byudjet tuzdingiz va saqladingiz.',
    descriptionRu: 'Создали и сохранили сбалансированный месячный бюджет.',
    icon: 'PieChart',
    xpBonus: 60,
  },
  {
    id: 'savings-starter',
    title: 'Goal Setter',
    titleUz: 'Maqsad Egasi',
    titleRu: 'Человек с целью',
    description: 'Created an active savings goal and simulated your first contribution.',
    descriptionUz: 'Yangi jamg‘arma maqsadi belgilab, birinchi omonatni simulyatsiya qildingiz.',
    descriptionRu: 'Создали финансовую цель и симулировали первое пополнение.',
    icon: 'Target',
    xpBonus: 50,
  },
  {
    id: 'quiz-champion',
    title: 'Academy Scholar',
    titleUz: 'Akademiya A’lochisi',
    titleRu: 'Отличник академии',
    description: 'Passed an educational academy module quiz with 100% accuracy.',
    descriptionUz: 'Akademiya modulidagi testni 100% natija bilan topshirdingiz.',
    descriptionRu: 'Сдали тест модуля Академии со 100% результатом.',
    icon: 'Award',
    xpBonus: 75,
  },
  {
    id: 'scam-detective',
    title: 'Scam Detective',
    titleUz: 'Kiber-Izquvar',
    titleRu: 'Детектив кибербезопасности',
    description: 'Uncovered red flags in the Scam Awareness Radar without falling for tricks.',
    descriptionUz: 'Firibgarlik radaridagi barcha tuzoqlarni xatosiz aniqladingiz.',
    descriptionRu: 'Безошибочно определили все уловки мошенников в Радаре.',
    icon: 'ShieldCheck',
    xpBonus: 80,
  },
  {
    id: 'streak-master',
    title: 'Consistent Learner',
    titleUz: 'Qat’iyatli Talaba',
    titleRu: 'Постоянство — залог успеха',
    description: 'Maintained a 3+ day learning streak on the platform.',
    descriptionUz: 'Platformada 3 kundan ortiq o‘rganish seriyasiga erishdingiz.',
    descriptionRu: 'Удержали серию непрерывного обучения более 3 дней.',
    icon: 'Flame',
    xpBonus: 100,
  },
];
