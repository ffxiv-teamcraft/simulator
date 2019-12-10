import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class Innovation extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 26 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 18;
  }

  getBuff(): Buff {
    return Buff.INNOVATION;
  }

  getDuration(simulation: Simulation): number {
    return 4;
  }

  getIds(): number[] {
    return [19004, 19005, 19006, 19007, 19008, 19009, 19010, 19011];
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
