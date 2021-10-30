export const prevDividend = (number, divider) => {
  const quotient = Math.trunc(number / divider);

  const dividend = divider * quotient;

  return dividend;
};
