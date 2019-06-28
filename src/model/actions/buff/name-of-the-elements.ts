import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class NameOfTheElements extends BuffAction {
  _canBeUsed(simulation: Simulation): boolean {
    return simulation.actions.filter(action => action.is(NameOfTheElements)).length <= 1;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 15;
  }

  getDuration(simulation: Simulation): number {
    return 5;
  }

  protected getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation, linear?: boolean) => void) | undefined {
    return undefined;
  }

  protected getBuff(): Buff {
    return Buff.NAME_OF_THE_ELEMENTS;
  }

  getIds(): number[] {
    return [4615, 4616, 4617, 4618, 4619, 4620, 4621, 4622];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 37 };
  }
}
