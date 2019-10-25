import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';

export class Manipulation extends BuffAction {
  getWaitDuration(): number {
    return 2;
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 65 };
  }

  public getType(): ActionType {
    return ActionType.REPAIR;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 96;
  }

  getDuration(simulation: Simulation): number {
    return 8;
  }

  // TODO get new IDs for this action
  getIds(): number[] {
    return [278];
  }

  public getOverrides(): Buff[] {
    return super.getOverrides().concat(Buff.MANIPULATION);
  }

  getBuff(): Buff {
    return Buff.MANIPULATION;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick(): ((simulation: Simulation) => void) | undefined {
    return (simulation: Simulation) => {
      simulation.repair(5);
    };
  }
}
