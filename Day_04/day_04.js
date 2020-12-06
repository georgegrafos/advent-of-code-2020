/**
 * Date: December 4, 2020
 * 
 * The goal is to determine which passports from the input are valid. Each
 * passport is represented as a sequence of key:value pairs separated by
 * spaces or newlines. Passports are separated by blank lines.Passports
 * are valid if they contain the following fields:
 * 
 * - byr (Birth Year)
 * - iyr (Issue Year)
 * - eyr (Expiration Year)
 * - hgt (Height)
 * - hcl (Hair Color)
 * - ecl (Eye Color)
 * - pid (Passport ID)
 * - cid (Country ID)
 * 
 * Part 1: Treat the field cid as optional.
 * 
 * Part 2: Each field now has more strict rules to determine if they are valid.
 * Continue to ignore the cid field.
 */

const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')
  .filter(l => l);

const fields = {
  BYR: 'byr',
  IYR: 'iyr',
  EYR: 'eyr',
  HGT: 'hgt',
  HCL: 'hcl',
  ECL: 'ecl',
  PID: 'pid',
}

// Field regex checks
const regChecks = {
  [fields.BYR]: /^\d{4}$/,
  [fields.IYR]: /^\d{4}$/,
  [fields.EYR]: /^\d{4}$/,
  [fields.HGT]: /^(\d+)(cm|in)$/,
  [fields.HCL]: /^#[0-9a-f]{6}$/,
  [fields.ECL]: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  [fields.PID]: /^\d{9}$/,
}

/**
 * Part One.
 * 
 * We loop through all passports and convert them to objects with all the
 * fields as keys. Then we validate each by checking that all required fields
 * exist as keys in the passport object.
 */
function findValidPassports() {
  const passports = input.filter((passport) => {
    let passportFields = passport.replace(/\n/g, " ").split(/\s+/);
    let passportObj = {};
    let validPassport = true;

    passportFields.forEach((field) => {
      const key = field.trim().split(':')[0];
      const value = field.trim().split(':')[1];
      passportObj[key] = value;
    });

    validPassport = Object.values(fields).every((field) => {
      if (!(field in passportObj)) {
        return false;
      }
      return true;
    });

    if (validPassport) {
      return passportObj;
    }
  });
  printOutput(1, passports.length);
}

/**
 * Part Two.
 * 
 * We loop through all passports and convert them to objects with all the
 * fields as keys. Then we validate each by checking that all required fields
 * exist as keys in the passport object. Taking all passports that contain the
 * required fields, we further validate that each field matches the given rule.
 */
function findValidPassportsWithStrictRules() {
  const passports = input.filter((passport) => {
    let passportFields = passport.replace(/\n/g, " ").split(/\s+/);
    let passportObj = {};
    let validPassport = true;

    passportFields.forEach((field) => {
      const key = field.trim().split(':')[0];
      const value = field.trim().split(':')[1];
      passportObj[key] = value;
    });

    validPassport = Object.values(fields).every((field) => {
      if (!(field in passportObj)) {
        return false;
      }

      let validField = true;

      if (passportObj[field].match(regChecks[field])) {
        if (field === fields.HGT) {
          const groups = passportObj[field].match(regChecks[field]);
          const data = {
            value: parseInt(groups[1]),
            unit: groups[2]
          }
          validField = isPassportFieldValid(field, data.value, data.unit);
        } else {
          validField = isPassportFieldValid(field, passportObj[field]);
        }

        // No need to further check fields if even one is invalid
        if (!validField) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    });

    if (validPassport) {
      return passportObj;
    }
  });
  printOutput(2, passports.length);
}

/**
 * 
 * @param {string} field - Passport field
 * @param {number} value - Value of the passport field
 * @param {any} additionalData - Any additional data needed to validate a field
 * 
 * Additional rule checks required for some fields.
 */
function isPassportFieldValid(field, value, additionalData = null) {
  switch (field) {
    case fields.BYR:
      return value >= 1920 && value <= 2002;

    case fields.IYR:
      return value >= 2010 && value <= 2020;

    case fields.EYR:
      return value >= 2020 && value <= 2030;

    case fields.HGT:
      if (additionalData === 'cm') {
        return value >= 150 && value <= 193;
      } else {
        return value >= 59 && value <= 76;
      }
  
    default:
      return true;
  }
}

function printOutput(part, answer) {
  console.log('\n');
  console.log(`Part ${part}:\n`);
  console.log(`Answer: ${answer}`);
  console.log('\n====================\n');
}

findValidPassports();
findValidPassportsWithStrictRules();
