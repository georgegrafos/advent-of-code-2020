/**
 * Date: December 1, 2020
 * 
 * Part 1: Find which two numbers in the input array add up to 2020. Then
 * multiply those two numbers. The result is the answer.
 * 
 * Part 2: Find which three numbers in the input array add up to 2020. Then
 * multiply those three numbers. The result is the answer.
 */


const fs = require('fs');
const input = fs
  .readFileSync('./input', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(n => parseInt(n))
  .map(n => parseInt(n));

input.sort((a, b) => a - b);

const numIndex = input.reduce((obj, v) => ((obj[v] = true), obj), {});
const sum = 2020;

/**
 * Part One.
 *
 * Loop our list and algebraicially determine if
 * a 2nd number that sums to 2020 exists.
 */
function findSumOf2020WithTwoNums() {
  const startTime = new Date();
  let answer;
  let values;

  for (let a of input) {
    let b = sum - a;
    if (numIndex[b]) {
      answer = a * b;
      values = { a, b };
      break;
    }
  }

  const endTime = new Date();
  printOutput(1, answer, values, startTime, endTime);
}

/**
 * Part Two.
 *
 * Loop our list again, but this time we first find the remaining sum.
 * Then, loop our list again. Skip the numbers we have already checked,
 * and exit if we arrive at a number that already sums greater than 2020
 * (we can do this because the list is sorted). Then, check if a third number
 * exists that sums up to 2020 with those two previously picked numbers.
 */
function findSumOf2020WithThreeNums() {
  const startTime = new Date();
  let answer;
  let values;

  for (let i = 0; i < input.length; i++) {
    let a = input[i];
    let remainder = sum - a;

    for (let j = i + 1; j < input.length; j++) {
      let b = input[j];
      if (b >= remainder) {
        break;
      }

      let c = sum - (a + b);
      if (numIndex[c]) {
        answer = a * b * c;
        values = { a, b, c };
        break;
      }
    }
  }

  const endTime = new Date();
  printOutput(2, answer, values, startTime, endTime);
}

function printOutput(part, answer, values, startTime, endTime) {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log('Values: ', values);
  console.log(`Answer: ${answer}`);
  console.log(`Time (in ms): ${endTime.getTime() - startTime.getTime()}`);
  console.log('\n====================\n');
}

findSumOf2020WithTwoNums();
findSumOf2020WithThreeNums();
