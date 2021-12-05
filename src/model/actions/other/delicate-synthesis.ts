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
    const progressionIncrease = this.getBaseProgression(simulation);
    const progressPotency = this.getPotency(simulation);
    let progressBuffMod = this.getBaseBonus(simulation);
    let progressConditionMod = this.getBaseCondition(simulation);

    switch (simulation.state) {
      case StepState.MALLEABLE:
        progressConditionMod *= 1.5;
        break;
      default:
        break;
    }

    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      progressBuffMod += 1;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.VENERATION)) {
      progressBuffMod += 0.5;
    }

    const progressEfficiency = (progressPotency * progressBuffMod) / 100;

    simulation.progression += Math.floor(
      Math.floor(progressionIncrease) * progressConditionMod * progressEfficiency
    );

    if (
      simulation.hasBuff(Buff.FINAL_APPRAISAL) &&
      simulation.progression >= simulation.recipe.progress
    ) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
      simulation.removeBuff(Buff.FINAL_APPRAISAL);
    }

    // Quality
    const qualityIncrease = this.getBaseQuality(simulation);
    const qualityPotency = this.getPotency(simulation);
    let qualityBuffMod = this.getBaseBonus(simulation);
    let qualityConditionMod = this.getBaseCondition(simulation);

    switch (simulation.state) {
      case StepState.EXCELLENT:
        qualityConditionMod *= 4;
        break;
      case StepState.POOR:
        qualityConditionMod *= 0.5;
        break;
      case StepState.GOOD:
        qualityConditionMod *= 1.5;
        break;
      default:
        break;
    }

    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      qualityBuffMod += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      qualityBuffMod += 0.5;
    }

    qualityBuffMod += (simulation.getBuff(Buff.INNER_QUIET)?.stacks || 0) / 10;

    const qualityEfficiency = (qualityPotency * qualityBuffMod) / 100;

    simulation.quality += Math.floor(
      Math.floor(qualityIncrease * qualityConditionMod) * qualityEfficiency
    );

    simulation.addInnerQuietStacks(1);
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
