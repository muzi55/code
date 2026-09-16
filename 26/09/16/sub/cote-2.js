function isPlus(num) {
  return ++num;
}

function solution(numbers, k) {
  const arr = [...numbers];
  const result = [];

  // arr 이 0이 될때까지 반복 진행
  while (arr.length > 0) {
    const shift = arr.shift();
    // 첫번째 요소가 k 보다 작다면
    if (shift < k) {
      // 값을 1 더해서, arr 마지막으로 보냄,
      arr.push(isPlus(shift));
    } else {
      // 같거나, 크다면, result로 보냄
      result.push(shift);
    }
  }
  return result;
}

solution([2, 4, 1], 4);
