import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { ProgressAction } from '../progress-action';
import { StepState } from '../../step-state';
import { Buff } from '../../buff.enum';

export class IntensiveSynthesis extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 78 };
  }

  public requiresGood(): boolean {
    return true;
  }

  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    if (linear) {
      return true;
    }
    if (simulationState.safe && !simulationState.hasBuff(Buff.HEART_AND_SOUL)) {
      return false;
    }
    return (
      simulationState.hasBuff(Buff.HEART_AND_SOUL) ||
      simulationState.state === StepState.GOOD ||
      simulationState.state === StepState.EXCELLENT
    );
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 6;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100315, 100316, 100317, 100318, 100319, 100320, 100321, 100322];
  }

  getPotency(simulation: Simulation): number {
    return 400;
  }
}
