import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { BasicTouch } from './basic-touch';

export class RefinedTouch extends QualityAction {
  override execute(
    simulation: Simulation,
    safe: boolean = false,
    skipStackAddition: boolean = false
  ) {
    const hasCombo = this.hasCombo(simulation);
    super.execute(simulation, safe, skipStackAddition);
    if (hasCombo) {
      simulation.addInnerQuietStacks(1);
    }
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 92 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  hasCombo(simulation: Simulation): boolean {
    for (let index = simulation.steps.length - 1; index >= 0; index--) {
      const step = simulation.steps[index];
      // If we end up finding the action, the combo is available
      if (step.action.getIds()[0] === new BasicTouch().getIds()[0] && step.success && step.combo) {
        return true;
      }
      // If there's an action that isn't skipped (fail or not), combo is broken
      if (!step.skipped) {
        return false;
      }
    }
    return false;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 24;
  }

  getIds(): number[] {
    return [100443, 100444, 100445, 100446, 100447, 100448, 100449, 100450];
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }
}
