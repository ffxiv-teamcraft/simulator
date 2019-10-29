import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class Ingenuity extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 15 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 22;
  }

  getDuration(simulation: Simulation): number {
    return 5;
  }

  getIds(): number[] {
    return [4623, 4624, 4625, 4626, 4627, 4628, 4629, 4630];
  }

  getBuff(): Buff {
    return Buff.INGENUITY;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
