import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';
import { QualityAction } from '../quality-action';

export class TrainedFinesse extends QualityAction {
  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    return (
      simulationState.hasBuff(Buff.INNER_QUIET) &&
      simulationState.getBuff(Buff.INNER_QUIET).stacks === 10
    );
  }

  getBaseCPCost(simulationState: Simulation): number {
    // TODO fix once servers are up
    return 24;
  }

  getIds(): number[] {
    // TODO fix once servers are up
    return [100283, 100284, 100285, 100286, 100287, 100288, 100289, 100290];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 90 };
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }
}
