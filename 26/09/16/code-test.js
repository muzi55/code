function isEnqueue(queue) {
  return queue.includes("ENQUEUE") ? true : false;
}
function replaceEnqueue(enqueue) {
  return enqueue.replace("ENQUEUE ", "");
}

function solution(commands) {
  const queue = [];
  const result = [];

  for (const el of commands) {
    if (isEnqueue(el)) {
      //  enqueue 일 경우,
      queue.push(el);
    } else {
      // dequeue 일 경우,

      // queue 에 값이 0인경우에 EMPTY 추가
      if (queue.length === 0) {
        result.push("EMPTY");
      } else {
        const shift = queue.shift();
        result.push(+replaceEnqueue(shift));
      }
    }
  }

  return result;
}
console.log(
  solution(["ENQUEUE 3", "ENQUEUE 5", "DEQUEUE", "DEQUEUE", "DEQUEUE"]),
);
