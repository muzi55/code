# 02. 코딩테스트에 필요한 JavaScript 기본기

[학습 지도](../README.md) · 이전: [접근법](01-문제를-읽고-풀이를-설계하는-법.md) · 다음: [자료구조](03-배열-해시-스택-큐.md)

이 문제집은 기존 프로젝트와 참고 PDF에 맞춰 JavaScript를 사용한다. Node.js 18 이상이면 별도 패키지 없이 테스트를 실행할 수 있다. 웹 브라우저와 네트워크는 필요 없다.

## 1. 함수의 입력과 반환

프로그래머스 형태의 문제는 입력 인자가 이미 함수에 전달된다고 생각한다. 문제에서 배열을 받는다면 문자열로 다시 읽고 파싱하는 코드는 필요 없다.

```js
function solution(values) {
  let sum = 0;
  for (const value of values) sum += value;
  return sum;
}
if (solution([2, 3]) !== 5) throw new Error('합계 오류');
```

`console.log(sum)`은 화면 출력이고 `return sum`은 호출자에게 값을 전달한다. 이 문제집의 채점은 반환값을 비교한다. 로그를 잘 찍어도 반환하지 않으면 실패한다.

답안 파일 마지막의 `module.exports = solution;`은 오프라인 테스트가 함수를 불러오기 위한 한 줄이다. 실제 함수만 제출하는 코딩테스트에서는 제출 형식에 맞게 제거한다.

## 2. 값과 인덱스 구분

```js
const values = [7, 9, 4];
const pairs = [];
for (let i = 0; i < values.length; i++) pairs.push([i, values[i]]);
if (JSON.stringify(pairs) !== '[[0,7],[1,9],[2,4]]') throw new Error('인덱스 오류');
```

`i`는 위치이고 `values[i]`는 그 위치의 값이다. “가장 큰 점수”와 “가장 큰 점수의 위치”는 반환이 다르다.

| 구문 | 얻는 것 | 주로 사용할 때 |
| --- | --- | --- |
| `for (const x of arr)` | 원소 값 | 위치가 필요 없는 순회 |
| `for (let i=0; i<arr.length; i++)` | 인덱스 i와 arr[i] | 거리, 인접 원소, 대응 배열 |
| `for (const [key,value] of map)` | 키·값 쌍 | 집계표 순회 |
| `for (const key in object)` | 열거 가능한 속성 이름 | 객체 속성 순회 |

배열·문자열의 숫자 인덱스가 필요하면 일반 for를 쓰자. `for...in`의 key는 문자열이며 배열 원소 자체가 아니다.

## 3. 빈 상태에 맞는 초기값

| 상태 | 자연스러운 초기값 | 주의 |
| --- | --- | --- |
| 합, 개수 | 0 | 아직 처리한 것이 없음 |
| 곱 | 1 | 0으로 시작하면 계속 0 |
| 최대값 | 첫 원소 또는 -Infinity | 음수 입력에 0은 잘못된 후보 |
| 최소값 | 첫 원소 또는 Infinity | 0은 모든 양수보다 작음 |
| 결과 목록 | [] | 없음 표시는 문제마다 다름 |
| 모든 조건 충족 | true | 반례를 만나면 false |

최솟값이나 최댓값에서 빈 배열이 가능한지 확인한다. 첫 원소를 초기값으로 쓰려면 입력이 비지 않는다는 전제가 필요하다.

```js
function maxValue(values) {
  let best = values[0]; // 호출 전제: 비어 있지 않다.
  for (const value of values) if (value > best) best = value;
  return best;
}
if (maxValue([-5, -2]) !== -2) throw new Error('음수 최댓값 오류');
```

## 4. 비교 연산과 경계

`이상`은 `>=`, `초과`는 `>`, `이하`는 `<=`, `미만`은 `<`다. 문제를 읽을 때 경계값에 밑줄을 긋고, 테스트에 경계와 정확히 같은 입력을 넣는다.

