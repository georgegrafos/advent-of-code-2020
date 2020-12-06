/**
 * Date: December 3, 2020
 * 
 * Part 1: Starting at the top-left corner of your map and following a slope of
 * right 3 and down 1, how many trees would you encounter? Note that the same
 * pattern repeats to the right many times.
 * 
 * Part 2: Determine the number of trees you would encounter if, for each of
 * the slopes, you start at the top-left corner and traverse the map all the
 * way to the bottom. Then multiply the numbers together to find the answer.
 */

const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(r => r);

const tree = '#';
const treeMark = 'X';
const openSquare = '.';
const openSquareMark = 'O';
const slopes = [
  {
    right: 1, down: 1
  },
  {
    right: 3, down: 1
  },
  {
    right: 5, down: 1
  },
  {
    right: 7, down: 1
  },
  {
    right: 1, down: 2
  },
]

/**
 * Find the number of trees encountered using a slope of 3
 * to the right and 1 down.
 */
function partOne() {
  console.log('\n\nPart 1:\n');
  findNumberOfTreesEncountered(3, 1);
  console.log('\n====================');
}

/**
 * Find the number of trees encountered using each slope in the slopes array.
 * Then multiply the numbers together to get the answer.
 */
function partTwo() {
  let treesEncountered = [];

  console.log('\n\nPart 2:\n');

  slopes.forEach((slope) => {
    treesEncountered.push(
      findNumberOfTreesEncountered(slope.right, slope.down)
    );
  });

  let answer = treesEncountered.reduce((acc, val) => acc * val);
  console.log(`\n\nAnswer: ${answer}`);
}

/**
 * 
 * @param {number} moveRight - How many positions to the right to move
 * @param {number} moveDown - How many positions down to move
 * 
 * We start at the top left square for each run. We loop through every line
 * of the input until we hit the bottom. The pattern loops, so before moving
 * to the right, we determine if the move will result in going over the edge.
 * If it does, we have to loop back around to the beginning of the row. When
 * we determine the correct square to move to, we simply check the string to
 * see if it's a tree or open square and add to the trees encountered count
 * accordingly. The number of trees encountered at the end is returned.
 */
function findNumberOfTreesEncountered(moveRight, moveDown) {
  let currentRow = 0;
  let currentColumn = 0;
  let numTreesEncountered = 0;
  let inputCopy = [...input];

  while ((currentRow += moveDown) < input.length) {
    // Check each row length in case they differ
    let currentRowLength = input[currentRow].length;
    let nextColumn = currentColumn + moveRight;

    // Subtract one for index
    // Loop back to the beginning of the row if right movement goes over
    if (nextColumn > (currentRowLength - 1)) {
      // Subtract one again for index handling
      currentColumn = (nextColumn - (currentRowLength - 1)) - 1;
    } else {
      currentColumn += moveRight;
    }

    let currentSquare = input[currentRow][currentColumn];

    if (currentSquare === tree) {
      numTreesEncountered++;
      inputCopy[currentRow] = replaceCharAt(
        inputCopy[currentRow],
        currentColumn,
        treeMark
      );
    } else {
      inputCopy[currentRow] = replaceCharAt(
        inputCopy[currentRow],
        currentColumn,
        openSquareMark
      );
    }
  }

  // Display updated input
  // console.table(inputCopy);
  console.log(`\nNumber of trees encountered: ${numTreesEncountered}`);
  return numTreesEncountered;
}

/**
 * 
 * @param {string} line - Line to update
 * @param {number} index - Position to place replacement
 * @param {string} replacement - Character to swap in
 * 
 * Takes a string and replaces the character at the given index with the
 * replacement string. Returns the new string.
 */
function replaceCharAt(line, index, replacement) {
  return (
    line.substr(0, index) +
    replacement +
    line.substr(index + replacement.length)
  );
}

partOne();
partTwo();