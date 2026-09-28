// 풀 문제에 맞게 인자 이름과 함수 본문을 바꾸세요.
// 현재 빈 답안이므로 테스트 실패가 정상입니다.
function solution(durations) {
  // 먼저 문제를 한 문장으로, 필요한 상태를 주석으로 적어 보세요.

  // 가장 운영시간이 긴 구간의 인덱스를 반환하여라,
  let index;

  const max = Math.max(...durations);
  index = durations.indexOf(max);

  return index;
}
module.exports = solution;
