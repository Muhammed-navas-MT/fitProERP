export const convertInrToUsd = (
  amountInInr: number,
  exchangeRate: number,
): number => {
  if (amountInInr <= 0) {
    throw new Error("Amount in INR must be greater than 0");
  }

  if (exchangeRate <= 0) {
    throw new Error("Exchange rate must be greater than 0");
  }

  return Number((amountInInr / exchangeRate).toFixed(2));
};

export const convertUsdToInr = (
  amountInUsd: number,
  exchangeRate: number,
): number => {
  if (amountInUsd <= 0) {
    throw new Error("Amount in USD must be greater than 0");
  }

  if (exchangeRate <= 0) {
    throw new Error("Exchange rate must be greater than 0");
  }

  return Number((amountInUsd * exchangeRate).toFixed(2));
};

export const convertInrToUsdCents = (
  amountInInr: number,
  exchangeRate: number,
): number => {
  const usd = convertInrToUsd(amountInInr, exchangeRate);

  return Math.round(usd * 100);
};

export const roundToTwo = (value: number): number => {
  return Number(value.toFixed(2));
};
