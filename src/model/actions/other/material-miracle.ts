import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { StepState } from '../../step-state';
import { Buff } from '../../buff.enum';

export class MaterialMiracle extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 1 };
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return !simulationState.safe;
  }

  execute(simulation: Simulation, safe: boolean): void {
    // DO NOTHING, THIS IS PURELY FOR REPLAY PURPOSE
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [41269];
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  skipOnFail(): boolean {
    return true;
  }
}
