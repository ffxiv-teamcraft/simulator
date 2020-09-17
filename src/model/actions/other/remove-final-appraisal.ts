import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';

export class RemoveFinalAppraisal extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 42 };
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  execute(simulation: Simulation): void {
    simulation.removeBuff(Buff.FINAL_APPRAISAL);
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [-1];
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  skipsBuffTicks(): boolean {
    return true;
  }
}
