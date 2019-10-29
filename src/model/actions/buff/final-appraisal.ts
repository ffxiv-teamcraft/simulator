import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class FinalAppraisal extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 42 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 1;
  }

  getDuration(simulation: Simulation): number {
    return 5;
  }

  getIds(): number[] {
    return [19012, 19013, 19014, 19015, 19016, 19017, 19018, 19019];
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
