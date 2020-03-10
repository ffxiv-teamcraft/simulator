export enum StepState {
  NORMAL,
  GOOD,
  EXCELLENT, // Not available on expert recipes
  POOR, // Not available on expert recipes
  // Only for expert recipes
  CENTERED, // Increase success rate by 25%
  STURDY, // Reduces loss of durability by 50%, stacks with WN & WN2
  PLIANT, // Reduces CP cost by 50%
  // Fails the step
  FAILED
}
