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
    return 4;
  }

  getIds(): number[] {
    return [4631, 4632, 4633, 4634, 4635, 4636, 4637, 4638];
  }

  getBuff(): Buff {
    return Buff.WASTE_NOT;
  }

  getInitialStacks(): number {
    return 0;
  }

  canBeClipped(): boolean {
    return true;
  }

  public getOverrides(): Buff[] {
    return super.getOverrides().concat(Buff.WASTE_NOT_II);
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
