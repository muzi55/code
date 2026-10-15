function 반복문(map, value) {
  const count = map.get(value) ?? 0;
  map.set(value, count + 1);
}
function solution(a, b) {
  // a 의 글자를 분해해서, b를 만들 수 있어야함.  순서는 상관없음
  // a, b의 글자수를 분석,
  // a의 글자들은 b의 값보다 커야함
  // listen 을 예시로는
  // l, i, s, t, e, n, - 모두 한개씩 있다.
  // silent 예시로
  // s, i, l, e, n, t, - 모두 한개씩 있다.

  //두 값의 들어가는 내용이 같으므로, 이 함수는 true 를 낸다.

  // 그럼 어떻게 값을 조정하냐.  비교는 ?

  const strA = new Map(),
    strB = new Map();

  for (const el of a) {
    반복문(strA, el);
  }

  for (const el of b) {
    반복문(strB, el);
  }

  if (strB.size > strA.size) {
    return false;
  }

  for (const el of strB.keys()) {
    if (!strA.get(el)) {
      return false;
    }
    if (strB.get(el) > strA.get(el)) {
      return false;
    }
  }

  return true;
}

solution("listen", "silent");
module.exports = solution;
