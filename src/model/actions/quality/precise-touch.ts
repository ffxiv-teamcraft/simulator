import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { StepState } from '../../step-state';
import { Buff } from '../../buff.enum';

export class PreciseTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 53 };
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    simulation.addInnerQuietStacks(1);
  }

  public requiresGood(): boolean {
    return true;
  }

  _canBeUsed(simulationState: Simulation, linear = false): boolean {
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
    return 18;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100128, 100129, 100130, 100131, 100132, 100133, 100134, 100135];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
