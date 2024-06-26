import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { ActionResult } from '../../action-result';

export class TrainedPerfection extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 100 };
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return (
      simulationState.crafterStats.specialist &&
      !simulationState.steps.some((step: ActionResult) => step.action.is(TrainedPerfection))
    );
  }

  execute(simulation: Simulation): void {
    // Do nothing
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100475, 100476, 100477, 100478, 100479, 100480, 100481, 100482];
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  skipOnFail(): boolean {
    return true;
  }
}
