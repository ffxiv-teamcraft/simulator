import { GeneralAction } from '../general-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';
import { StepState } from '../../step-state';

export class DelicateSynthesis extends GeneralAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 76 };
  }

  _canBeUsed(simulation: Simulation, linear?: boolean): boolean {
    return true;
  }

  execute(simulation: Simulation): void {
    // Progress
    const progressPotency = this.getPotency(simulation);
    let progressBonus = 1;
    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      progressBonus += 1;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.VENERATION)) {
      progressBonus += 0.5;
    }
    let progressionIncrease = this.getBaseProgression(simulation);
    switch (simulation.state) {
      case StepState.MALLEABLE:
        progressionIncrease *= 1.5;
        break;
      default:
        break;
    }
    simulation.progression += Math.floor(
      (Math.floor(progressionIncrease) * progressPotency * progressBonus) / 100
    );
    if (
      simulation.hasBuff(Buff.FINAL_APPRAISAL) &&
      simulation.progression >= simulation.recipe.progress
    ) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
      simulation.removeBuff(Buff.FINAL_APPRAISAL);
    }
    // Quality
    const qualityPotency = this.getPotency(simulation);
    let qualityBonus = 1;
    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      qualityBonus += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      qualityBonus += 0.5;
    }
    let qualityIncrease = this.getBaseQuality(simulation);
    switch (simulation.state) {
      case StepState.EXCELLENT:
        qualityIncrease *= 4;
        break;
      case StepState.POOR:
        qualityIncrease *= 0.5;
        break;
      case StepState.GOOD:
        qualityIncrease *= 1.5;
        break;
      default:
        break;
    }
    simulation.quality += Math.floor(
      (Math.floor(qualityIncrease) * qualityPotency * qualityBonus) / 100
    );
    if (simulation.hasBuff(Buff.INNER_QUIET) && simulation.getBuff(Buff.INNER_QUIET).stacks < 11) {
      simulation.getBuff(Buff.INNER_QUIET).stacks++;
    }
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 32;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100323, 100324, 100325, 100326, 100327, 100328, 100329, 100330];
  }

  // Potency is the same for both quality and progression so let's use this.
  getPotency(simulation: Simulation): number {
    return 100;
  }

  getType(): ActionType {
    return ActionType.OTHER;
  }
}
