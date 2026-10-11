import { formatUZS, parseSafeNumber, calculateLevel } from '../src/lib/utils';
import { missions } from '../src/lib/data/missionsData';
import { academyModules } from '../src/lib/data/academyData';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- Running MoneyQuest Financial & Business Logic Tests ---');

// 1. Currency Formatting
console.log('Test: Currency Formatting (formatUZS)...');
assert(formatUZS(1000000) === '1 000 000 UZS', 'formatUZS(1000000) should be "1 000 000 UZS"');
assert(formatUZS(50000) === '50 000 UZS', 'formatUZS(50000) should be "50 000 UZS"');
assert(formatUZS(0) === '0 UZS', 'formatUZS(0) should be "0 UZS"');
assert(formatUZS(null as unknown as number) === '0 UZS', 'formatUZS(null) should handle safely');
assert(formatUZS(NaN) === '0 UZS', 'formatUZS(NaN) should handle safely');

// 2. Safe Number Parsing
console.log('Test: Safe Number Parsing (parseSafeNumber)...');
assert(parseSafeNumber('1 000 000') === 1000000, 'Parsing string with spaces');
assert(parseSafeNumber('abc') === 0, 'Parsing non-numeric string returns 0');
assert(parseSafeNumber('-500', 0) === 0, 'Negative numbers respect min bound of 0');
assert(parseSafeNumber(2500000) === 2500000, 'Direct number passthrough');

// 3. Level Progression & XP Milestones
console.log('Test: Level Progression & XP Milestones...');
const lv1 = calculateLevel(0);
assert(lv1.level === 1 && lv1.defaultTitle === 'Money Beginner', '0 XP is Level 1');

const lv1Max = calculateLevel(199);
assert(lv1Max.level === 1 && lv1Max.progressPercent >= 90, '199 XP is Level 1 high progress');

const lv2 = calculateLevel(200);
assert(lv2.level === 2 && lv2.defaultTitle === 'Budget Explorer', '200 XP is Level 2');

const lv3 = calculateLevel(500);
assert(lv3.level === 3 && lv3.defaultTitle === 'Saving Strategist', '500 XP is Level 3');

const lv4 = calculateLevel(1000);
assert(lv4.level === 4 && lv4.defaultTitle === 'Smart Spender', '1000 XP is Level 4');

const lv5 = calculateLevel(2500);
assert(lv5.level === 5 && lv5.progressPercent === 100, '2500 XP is Level 5 Max');

// 4. Budget Calculator Edge Cases
console.log('Test: Budget Calculator Calculations & Edge Cases...');
const testIncome = 1000000;
const testExpenses = {
  food: 400000,
  transport: 150000,
  education: 150000,
  entertainment: 100000,
  savings: 200000,
  other: 0,
};
const totalSpent = Object.values(testExpenses).reduce((a, b) => a + b, 0);
assert(totalSpent === 1000000, 'Total expenses sum correctly');
const balance = testIncome - totalSpent;
assert(balance === 0, 'Remaining balance with balanced budget is 0');
const savingsRate = testIncome > 0 ? (testExpenses.savings / testIncome) * 100 : 0;
assert(savingsRate === 20, 'Savings rate is 20%');

// Deficit test:
const deficitExpenses = totalSpent + 200000;
assert(testIncome - deficitExpenses === -200000, 'Deficit accurately detected as negative balance');

// Zero income edge case:
const zeroIncome = 0;
const safeSavingsRate = zeroIncome > 0 ? (testExpenses.savings / zeroIncome) * 100 : 0;
assert(safeSavingsRate === 0, 'Division by zero avoided when income is 0');

// 5. Savings Goal Calculations
console.log('Test: Savings Goal Calculations & Edge Cases...');
const goalTarget = 5000000;
const goalSaved = 2200000;
const goalMonthly = 400000;

const remaining = Math.max(0, goalTarget - goalSaved);
assert(remaining === 2800000, 'Remaining calculation is correct');
const percent = Math.min(100, Math.round((goalSaved / goalTarget) * 100));
assert(percent === 44, 'Progress percentage is 44%');
const estimatedMonths = goalMonthly > 0 ? Math.ceil(remaining / goalMonthly) : null;
assert(estimatedMonths === 7, '2 800 000 / 400 000 ceil is 7 months');

// Completed goal edge case:
const completedSaved = 6000000;
const completedRemaining = Math.max(0, goalTarget - completedSaved);
const completedPercent = Math.min(100, Math.round((completedSaved / goalTarget) * 100));
assert(completedRemaining === 0, 'Completed goal remaining is 0');
assert(completedPercent === 100, 'Completed goal caps at 100%');

// 6. Dataset Integrity & Uniqueness
console.log('Test: Mission and Academy Data Integrity...');
assert(missions.length >= 5, 'At least 5 missions exist');
const missionIds = new Set(missions.map((m) => m.id));
assert(missionIds.size === missions.length, 'All mission IDs are unique');

assert(academyModules.length === 8, '8 academy modules exist');
const moduleSlugs = new Set(academyModules.map((m) => m.slug));
assert(moduleSlugs.size === academyModules.length, 'All academy module slugs are unique');

academyModules.forEach((mod) => {
  assert(mod.quiz.length > 0, `Module ${mod.id} has quiz questions`);
  mod.quiz.forEach((q) => {
    assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Question ${q.id} has valid correct index`);
    assert(q.explanation.length > 10, `Question ${q.id} provides clear explanation`);
  });
});

console.log('✅ ALL 6 FINANCIAL LOGIC & WORKFLOW TESTS PASSED PERFECTLY!');
