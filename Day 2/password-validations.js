export const passwordHasValidCharOccurences = (rule, letter, password) => {
  const range = rule.split('-');
  const occurences = [...password].filter((char) => char === letter).length;
  return occurences >= range[0] && occurences <= range[1];
};

export const passwordHasCharAtOnePosition = (rule, letter, password) => {
  const range = rule.split('-').map((index) => index - 1);
  return (
    (password[range[0]] === letter || password[range[1]] === letter) &&
    !(password[range[0]] === letter && password[range[1]] === letter)
  );
};
