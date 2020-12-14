import { map } from 'rxjs/operators';
import { testEach, exactDigits, inRange, isHex } from '../utils';
import { bufferUntilBlank } from '../utils/operators';

// VALIDATION RULES
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//   If cm, the number must be at least 150 and at most 193.
//   If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const isHeightFormat = (value) => /^\d+(cm|in)$/.test(value);
const isHeightInRange = (value) =>
  inRange(...(value.includes('cm') ? [150, 193] : [59, 76]))(
    Number.parseInt(value)
  );

const validEyeColor = (value) =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);

export const fieldValidations = {
  byr: testEach(exactDigits(4), inRange(1920, 2002)),
  iyr: testEach(exactDigits(4), inRange(2010, 2020)),
  eyr: testEach(exactDigits(4), inRange(2020, 2030)),
  hgt: testEach(isHeightFormat, isHeightInRange),
  hcl: isHex,
  ecl: validEyeColor,
  pid: exactDigits(9),
  cid: () => true,
};

const hasValidFieldValues = (passport) =>
  Object.entries(fieldValidations).every(([field, validate]) =>
    validate(passport[field])
  );

export const hasAllFields = (passport) =>
  Object.keys(fieldValidations)
    .filter((f) => f !== 'cid')
    .every((field) => field in passport);

export const isValidPassport = (passport) =>
  hasAllFields(passport) && hasValidFieldValues(passport);

export const inputToPassport = () => (lines$) => {
  return lines$.pipe(
    bufferUntilBlank(),
    map((info) =>
      info
        .join(' ')
        .split(' ')
        .map((field) => field.split(':'))
        .reduce((data, [key, value]) => {
          data[key] = value;
          return data;
        }, {})
    )
  );
};
