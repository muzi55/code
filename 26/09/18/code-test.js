function solution(keymap, targets) {
  var answer = [];
  // keymap 에 있는 값을 targets 에 맞게 풀어나아가야함
  // keymap 에 ["ABACD", "BCEFD"], targets 에 ["ABCD", "AABB"] 인 값을 푼다면
  // A 는 첫번째 버튼의 A 가 있으니까 1 B 는 없으니까 -1 -> 이중 최소값이 1이므로 1표시,
  // B 는 첫번째 버튼에 B 가 두번째로 있으니 2, 두번째 버튼은 B 가 첫번째이므로, 1출력 -> 이중 최솟값이 1이므로 1표시,

  targets.forEach((target) => {
    let count = 0;
    let countEl = 0;
    for (const key in target) {
      // A B C D, A A B B  출력까진 완료,
      // 값을 비교해야함, 더 빠른수
      const findStr = [];
      keymap.map((el) => {
        const findIndexOf = el.indexOf(target[key]);
        if (findIndexOf > -1) {
          // 값이 있는경우
          countEl++;
          findStr.push(findIndexOf + 1);
        }
      });
      if (countEl > 0) {
        const a = Math.min(...findStr);
        count += a;
      }
    }
    if (count > 0) {
      answer.push(count);
    } else {
      answer.push(-1);
    }
  });

  return answer;
}
