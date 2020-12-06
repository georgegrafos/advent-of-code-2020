/**
 * Date: December 2, 2020
 * 
 * Part 1: Find the number of passwords that contain the given letter a number
 * of times that is within the given range (min-max).
 * 
 * Part 2: The numbers given on each line of input now refer to two positions
 * in the passwords, not a number range. These positions do not work on a zero
 * index! Valid passwords must contain the given number in only one of the
 * positions given.
 *
 * I decided to use a regex and capture groups instead of a split to get each
 * element in the input lines. This is to avoid a case where a line might not
 * be correctly formatted with spaces between the elements, which would cause
 * a split on spaces to not get all the elements correctly. 
 */

const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(x => x);

/**
 * Matched output array:
 * 
 * Index 0: full match
 * Index 1: the range (#-#)
 * Index 2: letter to match
 * Index 3: password string to check
 */
const regexp = /(\d+-\d+)\s*([a-zA-Z]).*?([a-zA-Z]+)/;

/**
 * Part One.
 * 
 * We loop through each line and split it into the needed elements using a
 * regex. A split is then done on the number range in order to get the min
 * and max numbers to check. We then loop through each character of the
 * password and check if it is equivalent to the given letter. A counter
 * is used to track the number of matches in the password. The count is
 * then checked if it falls within the range.
 */
function findNumOfValidPasswordsPartOne() {
  let numValidPasswords = 0;

  for (let line of input) {
    const regexMatch = line.match(regexp);
    const numRange = regexMatch[1].split('-');
    const min = numRange[0];
    const max = numRange[1];
    const matchLetter = regexMatch[2];
    const password = regexMatch[3];
    let matchCount = 0;
  
    for (let c of password) {
      if (c === matchLetter) {
        matchCount++;
      }
    }
  
    if (matchCount >= min && matchCount <= max) {
      numValidPasswords++;
    }
  }

  printOutput(1, numValidPasswords);
}

/**
 * Part Two.
 * 
 * We loop through each line and split it into the needed elements using a
 * regex. A split is then done on the number range in order to get the min
 * and max numbers to check. We then check if the letter matches each given
 * position, taking into account that they are not zero index based. 
 */
function findNumOfValidPasswordsPartTwo() {
  let numValidPasswords = 0;

  for (let line of input) {
    const regexMatch = line.match(regexp);
    const positions = regexMatch[1].split('-');
    const firstPos = positions[0];
    const secondPos = positions[1];
    const matchLetter = regexMatch[2];
    const password = regexMatch[3];

    let isMatchedInFirstPos = password[firstPos - 1] === matchLetter;
    let isMatchedInSecondPos = password[secondPos - 1] === matchLetter;

    if (
      (isMatchedInFirstPos || isMatchedInSecondPos) &&
      !(isMatchedInFirstPos && isMatchedInSecondPos)
    ) {
      numValidPasswords++
    }
  }

  printOutput(2, numValidPasswords);
}

function printOutput(part, answer) {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

findNumOfValidPasswordsPartOne();
findNumOfValidPasswordsPartTwo();
