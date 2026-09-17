# [추억 점수](https://school.programmers.co.kr/learn/courses/30/lessons/176963?language=javascript)

## 문제

`name[i]`의 그리움 점수는 `yearning[i]`이다.

각 사진 `photo[i]`에 등장하는 사람들의 그리움 점수를 모두 더해 배열로 반환한다.

점수가 등록되지 않은 사람은 `0점`으로 처리한다.

## 제한사항

- `3 ≤ name.length ≤ 100`
- `name.length = yearning.length`
- `1 ≤ yearning[i] ≤ 100`
- `3 ≤ photo.length ≤ 100`
- `1 ≤ photo[i].length ≤ 100`

## 예제

```js
name = ["may", "kein", "kain", "radi"];
yearning = [5, 10, 1, 3];

photo = [
  ["may", "kein", "kain", "radi"],
  ["may", "kein", "brin", "deny"],
  ["kon", "kain", "may", "coni"],
][
  // 결과
  (19, 15, 6)
];
```
