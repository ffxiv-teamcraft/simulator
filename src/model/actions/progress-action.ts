import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { ActionType } from './action-type';
import { Buff } from '../buff.enum';

export abstract class ProgressAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.PROGRESSION;
  }

  execute(simulation: Simulation): void {
    const potency = this.getPotency(simulation);
    let addition = (this.getBaseProgression(simulation) * potency) / 100;
    if (simulation.hasBuff(Buff.INNOVATION)) {
      addition *= 1.2;
    }
    simulation.progression += Math.floor(addition);
  }
}
