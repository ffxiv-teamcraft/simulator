import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { PreciseTouch } from '../quality/precise-touch';
import { IntensiveSynthesis } from '../progression/intensive-synthesis';
import { TricksOfTheTrade } from '../other/tricks-of-the-trade';
import { CraftingAction } from '../crafting-action';
import { StepState } from '../../step-state';

export class HeartAndSoul extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 86 };
  }

  canBeClipped(): boolean {
    return true;
  }

  skipsBuffTicks(): boolean {
    return true;
  }

  public _canBeUsed(simulationState: Simulation): boolean {
    return (
      simulationState.crafterStats.specialist &&
      !simulationState.steps.some((step) => step.action.is(HeartAndSoul))
    );
  }

  public getType(): ActionType {
    return ActionType.OTHER;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDuration(simulation: Simulation): number {
    return Infinity;
  }

  getIds(): number[] {
    return [100419, 100420, 100421, 100422, 100423, 100424, 100425, 100426];
  }

  getBuff(): Buff {
    return Buff.HEART_AND_SOUL;
  }

  getInitialStacks(): number {
    return 0;
  }

  protected getTick():
    | ((simulation: Simulation, linear?: boolean, action?: CraftingAction) => void)
    | undefined {
    return (simulation: Simulation, linear?: boolean, action?: CraftingAction) => {
      const usedOnNonGoodOrExcellent =
        simulation.state !== StepState.GOOD && simulation.state !== StepState.EXCELLENT;
      // If linear, this buff will be removed if last action is one of the buffed ones.
      if (
        usedOnNonGoodOrExcellent &&
        [PreciseTouch, IntensiveSynthesis, TricksOfTheTrade].some((a) => action?.is(a))
      ) {
        simulation.removeBuff(this.getBuff());
      }
    };
  }
}
