import BN from 'bn.js'

const KILT_POWER = 15

const PRECISION = 2
const FORMAT = {
  minimumFractionDigits: PRECISION,
  maximumFractionDigits: PRECISION,
}

export function asKiltCoins(amount: BN): string {
  const amountString = amount.toString().padStart(16, '0')
  const whole = amountString.slice(0, -KILT_POWER)
  const fraction = amountString.slice(-KILT_POWER)

  const visible = fraction.slice(0, PRECISION)
  const discarded = fraction.slice(PRECISION)
  const roundDown = discarded.match(/^0*$/)
  const replacement = roundDown ? '0' : '9'

  const numberWithFractions = parseFloat(`${whole}.${visible}${replacement}`)

  return numberWithFractions.toLocaleString(window.navigator.language, FORMAT)
}
