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
    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      potency *= 2;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    let addition = (this.getBaseProgression(simulation) * potency) / 100;
    if (simulation.hasBuff(Buff.INNOVATION)) {
      addition *= 1.2;
    }
    simulation.progression += Math.floor(addition);
    if (simulation.hasBuff(Buff.FINAL_APPRAISAL)) {
      simulation.progression = Math.min(simulation.progression, simulation.recipe.progress - 1);
    }
  }
}
