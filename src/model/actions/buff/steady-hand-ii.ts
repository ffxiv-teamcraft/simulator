import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class SteadyHandII extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 37 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 25;
  }

  getDuration(simulation: Simulation): number {
    return 5;
  }

  getIds(): number[] {
    return [4607, 4608, 4609, 4610, 4611, 4612, 4613, 4614];
  }

  public getOverrides(): Buff[] {
    return super.getOverrides().concat(Buff.STEADY_HAND);
  }

  getBuff(): Buff {
    return Buff.STEADY_HAND_II;
  }

  getInitialStacks(): number {
    return 0;
  }

  // Steady hand has no tick.
  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
