# 2026-09-16

## 명령어 수행하기 (큐)

## 문제 설명

빈 큐가 있습니다.

다음 명령어들이 주어질 때, 명령어를 수행한 결과를 배열로 리턴하세요.

### 명령어 종류

- `"ENQUEUE x"` : 숫자 `x`를 큐에 넣는다.
- `"DEQUEUE"` : 큐에서 맨 앞의 값을 꺼내고 결과 배열에 추가한다.
  - 만약 큐가 비어있으면 `"EMPTY"`를 결과 배열에 추가한다.

## 입력 형식

문자열 배열 `commands`가 주어집니다.

```js
["ENQUEUE 3", "ENQUEUE 5", "DEQUEUE", "DEQUEUE", "DEQUEUE"];
```

## 출력 형식

`DEQUEUE` 명령어 수행 결과를 순서대로 담은 배열을 반환합니다.

## 입출력 예시

| commands                                                      | result            |
| ------------------------------------------------------------- | ----------------- |
| `["ENQUEUE 3", "ENQUEUE 5", "DEQUEUE", "DEQUEUE", "DEQUEUE"]` | `[3, 5, "EMPTY"]` |

## 기본 코드

```js
function solution(commands) {}

console.log(
  solution(["ENQUEUE 3", "ENQUEUE 5", "DEQUEUE", "DEQUEUE", "DEQUEUE"]),
);
```
