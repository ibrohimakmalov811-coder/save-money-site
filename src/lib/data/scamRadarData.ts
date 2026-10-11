export interface ScamCase {
  id: string;
  type: 'sms_phishing' | 'telegram_crypto' | 'pyramid_scheme' | 'fake_job';
  title: string;
  titleUz: string;
  titleRu: string;
  sender: string;
  platform: 'SMS' | 'Telegram' | 'Instagram' | 'Web';
  messageBody: string;
  redFlags: string[];
  safeAction: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const scamCases: ScamCase[] = [
  {
    id: 'scam-sms-card',
    type: 'sms_phishing',
    title: 'Urgent Bank Card Block Notification',
    titleUz: 'Karta Bloklanganligi Haqida Soxta SMS',
    titleRu: 'Срочное уведомление о блокировке карты',
    sender: '+998 90 000-00-00 (Masked as BANK-ALERT)',
    platform: 'SMS',
    messageBody: 'DIQQAT: Sizning kartangiz xavfsizlik sababli bloklandi! 15 daqiqa ichida tiklash uchun quyidagi havola orqali kiring va 6 xonali SMS kodni kiriting: http://payme-security-check.site/login',
    redFlags: [
      'Suspicious non-official domain name (".site" instead of official ".uz" or app)',
      'High urgency fear-mongering ("15 daqiqa ichida / within 15 minutes")',
      'Demands the 6-digit one-time SMS security authorization code',
    ],
    safeAction: 'Never click the link or provide the SMS code. Contact your bank directly via the official phone number printed on the back of your physical card.',
    explanation: 'Banks possess internal systems to safeguard cards and will NEVER require you to click a third-party link to enter an SMS verification code.',
    difficulty: 'Easy',
  },
  {
    id: 'scam-telegram-doubler',
    type: 'telegram_crypto',
    title: 'VIP Student Crypto Multiplier Bot',
    titleUz: 'Telegramda Pulni 2 Barobar Ko‘paytiruvchi Bot',
    titleRu: 'VIP Бот-удвоитель денег для студентов',
    sender: '@Uzbekistan_Crypto_VIP_Bot',
    platform: 'Telegram',
    messageBody: '🎉 Tabriklaymiz! Siz VIP aksiyamizga tanlandingiz. 200 000 so‘m o‘tkazing va 24 soat ichida sun’iy intellekt treyding algoritmi orqali 600 000 so‘m qilib qaytarib oling! Kafolat 100%! Joylar soni faqat 5 ta qoldi!',
    redFlags: [
      'Promises impossible 300% returns in 24 hours with "100% guarantee"',
      'Artificial scarcity ("Faqat 5 ta joy qoldi / Only 5 slots left")',
      'Unregulated anonymous Telegram bot asking for peer-to-peer card transfers',
    ],
    safeAction: 'Block the bot and report it for scam. Real trading always carries risk; guaranteed abnormal short-term returns are impossible.',
    explanation: 'This is a classic "advance fee / double-your-money" scam. Once you send the 200 000 UZS, the bot either blocks you or demands another "tax fee" of 100 000 UZS.',
    difficulty: 'Medium',
  },
  {
    id: 'scam-pyramid-membership',
    type: 'pyramid_scheme',
    title: '"Golden Matrix" Referral Club',
    titleUz: '"Oltin Matritsa" Do‘stlarni Taklif Qilish Tizimi',
    titleRu: 'Реферальный клуб "Золотая Матрица"',
    sender: 'Acquaintance on Instagram DM',
    platform: 'Instagram',
    messageBody: 'Salom do‘stim! Men yangi onlayn platformaga qo‘shildim. Kirish to‘lovi 500 000 so‘m. Har bir taklif qilgan 3 ta do‘stingiz uchun sizga 400 000 so‘m berishadi! Hech narsa sotish kerak emas, shunchaki odam yig‘amiz!',
    redFlags: [
      'Revenue model relies solely on recruiting new paying members rather than selling a real product',
      'Requires an upfront fee to participate',
      'Mathematical impossibility: pyramid schemes collapse when new recruitment slows down, leaving 90%+ of participants with total losses',
    ],
    safeAction: 'Decline firmly and warn your friend that they have enrolled in an illegal Ponzi pyramid scheme.',
    explanation: 'When income comes strictly from enrolling people rather than tangible goods or services, it is a pyramid scheme. The founders cash out while late entrants lose everything.',
    difficulty: 'Medium',
  },
  {
    id: 'scam-fake-remote-job',
    type: 'fake_job',
    title: 'Remote IT Job with "Registration Fee"',
    titleUz: 'Ro‘yxatdan O‘tish Puli Talab Qiluvchi Masofaviy Ish',
    titleRu: 'Удалённая IT-работа с "взносом за оформление"',
    sender: 'HR Specialist on Telegram',
    platform: 'Telegram',
    messageBody: 'We reviewed your resume and hired you as a Junior Content Tester! Salary: 8 000 000 UZS/month, flexible hours. To set up your corporate account and receive company software, please send a 150 000 UZS setup deposit.',
    redFlags: [
      'Hired without an interview or code assessment',
      'Unrealistically high salary for zero screening',
      'Legitimate employers NEVER ask candidates to pay money for corporate software or job onboarding',
    ],
    safeAction: 'Cease communication immediately. Legitimate companies pay employees, not the reverse.',
    explanation: 'Legitimate employers provide software and pay wages. Any "job offer" demanding an upfront fee or registration deposit is a fraudulent scam.',
    difficulty: 'Easy',
  },
];
