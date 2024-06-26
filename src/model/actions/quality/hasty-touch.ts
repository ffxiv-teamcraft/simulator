import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';

export class HastyTouch extends QualityAction {
  override execute(
    simulation: Simulation,
    safe: boolean = false,
    skipStackAddition: boolean = false
  ) {
    super.execute(simulation, safe, skipStackAddition);
    simulation.buffs.push({
      duration: 1,
      buff: Buff.EXPEDIENCE,
      stacks: 1,
      appliedStep: simulation.steps.length,
    });
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 9 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 60;
  }

  getIds(): number[] {
    return [100355, 100356, 100357, 100358, 100359, 100360, 100361, 100362];
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }
}
