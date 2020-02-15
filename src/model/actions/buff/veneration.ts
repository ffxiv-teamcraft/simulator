import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class Veneration extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 15 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 18;
  }

  getBuff(): Buff {
    return Buff.VENERATION;
  }

  getDuration(simulation: Simulation): number {
    return 4;
  }

  getIds(): number[] {
    return [100137, 100138, 100139, 100140, 100141, 100142, 100143, 100144];
  }

  getInitialStacks(): number {
    return 0;
  }

  canBeClipped(): boolean {
    return true;
  }

  getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
