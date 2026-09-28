코테 풀이

1.  탑승 가능 인원

[text](../../../airfly/문제/01.md)

![alt text](<스크린샷 2026-09-28 오후 5.12.41.png>)

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

2. 짐 무게의 부호 합계

[text](../../../airfly/문제/02.md)

```js
// 풀 문제에 맞게 인자 이름과 함수 본문을 바꾸세요.
// 현재 빈 답안이므로 테스트 실패가 정상입니다.
function solution(weights, loaded) {
  // 먼저 문제를 한 문장으로, 필요한 상태를 주석으로 적어 보세요.

  // weights의 아이템과 loaded 의 길이는 같다.
  // loaded 의 값에따라 true 면 더하고, false 이면 내린다.
  // -> [3, 4 ,2] , [false, true, false] 라면?
  // 시작부터 무게가 음수인데 괜찮을까

  let count = 0;

  for (let i = 0; i < weights.length; i++) {
    // if(loaded[i]){
    //   count+= weights[i]
    // } else {
    //   count-= weights[i]
    // }

    loaded[i] ? (count += weights[i]) : (count -= weights[i]);
  }

  return count;
}
module.exports = solution;
```
