/**
 * Date: December 5, 2020
 * 
 * Part 1: Find the seats attributed to each boarding pass from the input by
 * converting the row and seat designations to integers. Then apply the
 * equation row * 8 + seat to find the seat IDs. The answer is the largest ID.
 * 
 * Part 2: Determine your own seat ID knowing it is missing from the boarding
 * pass list. Note that seats at the front and back of the plane were not part
 * of the input, but we know our seat was somewhere in between.
 */

const fs = require('fs');
const boardingPasses = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(l => l);

const pattern = /^[FB]{7}[LR]{3}$/;
const matches = (pattern) => (string) => pattern.test(string);
const isValidBoardingPass = (pass) => matches(pattern)(pass);
const validPasses = boardingPasses.filter(isValidBoardingPass);

const getUpperHalf = (max, min) => min + Math.ceil((max - min) / 2);
const getLowerHalf = (max, min) => max - Math.ceil((max - min) / 2);

const sortAscending = (list) => list.sort((a, b) => a - b);

const numRows = 127;    // 0 index based
const numSeats = 7;     // 0 index based
const multiplier = 8;

/**
 * Part One.
 * 
 * We loop through all valid boarding passes and split the pass into the row
 * designation and seat designation. We then loop through both designations,
 * checking the value of each character and splitting the row and seat
 * numbers until the seat attributed to the boarding pass is found. The given
 * equation is then applied to find the seat's ID and added to the seatIds
 * array. The array is returned on completion.
 */
const findAllSeatIds = () => {
  const seatIds = validPasses.map((pass) => {
    const rowDesignation = pass.slice(0, 7);
    const seatDesignation = pass.slice(7, 10);
    let minRow = 0;
    let maxRow = numRows;
    let minSeat = 0;
    let maxSeat = numSeats;
    let row;
    let seat;

    for (let c of rowDesignation) {
      if (c === 'F') {
        maxRow = getLowerHalf(maxRow, minRow);
        row = maxRow;
      } else {
        minRow = getUpperHalf(maxRow, minRow);
        row = minRow;
      }
    }

    for (let c of seatDesignation) {
      if (c === 'R') {
        minSeat = getUpperHalf(maxSeat, minSeat);
        seat = minSeat;
      } else {
        maxSeat = getLowerHalf(maxSeat, minSeat);
        seat = maxSeat;
      }
    }

    return row * multiplier + seat;
  });

  return sortAscending(seatIds);
}

/**
 * 
 * @param {int[]} seatIds - List of seat IDs in ascending order
 * 
 * Part Two
 * 
 * We loop through all the found seat IDs and check if the ID after any are
 * missing. If the seat ID behind is missing, we must also check if the ID 
 * behind that one is also missing to ensure we haven't reached the back of
 * the plane. If the second seat ID does exist, then we have found our seat.
 */
const findMySeat = (seatIds) => {
  const seatBeforeOwn = seatIds.find((id) => {
    return !seatIds.includes(id - 1) && seatIds.includes(id - 2)
  });
  return seatBeforeOwn - 1;
}

const printOutput = (part, answer) => {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

const sortedSeatIds = findAllSeatIds();
printOutput(1, sortedSeatIds[sortedSeatIds.length-1]);

const mySeat = findMySeat(sortedSeatIds);
printOutput(2, mySeat);
