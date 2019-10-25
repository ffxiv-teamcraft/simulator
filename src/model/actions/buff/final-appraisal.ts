import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class FinalAppraisal extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 42 };
  }

  // TODO: get action cost
  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDuration(simulation: Simulation): number {
    return 5;
  }

  // TODO get new action IDs
  getIds(): number[] {
    return [286];
  }

  getBuff(): Buff {
    return Buff.FINAL_APPRAISAL;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
