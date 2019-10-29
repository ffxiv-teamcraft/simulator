import { BuffAction } from '../buff-action';
import { Buff } from '../../buff.enum';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';

export class WasteNotII extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 47 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 98;
  }

  getDuration(simulation: Simulation): number {
    return 8;
  }

  getIds(): number[] {
    return [4639, 4640, 4641, 4642, 4643, 4644, 19002, 19003];
  }

  getBuff(): Buff {
    return Buff.WASTE_NOT;
  }

  getInitialStacks(): number {
    return 0;
  }

  public getOverrides(): Buff[] {
    return super.getOverrides().concat(Buff.WASTE_NOT);
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
