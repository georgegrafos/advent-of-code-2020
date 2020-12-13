/**
 * Part 1: Find the number of bags that will eventually contain a shiny gold bag.
 * 
 * Part 2: Find the number of bags a shiny gold bag contains.
 */

const fs = require('fs');
const rules = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(l => l);

/**
 * Using the list of rules, we create an object where each key is a bag colour.
 * The values are the types and number of bags each bag can contain.
 * 
 * @param {string[]} rules - List of rules
 */
const getBagTypes = (rules) => {
  const bagTypes = {};
  const getCount = /^(\d+|no)(.+)/;

  rules.forEach(rule => {
    const parts = rule.split(' contain ');
    const bagType = parts[0].replace(' bags', '');
    const containedBags = parts[1].replace('.', '').split(', ');

    bagTypes[bagType] = {};

    containedBags.forEach((bag) => {
      let match = bag.match(getCount);
      let count = match[1];
      let type = match[2].trim();
      count = count === 'no' ? 0 : parseInt(count)
      const subBagType = type.replace(' bags', '').replace(' bag', '');
      bagTypes[bagType][subBagType] = count;
    });
  });

  return bagTypes;
}

/**
 * We recursively check every child bag until we reach the end, or find the
 * matching colour. If the matching colour is found, we return true.
 * 
 * @param {Object} bags - Bags left to be checked
 * @param {string} bagColour - Colour to find matches of
 * @param {Object} checked - Contains checked bag colours
 */
const containsBagColour = (bags, bagColour, checked) => {
  for (colour in bags) {
    if (bagColour === colour) {
      return true;
    }

    // Don't re-check bag colours
    if (!checked.hasOwnProperty(colour) && bags.hasOwnProperty(colour)) {
      checked[colour] = true;

      if (containsBagColour(allBags[colour], bagColour, checked)) {
        return true;
      }
    }
  }
}

/**
 * We recursively check each child bag of the bag we want to know the number
 * of bags it contains like a depth first search. When we reach the end of
 * one branch, we return the number of bags it contains and multiply that
 * by the number of that coloured bag contained in its parent. So on and so on.
 * 
 * @param {string} bagColour - Bag to find the number of bags it contains
 */
const howManyBagsContained = (bagColour) => {
  let count = 0;

  for (subColour in allBags[bagColour]) {
    if (subColour !== 'other') {
      const subColourCount = allBags[bagColour][subColour];
      count += subColourCount;
      count += subColourCount * howManyBagsContained(subColour);
    }
  }
  return count;
}

const allBags = getBagTypes(rules);

const partOne = () => {
  let matches = 0;

  for (colour in allBags) {
    if (containsBagColour(allBags[colour], 'shiny gold', {})) {
      matches++;
    }
  }

  printOutput(1, matches);
}

const partTwo = () => {
  let numBags = 0;
  numBags = howManyBagsContained('shiny gold');
  printOutput(2, numBags);
}

const printOutput = (part, answer) => {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

partOne();
partTwo();
