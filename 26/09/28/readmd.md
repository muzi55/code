코테 풀이

1.  [text](../../../airfly/문제/01.md)

```js
// 풀 문제에 맞게 인자 이름과 함수 본문을 바꾸세요.
// 현재 빈 답안이므로 테스트 실패가 정상입니다.
function solution(ages, minimum) {
  // 먼저 문제를 한 문장으로, 필요한 상태를 주석으로 적어 보세요.

  // ages 배열속 특정나이 이상인 승객의 수를 반환해라

  // 반환 해야 하는 것 = 특정나이 이상인 승객 수,
  let count = 0;

  for (const el of ages) {
    if (el >= minimum) {
      count++;
    }
  }

  return count;
}
module.exports = solution;
```
