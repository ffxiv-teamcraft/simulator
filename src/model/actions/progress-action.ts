import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { ActionType } from './action-type';
import { Buff } from '../buff.enum';
import { StepState } from '../step-state';

export abstract class ProgressAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.PROGRESSION;
  }

  execute(simulation: Simulation): void {
    let buffMod = this.getBaseBonus(simulation);
    let conditionMod = this.getBaseCondition(simulation);
    let potency = this.getPotency(simulation);
    const progressionIncrease = this.getBaseProgression(simulation);

    switch (simulation.state) {
      case StepState.MALLEABLE:
        conditionMod *= 1.5;
        break;
      default:
        break;
    }

    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      buffMod += 1;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.VENERATION)) {
      buffMod += 0.5;
    }

    simulation.progression += Math.floor((Math.floor(progressionIncrease) * conditionMod * potency * buffMod) / 100);

    if (
      simulation.hasBuff(Buff.FINAL_APPRAISAL) &&
      simulation.progression >= simulation.recipe.progress
    ) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
      simulation.removeBuff(Buff.FINAL_APPRAISAL);
    }
  }
}
