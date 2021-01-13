import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { ActionType } from './action-type';
import { Buff } from '../buff.enum';
import { StepState } from '../step-state';

export abstract class QualityAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.QUALITY;
  }

  execute(simulation: Simulation, safe = false, skipStackAddition = false): void {
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

    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      buffMod += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      buffMod += 0.5;
    }

    const efficiency = potency * buffMod / 100

    simulation.quality += Math.floor(
      Math.floor(qualityIncrease * conditionMod) * efficiency
    );

    if (
      simulation.hasBuff(Buff.INNER_QUIET) &&
      simulation.getBuff(Buff.INNER_QUIET).stacks < 11 &&
      !skipStackAddition
    ) {
      simulation.getBuff(Buff.INNER_QUIET).stacks++;
    }
  }
}