`===`는 타입을 강제로 바꾸지 않고 비교한다. 문자열 `'3'`과 숫자 `3`을 혼용하지 않는다. `sort`, `split` 뒤에도 값의 타입이 무엇인지 확인한다.

`0`, `''`, `false`, `undefined`는 조건문에서 모두 거짓처럼 평가된다. 하지만 0점, 인덱스 0, 빈 문자열의 비용 0은 정상 값일 수 있다. 존재 여부를 `if(value)` 하나로 대신하면 안 된다.

```js
const last = new Map([['a', 0]]);
if (!last.has('a')) throw new Error('위치 0도 존재한다');
if (last.get('a') !== 0) throw new Error('값 손실');
const missing = last.get('z') ?? -1;
if (missing !== -1) throw new Error('기본값 오류');
```

`??`는 null 또는 undefined일 때만 기본값을 사용한다. `||`는 0도 기본값으로 바꾸므로 횟수·거리 문제에서는 의미를 확인하고 사용한다.

## 5. 배열 메서드가 하는 일

| 메서드 | 반환 | 원본 변경 |
| --- | --- | --- |
| `push(x)` | 변경 후 길이 | 예 |
| `pop()` | 꺼낸 마지막 값, 없으면 undefined | 예 |
| `slice(a,b)` | a 포함, b 제외 복사본 | 아니오 |
| `splice(a,k)` | 지운 원소 배열 | 예 |
| `map(fn)` | 각 값을 변환한 배열 | 메서드 자체는 아니오 |
| `filter(fn)` | 조건을 만족한 원소 배열 | 메서드 자체는 아니오 |
| `reduce(fn,initial)` | 누적한 값 | 콜백 구현에 달림 |
| `sort(compare)` | 정렬된 같은 배열 | 예 |
| `includes(x)` | 존재 여부 | 아니오 |

`map`은 변환 결과가 필요할 때 사용한다. 결과 배열을 쓰지 않고 외부 count만 수정하려면 for가 더 직접적이다. `forEach`에서는 일반적인 `break`를 사용할 수 없다. 조기 종료가 필요하면 for나 `some`, `every`를 검토한다.

### slice 경계 예시

```js
const values = [8, 7, 3, 9, 2];
const part = values.slice(1, 4);
if (JSON.stringify(part) !== '[7,3,9]') throw new Error('slice 경계 오류');
if (values.length !== 5) throw new Error('원본 변경');
```

문제의 “2번째부터 4번째까지”는 `slice(1,4)`다. 1부터 시작하는 순번을 0 기준으로 바꿀 때 시작에서만 1을 빼는 이유는 끝이 미포함이기 때문이다.

### 숫자 정렬과 복사

```js
const prices = [10, 2, 30];
const sorted = [...prices].sort((a, b) => a - b);
if (JSON.stringify(sorted) !== '[2,10,30]') throw new Error('숫자 정렬 오류');
if (prices[0] !== 10) throw new Error('원본 변경');
```

오름차순은 `a-b`, 내림차순은 `b-a`. 비교 함수는 앞이면 음수, 동등하면 0, 뒤면 양수를 반환한다. 기본 `sort()`는 문자열 표현 기준이므로 숫자 정렬에는 비교 함수를 명시한다.

전개 구문 `[...arr]`은 얕은 복사다. 안쪽 객체나 배열까지 새로 만들지는 않는다. 여기서는 원소를 수정하지 않고 바깥 순서만 바꾸므로 얕은 복사로 충분한 경우가 많다.

### 빈 배열의 reduce

```js
const total = [].reduce((sum, value) => sum + value, 0);
if (total !== 0) throw new Error('빈 합 오류');
```

초기값을 생략한 `reduce`는 빈 배열에서 오류가 난다. 합을 구하면 보통 0을 명시한다. 복잡한 누적 로직은 짧은 reduce보다 상태가 보이는 for가 이해하기 쉽다.

