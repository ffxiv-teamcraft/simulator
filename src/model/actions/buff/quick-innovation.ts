import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';
import { ActionResult } from '../../action-result';

export class QuickInnovation extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 96 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return (
      simulationState.crafterStats.specialist &&
      !simulationState.steps.some((step: ActionResult) => step.action.is(QuickInnovation))
    );
  }

  getWaitDuration(): number {
    return 3;
  }

  getBuff(): Buff {
    return Buff.INNOVATION;
  }

  getDuration(simulation: Simulation): number {
    return 1;
  }

  getIds(): number[] {
    return [100459, 100460, 100461, 100462, 100463, 100464, 100465, 100466];
  }

  getInitialStacks(): number {
    return 0;
  }

  skipsBuffTicks(): boolean {
    return true;
  }

  canBeClipped(): boolean {
    return true;
  }

  getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
