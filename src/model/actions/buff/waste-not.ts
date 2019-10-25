import { BuffAction } from '../buff-action';
import { Buff } from '../../buff.enum';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';

export class WasteNot extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 15 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 56;
  }

  getDuration(simulation: Simulation): number {
    return 8;
  }

  getIds(): number[] {
    return [279];
  }

  getBuff(): Buff {
    return Buff.WASTE_NOT;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