## 6. 문자열은 새 문자열로 만든다

JS 문자열의 인덱스에 문자를 대입해서 내용을 바꾸려고 하지 않는다. 변환할 글자를 배열에 모아 `join('')`하거나 `slice`한 구간들을 결합한다.

이 문제집의 문자 인덱스 문제는 영문·숫자·ASCII 공백으로 제한했다. 일반 유니코드에서 문자열 length는 UTF-16 코드 단위 수이며 화면의 글자 수와 다를 수 있다. 제한된 알파벳 문제의 인덱싱을 모든 자연어에 그대로 적용하지 않는다.

문자열은 `split(' ')`과 `split('')`가 완전히 다르다. 앞은 공백 단위, 뒤는 코드 단위로 나눈다. 공백 보존 문제가 있으면 `trim()`이 조건을 망가뜨릴 수 있다.

## 7. 나눗셈·나머지·큰 정수

```js
if (Math.floor(17 / 5) !== 3) throw new Error('몫 오류');
if (17 % 5 !== 2) throw new Error('나머지 오류');
const position = ((-12 % 5) + 5) % 5;
if (position !== 3) throw new Error('음수 나머지 보정 오류');
```

정수 몫이 필요하면 명시적으로 계산한다. 양수에서 `Math.floor`와 `Math.trunc`는 같지만 음수에서는 다르다. `Math.floor(-1.2)`는 -2, `Math.trunc(-1.2)`는 -1이다.

비트 연산 `|0`, `>>`를 정수 변환용으로 무심코 쓰지 않는다. 일반 Number의 범위 전체가 아니라 32비트 정수 변환이 개입한다.

Number가 정확하게 표현하는 안전 정수 상한은 `2^53-1`이다. 입력 하나가 작아도 합·곱이 커질 수 있다. 43번은 최대 곱이 10^12라 안전하지만, 10^12 두 개를 곱하는 문제라면 다시 계산해야 한다.

BigInt는 큰 정수용 별도 타입이다. Number와 산술 연산에서 섞을 수 없고 일반 JSON으로 바로 저장할 수 없다. 현재 50문제에는 필요 없다.

## 8. 배열 길이와 실제 비용

`arr.includes(x)`는 일반적으로 찾을 때까지 원소를 확인하므로 O(n)이다. n번 반복하며 길이 n 배열에 includes를 호출하면 O(n²) 후보가 된다.

반대로 `'aeiou'.includes(ch)`는 대상 길이가 항상 5여서 한 문자당 상수 크기의 작업이다. 문법이 아니라 내부에서 다루는 입력 크기를 본다.

`Math.max(...largeArray)`처럼 큰 배열을 함수 인자로 전개하면 실행 환경의 인자 수 제한에 걸릴 수 있다. 수만~수십만 원소의 최대값은 순회가 안전하다. 27번은 점수 배열이 항상 세 개라 전개해도 문제가 없다.

## 9. 2차원 배열 생성 함정

```js
const rows = Array.from({ length: 2 }, () => Array(3).fill(0));
rows[0][0] = 7;
if (rows[1][0] !== 0) throw new Error('행이 독립적이어야 한다');
```

`Array(2).fill(Array(3).fill(0))`은 같은 행을 두 번 참조한다. 각 행이 독립적이어야 하면 콜백으로 새 배열을 생성한다.

## 10. 함수 밖 상태는 조심한다

온라인 채점은 solution을 여러 번 호출할 수 있다. 한 번의 문제 풀이에 필요한 count, Map, 결과 배열은 기본적으로 함수 안에서 새로 만든다. 이전 호출 결과가 다음 호출에 섞이면 단독 테스트만 통과하는 오류가 생긴다.

실행 전에 확인할 것: return 누락, 배열/숫자 타입, 인덱스 기준, 초기값, 원본 변경, 함수별 상태 초기화. 문법을 많이 외우는 것보다 이 여섯 가지가 우선이다.
