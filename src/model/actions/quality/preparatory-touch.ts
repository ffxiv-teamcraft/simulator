import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';

export class PreparatoryTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 71 };
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    simulation.addInnerQuietStacks(1);
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 40;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 20;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100299, 100300, 100301, 100302, 100303, 100304, 100305, 100306];
  }

  getPotency(simulation: Simulation): number {
    return 200;
  }
}
