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
    let bonus = this.getBaseBonus(simulation);
    let potency = this.getPotency(simulation);
    let progressionIncrease = this.getBaseProgression(simulation);

    switch (simulation.state) {
      case StepState.MALLEABLE:
        progressionIncrease *= 1.5;
        break;
      default:
        break;
    }

    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      bonus += 1;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.VENERATION)) {
      bonus += 0.5;
    }

    simulation.progression += Math.floor((Math.floor(progressionIncrease) * potency * bonus) / 100);

    if (
      simulation.hasBuff(Buff.FINAL_APPRAISAL) &&
      simulation.progression >= simulation.recipe.progress
    ) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
      simulation.removeBuff(Buff.FINAL_APPRAISAL);
    }
  }
}
