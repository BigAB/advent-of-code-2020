import { pipe } from '../utils';

export const NUM_OF_ROWS = 128;
export const NUM_OF_COLUMNS = 8;

export const bisectReduceByCodes = ({
  codes: [code, ...codes],
  lowerCode,
  range: [min, max],
}) => {
  const halfWay = (max - min + 1) / 2 + min;
  const range = code === lowerCode ? [min, halfWay - 1] : [halfWay, max];

  return codes.length === 0
    ? range[0]
    : bisectReduceByCodes({ codes, lowerCode, range });
};

const calculateSeatPositionFromBspCode = (bspCode) => {
  const charCodes = bspCode.split('');
  const rowCodes = bspCode.slice(0, 7).split('');
  const columnCodes = charCodes.slice(7);
  const row = bisectReduceByCodes({
    codes: rowCodes,
    lowerCode: 'F',
    range: [0, NUM_OF_ROWS - 1],
  });

  const column = bisectReduceByCodes({
    codes: columnCodes,
    lowerCode: 'L',
    range: [0, NUM_OF_COLUMNS - 1],
  });

  return { row, column };
};

const calculateSeatIdFromPosition = ({ row, column }) => {
  return row * NUM_OF_COLUMNS + column;
};

export const bspCodeToSeatId = pipe(
  calculateSeatPositionFromBspCode,
  calculateSeatIdFromPosition
);
