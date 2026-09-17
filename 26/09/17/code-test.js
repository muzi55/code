function solution(name, yearning, photo) {
  var answer = [];

  // name 과 yearning 의 크기는 같음
  const peopleScores = name.map((personName, index) => ({
    name: personName,
    yearning: yearning[index],
  }));

  photo.forEach((peopleInPhoto) => {
    let totalScore = 0;

    for (const personName of peopleInPhoto) {
      const personIndex = peopleScores.findIndex(
        (person) => person.name === personName,
      );

      if (personIndex >= 0) {
        totalScore += peopleScores[personIndex].yearning;
      }
    }

    answer.push(totalScore);
  });

  return answer;
}
