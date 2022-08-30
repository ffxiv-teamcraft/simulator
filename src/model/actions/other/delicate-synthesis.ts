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

    const progressEfficiency = progressPotency * progressBuffMod;

    simulation.progression += Math.floor(
      (progressionIncrease * progressConditionMod * progressEfficiency) / 100
    );

    if (
      simulation.hasBuff(Buff.FINAL_APPRAISAL) &&
      simulation.progression >= simulation.recipe.progress
    ) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
      simulation.removeBuff(Buff.FINAL_APPRAISAL);
    }

    // Quality
    this.executeQuality(simulation);
  }

  private executeQuality(simulation: Simulation): void {
    let buffMod = this.getBaseBonus(simulation);
    let conditionMod = this.getBaseCondition(simulation);
    const potency = this.getPotency(simulation);
    const qualityIncrease = this.getBaseQuality(simulation);

    switch (simulation.state) {
      case StepState.EXCELLENT:
        conditionMod *= 4;
        break;
      case StepState.POOR:
        conditionMod *= 0.5;
        break;
      case StepState.GOOD:
        conditionMod *= 1.5;
        break;
      default:
        break;
    }

    buffMod += (simulation.getBuff(Buff.INNER_QUIET)?.stacks || 0) / 10;

    let buffMult = 1;
    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      buffMult += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      buffMult += 0.5;
    }

    buffMod = Math.fround(buffMod) * Math.fround(buffMult);

    const efficiency = Math.fround(potency * buffMod);

    simulation.quality += Math.floor((qualityIncrease * conditionMod * efficiency) / 100);

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
