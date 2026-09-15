// 오늘의 코딩 테스트 풀이
function solution(boxes) {
  const stack = [];

  // stack
  for (const el of boxes) {
    // 직전 박스와 다른 경우에만 추가하여 연속 중복 제거
    if (stack.at(-1) !== el) {
      stack.push(el);
    }
  }

  return stack;
}
solution([2, 2, 5, 5, 5, 1, 1]);
solution([7, 7, 8, 8, 0, 0, 0]);
