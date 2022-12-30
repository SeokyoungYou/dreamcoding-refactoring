export function adjustedCapital(instrument) {
  return !isEligibleForAdjustedCapital()
    ? 0
    : (instrument.income / instrument.duration) * anInstrument.adjustmentFactor;
}

function isEligibleForAdjustedCapital(instrument) {
  return (
    instrument.capital < 0 &&
    instrument.interestRate > 0 &&
    instrument.duration > 0
  );
}
