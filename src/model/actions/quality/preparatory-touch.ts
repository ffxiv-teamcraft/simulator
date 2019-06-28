import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class PreparatoryTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 71 };
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    if (simulation.hasBuff(Buff.INNER_QUIET) && simulation.getBuff(Buff.INNER_QUIET).stacks < 11) {
      simulation.getBuff(Buff.INNER_QUIET).stacks++;
    }
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 36;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 20;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 70;
  }

  getIds(): number[] {
    return [100299, 100300, 100301, 100302, 100303, 100305, 100306];
  }

  getPotency(simulation: Simulation): number {
    return 200;
  }
}
