import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';

export class Reflect extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 69 };
  }

  _canBeUsed(simulation: Simulation): boolean {
    return simulation.steps.filter((step) => !step.action.skipsBuffTicks()).length === 0;
  }

  skipOnFail(): boolean {
    return true;
  }

  canBeMoved(currentIndex: number): boolean {
    return currentIndex > 0;
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    simulation.addInnerQuietStacks(1);
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 6;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100387, 100388, 100389, 100390, 100391, 100392, 100393, 100394];
  }

  getPotency(simulation: Simulation): number {
    return 300;
  }
}
