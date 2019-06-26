import { PieceByPiece } from './piece-by-piece';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { CraftingAction } from '../crafting-action';

/**
 * MuMe is just piece by piece with a different condition, cost and success rate.
 */
export class MuscleMemory extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.CUL, level: 54 };
  }

  public getType(): ActionType {
    return ActionType.PROGRESSION;
  }

  _canBeUsed(simulation: Simulation): boolean {
    return simulation.steps.length === 0;
  }

  getBaseCPCost(simulation: Simulation): number {
    return 6;
  }

  getIds(): number[] {
    return [100136];
  }

  execute(simulation: Simulation): void {
    const remainingProgress = simulation.recipe.progress - simulation.progression;
    simulation.progression += Math.max(Math.floor(remainingProgress * 0.33), 1000);
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getSuccessRate(simulationState: Simulation): number {
    return 100;
  }
}
