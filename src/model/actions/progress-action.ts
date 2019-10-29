import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { ActionType } from './action-type';
import { Buff } from '../buff.enum';

export abstract class ProgressAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.PROGRESSION;
  }

  execute(simulation: Simulation): void {
    let potency = this.getPotency(simulation);
    let bonus = 1;
    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      bonus += 2;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      bonus += 0.2;
    }
    const addition = (this.getBaseProgression(simulation) * potency * bonus) / 100;
    simulation.progression += Math.floor(addition);
    if (simulation.hasBuff(Buff.FINAL_APPRAISAL)) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
    }
  }
}
