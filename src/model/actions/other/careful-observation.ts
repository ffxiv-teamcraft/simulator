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
    return (
      simulationState.crafterStats.specialist &&
      simulationState.actions.filter(a => a.is(CarefulObservation)).length < 3
    );
  }

  execute(simulation: Simulation): void {
    simulation.tickState();
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  // TODO get new action IDs
  getIds(): number[] {
    return [100251, 100252, 100253, 100254, 100255, 100256, 100257, 100258];
  }

  getSuccessRate(simulationState: Simulation): number {
    return 100;
  }
}
