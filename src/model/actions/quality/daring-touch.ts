import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';

export class DaringTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 96 };
  }

  hasCombo(simulation: Simulation): boolean {
    return simulation.hasBuff(Buff.EXPEDIENCE);
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return simulationState.hasBuff(Buff.EXPEDIENCE);
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 60;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100451, 100452, 100453, 100454, 100455, 100456, 100457, 100458];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
