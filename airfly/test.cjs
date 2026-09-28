// MD의 정답과 테스트를 직접 읽는다. 별도 패키지 설치는 필요 없다.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function readProblem(id) {
  const filename = path.join(__dirname, '문제', `${id}.md`);
  const text = fs.readFileSync(filename, 'utf8');
  const code = text.match(/<!-- solution -->\s*```js\n([\s\S]*?)\n```/)?.[1];
  const testText = text.match(/<!-- tests -->\s*```json\n([\s\S]*?)\n```/)?.[1];
  if (!code || !testText) throw new Error(`${id}: 정답 또는 테스트 블록 없음`);
  return { code, tests: JSON.parse(testText) };
}

function main() {
  const [requested = 'all', answerFile] = process.argv.slice(2);
  if (process.argv.length > 4 || (requested !== 'all' && !/^\d{1,2}$/.test(requested))) {
    throw new Error('사용법: node airfly/test.cjs [all|01~50] [내풀이.cjs]');
  }
  if (requested === 'all' && answerFile) throw new Error('내 풀이 검증은 문제 번호 하나를 지정하세요.');
  const number = Number(requested);
  if (requested !== 'all' && (number < 1 || number > 50)) throw new Error('문제 번호는 01~50입니다.');
  const ids = requested === 'all'
    ? Array.from({ length: 50 }, (_, i) => String(i + 1).padStart(2, '0'))
    : [String(number).padStart(2, '0')];
  const solve = answerFile ? require(path.resolve(answerFile)) : null;
  if (answerFile && typeof solve !== 'function') throw new Error('내풀이 파일 마지막에 module.exports = solution;을 추가하세요.');
  let passed = 0;
  let failed = 0;
  for (const id of ids) {
    const { code, tests } = readProblem(id);
    const script = new vm.Script(solve ? 'solve(...input)' : `${code}\nsolution(...input)`);
    let problemFailed = 0;
    for (const test of tests) {
      try {
        const input = structuredClone(test.args);
        const actual = script.runInNewContext({ input, solve }, { timeout: 2000 });
        assert.deepStrictEqual(structuredClone(actual), test.expected);
        // 명시적으로 원본 보존을 요구한 문제만 추가 확인한다.
        if (id === '21') assert.deepStrictEqual(input, test.args, '원본 배열이 변경됨');
        passed++;
      } catch (error) {
        failed++;
        problemFailed++;
        console.error(`실패 ${id} / ${test.name}: ${error.message}`);
      }
    }
    console.log(`${id}: ${tests.length - problemFailed}/${tests.length} 통과`);
  }
  console.log(`총 ${passed} 통과, ${failed} 실패`);
  if (failed) process.exitCode = 1;
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { readProblem };
