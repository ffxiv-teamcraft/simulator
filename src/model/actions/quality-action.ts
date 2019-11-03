import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { Buff } from '../buff.enum';
import { ActionType } from './action-type';

export abstract class QualityAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.QUALITY;
  }

  execute(simulation: Simulation, safe = false, skipStackAddition = false): void {
    let bonus = 1;
    let potency = this.getPotency(simulation);
    let qualityIncrease = this.getBaseQuality(simulation);

    switch (simulation.state) {
      case 'EXCELLENT':
        qualityIncrease *= 4;
        break;
      case 'POOR':
        qualityIncrease *= 0.5;
        break;
      case 'GOOD':
        qualityIncrease *= 1.5;
        break;
      default:
        break;
    }

    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      bonus += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      bonus += 0.2;
    }

    simulation.quality += Math.floor((Math.floor(qualityIncrease) * potency * bonus) / 100);

    if (
      simulation.hasBuff(Buff.INNER_QUIET) &&
      simulation.getBuff(Buff.INNER_QUIET).stacks < 11 &&
      !skipStackAddition
    ) {
      simulation.getBuff(Buff.INNER_QUIET).stacks++;
    }
  }
}
