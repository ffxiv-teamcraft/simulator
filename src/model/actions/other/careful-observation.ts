import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';

export class CarefulObservation extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 55 };
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return simulationState.crafterStats.specialist;
  }

  execute(simulation: Simulation): void {
    // As it just rolls the condition, nothing happens
    // We cannot make it not count the step because of replay and step by step view
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100395, 100396, 100397, 100398, 100399, 100400, 100401, 100402];
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  skipOnFail(): boolean {
    return true;
  }
}
