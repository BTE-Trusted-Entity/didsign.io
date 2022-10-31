import BN from 'bn.js';

const KILT_POWER = 15;

const PRECISION = 3;

const FORMAT = {
  minimumFractionDigits: PRECISION,
  maximumFractionDigits: PRECISION,
};

export function asKiltCoins(amount: BN): string {
  const amountString = amount.toString().padStart(16, '0');
  const whole = amountString.slice(0, -KILT_POWER);
  const fraction = amountString.slice(-KILT_POWER);
  const visible = fraction.slice(0, PRECISION);

  const numberWithFractions = parseFloat(`${whole}.${visible}`);

  return numberWithFractions.toLocaleString(window.navigator.language, FORMAT);
}
