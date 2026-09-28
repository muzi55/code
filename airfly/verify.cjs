// 정답과 독립적인 작은 완전탐색, 성질 검사, 개념노트 예제 검증.
// 기본 테스트: node airfly/test.cjs / 추가 검증: node airfly/verify.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { readProblem } = require('./test.cjs');

let checks = 0;
let seed = 20260928;
const random = n => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed % n;
};
const solutions = new Map();
function check(id, args, expected) {
  if (!solutions.has(id)) solutions.set(id, vm.runInNewContext(`${readProblem(id).code}\nsolution`));
  const actual = solutions.get(id)(...structuredClone(args));
  assert.deepStrictEqual(structuredClone(actual), expected, `${id}: ${JSON.stringify(args)}`);
  checks++;
}

function pairExists(values, target) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) if (values[i] + values[j] === target) return true;
  }
  return false;
}

for (let trial = 0; trial < 200; trial++) {
  const values = Array.from({ length: random(9) }, () => random(21) - 10);
  const target = random(41) - 20;
  check('19', [values, target], pairExists(values, target));
  const prices = values.map(x => x + 10).sort((a, b) => a - b);
  const priceTarget = random(41);
  check('29', [prices, priceTarget], pairExists(prices, priceTarget));
  const unique = [...new Set(prices)];
  const wanted = random(25);
  check('47', [unique, wanted], unique.indexOf(wanted));

  const shopping = values.map(x => x + 11);
  const budget = random(50);
  let most = 0;
  for (let mask = 0; mask < 2 ** shopping.length; mask++) {
    let cost = 0;
    let count = 0;
    for (let i = 0; i < shopping.length; i++) {
      if (mask & (1 << i)) { cost += shopping[i]; count++; }
    }
    if (cost <= budget) most = Math.max(most, count);
  }
  check('25', [shopping, budget], most);

  const days = Array.from({ length: random(30) }, () => random(2));
  const runs = days.join('').match(/1+/g) ?? [];
  check('38', [days], Math.max(0, ...runs.map(run => run.length)));

  if (prices.length > 1) {
    let gap = Infinity;
    for (let i = 0; i < prices.length; i++) {
      for (let j = i + 1; j < prices.length; j++) gap = Math.min(gap, Math.abs(prices[i] - prices[j]));
    }
    check('28', [prices], gap);
  }
  if (values.length > 0) {
    const k = random(values.length) + 1;
    const sums = Array.from({ length: values.length - k + 1 }, (_, i) => values.slice(i, i + k).reduce((a, b) => a + b, 0));
    check('40', [values, k], Math.max(...sums));
    const queries = Array.from({ length: 5 }, () => [random(prices.length), random(prices.length)].sort((a, b) => a - b));
    check('39', [prices, queries], queries.map(([l, r]) => prices.slice(l, r + 1).reduce((a, b) => a + b, 0)));
  }

  const word = () => Array.from({ length: random(7) }, () => 'ABC'[random(3)]).join('');
  const buttons = [word() || 'A', word() || 'B'];
  const targets = [word(), word() + 'Z', ''];
  const costs = targets.map(text => {
    let total = 0;
    for (const ch of text) {
      const options = buttons.map(button => button.indexOf(ch)).filter(index => index !== -1);
      if (options.length === 0) return -1;
      total += Math.min(...options) + 1;
    }
    return total;
  });
  check('50', [buttons, targets], costs);
}

let primes = 0;
for (let n = 0; n <= 1000; n++) {
  let divisorCount = 0;
  for (let d = 1; d <= n; d++) if (n % d === 0) divisorCount++;
  if (n > 0) check('41', [n], divisorCount);
  check('42', [n], divisorCount === 2);
  if (divisorCount === 2) primes++;
  if (n % 20 === 0) check('44', [n], primes);
}

for (let a = 1; a <= 30; a++) {
  for (let b = 1; b <= 30; b++) {
    let gcd = 1;
    for (let d = 1; d <= Math.min(a, b); d++) if (a % d === 0 && b % d === 0) gcd = d;
    let lcm = Math.max(a, b);
    while (lcm % a !== 0 || lcm % b !== 0) lcm++;
    check('43', [a, b], [gcd, lcm]);
  }
}

for (let length = 0; length <= 9; length++) {
  for (let bits = 0; bits < 2 ** length; bits++) {
    const text = Array.from({ length }, (_, i) => bits & (1 << i) ? '(' : ')').join('');
    let reduced = text;
    while (reduced.includes('()')) reduced = reduced.replaceAll('()', '');
    check('33', [text], reduced === '');
  }
}

const coinCounts = [0];
for (let amount = 0; amount <= 500; amount++) {
  if (amount > 0) coinCounts[amount] = 1 + Math.min(...[1, 5, 10, 50, 100].filter(c => c <= amount).map(c => coinCounts[amount - c]));
  check('49', [amount], coinCounts[amount]);
}

for (let n = 0; n <= 14; n++) {
  const positions = [0];
  let count = 0;
  while (positions.length) {
    const position = positions.pop();
    if (position === n) count++;
    else if (position < n) positions.push(position + 1, position + 2);
  }
  check('45', [n], count);
}

// 최대 크기의 대표 경계: 무해한 정답 반환까지 확인하며 시간 기록은 하지 않는다.
check('19', [Array(100000).fill(1), 3], false);
check('40', [Array(100000).fill(-1), 50000], -50000);
check('39', [Array(100000).fill(10000), [[0, 99999]]], [1000000000]);
check('34', [[...Array.from({ length: 10000 }, () => ['IN', 'A']), ...Array.from({ length: 10000 }, () => ['OUT'])]], Array(10000).fill('A'));

let snippets = 0;
const notesDirectory = path.join(__dirname, '개념노트');
for (const name of fs.readdirSync(notesDirectory).filter(name => name.endsWith('.md'))) {
  const text = fs.readFileSync(path.join(notesDirectory, name), 'utf8');
  for (const match of text.matchAll(/```js\n([\s\S]*?)\n```/g)) {
    new vm.Script(match[1], { filename: name }).runInNewContext({}, { timeout: 2000 });
    snippets++;
  }
}
console.log(`추가 검증 ${checks}개, 개념노트 실행 예제 ${snippets}개 통과`);
