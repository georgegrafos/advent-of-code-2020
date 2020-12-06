/**
 * Date: December 1, 2020
 * 
 * Part 1: Find which two numbers in the input array add up to 2020. Then
 * multiply those two numbers. The result is the answer.
 * 
 * Part 2: Find which three numbers in the input array add up to 2020. Then
 * multiply those three numbers. The result is the answer.
 * 
 * The input is read in as a text file and converted to a number array. It is
 * then sorted. The answers to each part are found using nested for loops.
 */

const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(n => parseInt(n))
  .map(n => parseInt(n));
const sum = 2020;

input.sort((a, b) => a - b);

/**
 * Part One.
 *
 * Loop our list twice, starting the second loop one index after the first
 * in order to avoid comparing the same number. Similarly, stop the first
 * loop one index before the second to avoid comparing the last number with
 * itself.
 */
function findSumOf2020WithTwoNums() {
  let answer;

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === sum) {
        answer = input[i] * input[j];
        break;
      }
    }
  }

  printOutput(1, answer);
}

/**
 * Part Two.
 *
 * Loop our list thrice, starting each loop one index after the previous one
 * in order to avoid comparing the same number. Similarly, stop looping each
 * loop one index apart so there is no overlap in comparing the last three
 * values.
 */
function findSumOf2020WithThreeNums() {
  let answer;

  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === sum) {
          answer = input[i] * input[j] * input[k];
          break;
        }
      }
    }
  }

  printOutput(2, answer);
}

function printOutput(part, answer) {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

findSumOf2020WithTwoNums();
findSumOf2020WithThreeNums();
