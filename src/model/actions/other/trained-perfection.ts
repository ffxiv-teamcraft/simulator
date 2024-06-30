import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { ActionResult } from '../../action-result';
import { BuffAction } from '../buff-action';
import { Buff } from '../../buff.enum';

export class TrainedPerfection extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 100 };
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return !simulationState.steps.some((step: ActionResult) => step.action.is(TrainedPerfection));
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100475, 100476, 100477, 100478, 100479, 100480, 100481, 100482];
  }

  getBuff(): Buff {
    return Buff.TRAINED_PERFECTION;
  }

  getDuration(simulation: Simulation): number {
    return Infinity;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick():
    | ((simulation: Simulation, linear?: boolean, action?: CraftingAction) => void)
    | undefined {
    return undefined;
  }
}
