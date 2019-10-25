import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { ActionType } from '../action-type';

export class TrainedEye extends CraftingAction {
  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    return (
      simulationState.crafterStats.level - simulationState.recipe.lvl >= 10 &&
      simulationState.steps.length === 0
    );
  }

  execute(simulation: Simulation): void {
    simulation.quality = simulation.recipe.quality;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 250;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100283, 100284, 100285, 100286, 100287, 100288, 100289, 100290];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 80 };
  }

  getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getType(): ActionType {
    return ActionType.QUALITY;
  }
}
