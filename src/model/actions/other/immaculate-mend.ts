import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';

export class ImmaculateMend extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 98 };
  }

  public getType(): ActionType {
    return ActionType.REPAIR;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  execute(simulation: Simulation): void {
    simulation.durability = simulation.recipe.durability;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 112;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100467, 100468, 100469, 100470, 100471, 100472, 100473, 100474];
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  skipOnFail(): boolean {
    return true;
  }
}
