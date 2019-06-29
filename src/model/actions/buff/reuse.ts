import { BuffAction } from '../buff-action';
import { CraftingJob } from '../../crafting-job.enum';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';

export class Reuse extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 74 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 60;
  }

  getDuration(simulation: Simulation): number {
    return Infinity;
  }

  getIds(): number[] {
    return [4597, 4598, 4599, 4600, 4601, 4602, 4603, 4604];
  }

  protected getBuff(): Buff {
    return Buff.REUSE;
  }

  protected getInitialStacks(): number {
    return 0;
  }

  // Reuse doesn't tick.
  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
