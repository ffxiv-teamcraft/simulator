import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { ActionType } from '../action-type';

export class TrainedInstinct extends CraftingAction {
  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    return (
      simulationState.crafterStats.level - simulationState.recipe.lvl >= 10 &&
      simulationState.steps.length === 0
    );
  }

  execute(simulation: Simulation): void {
    simulation.quality += Math.floor(simulation.recipe.quality * 0.3);
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 250;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100291, 100292, 100293, 100294, 100295, 100296, 100297, 100298];
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
