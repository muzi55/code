function isEven(num) {
  return num % 2 === 0;
}
function solution(numbers, k) {
  const arr = [...numbers];
  const result = [];

  while (result.length < k) {
    const shift = arr.shift();
    if (isEven(shift)) {
      result.push(shift);
    } else {
      arr.push(shift);
    }
  }
  return result;
}

solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
