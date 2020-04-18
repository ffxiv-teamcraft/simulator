import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class NameOfTheElements extends BuffAction {
  _canBeUsed(simulation: Simulation): boolean {
    return !simulation.buffs.some(buff => buff.buff === Buff.NAMELESS);
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 30;
  }

  getDuration(simulation: Simulation): number {
    return 3;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation, linear?: boolean) => void) | undefined {
    return undefined;
  }

  getOnExpire(): ((simulation: Simulation, linear?: boolean) => void) | undefined {
    return simulation => {
      simulation.buffs.push({
        buff: Buff.NAMELESS,
        duration: Infinity,
        appliedStep: simulation.steps.length,
        tick: undefined,
        stacks: 0
      });
    };
  }

  getBuff(): Buff {
    return Buff.NAME_OF_THE_ELEMENTS;
  }

  getIds(): number[] {
    return [4615, 4616, 4617, 4618, 4619, 4620, 4621, 4622];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 37 };
  }
}
