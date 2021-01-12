export enum StepState {
  // Fails the step
  NONE,
  NORMAL,
  GOOD,
  EXCELLENT, // Not available on expert recipes
  POOR,      // Not available on expert recipes
  // Only for expert recipes
  CENTERED,  // Increase success rate by 25%
  STURDY,    // Reduces loss of durability by 50%, stacks with WN & WN2
  PLIANT,    // Reduces CP cost by 50%
  // Only for super expert recipes
  MALLEABLE, // Good, but for Progress. Doesn't proc Intensive/Precise.
  PRIMED     // Next status is +2 duration
}
