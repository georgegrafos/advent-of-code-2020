/**
 * Part 1: Find the number of unique questions answered in each group. Add the
 * number for each group to receive the final answer.
 * 
 * Part 2: Find the number of questions everyone in the group answered 'yes' to.
 * Add this number up for each group to receive the final answer.
 */

const fs = require('fs');
const groups = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')
  .filter(l => l);

const groupAnswers = groups.map(g => g.split('\n'));

/**
 * Part One.
 * 
 * We first loop through every group. Then loop through each persons' questions
 * answered 'yes'. A set is used to track only the unique questions answered.
 */
const partOne = () => {
  const answerCounts = groupAnswers.map((ga) => {
    const uniqueAnswers = new Set();

    ga.forEach((answers) => {
      for (let answer of answers) {
        uniqueAnswers.add(answer);
      }
    });

    return uniqueAnswers.size;
  });

  const sum = answerCounts.reduce((sum, count) => sum + count);
  printOutput(1, sum);
}

/**
 * Part Two.
 * 
 * We first loop through every group. Then loop through each persons' questions
 * answered 'yes'. An object is created for each group where the keys are
 * populated with each encountered question and the value is the number of
 * times that question is answered 'yes' in the group. Once the object has
 * been fully populated with keys and values, we check each value to see if it
 * matches the number of people in the group i.e. all of them answered 'yes'.
 */
const partTwo = () => {
  const answerCounts = groupAnswers.map((ga) => {
    const answerMatches = {};
    const numPeopleInGroup = ga.length;
    let numQuestionsAnsweredByEveryone = 0;

    ga.forEach((answers) => {
      for (let answer of answers) {
        if (answerMatches.hasOwnProperty(answer)) {
          answerMatches[answer]++;
        } else {
          answerMatches[answer] = 1;
        }
      }
    });

    Object.values(answerMatches).forEach((m) => {
      if (m === numPeopleInGroup) {
        numQuestionsAnsweredByEveryone++;
      }
    });

    return numQuestionsAnsweredByEveryone;
  });

  const sum = answerCounts.reduce((sum, count) => sum + count);
  printOutput(2, sum);
}

const printOutput = (part, answer) => {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

partOne();
partTwo();
