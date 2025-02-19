import { Simulation } from '../../simulation/simulation';
import { GeneralAction } from './general-action';
import { ActionType } from './action-type';
import { Buff } from '../buff.enum';
import { StepState } from '../step-state';
import { BasicTouch } from './quality/basic-touch';

export abstract class QualityAction extends GeneralAction {
  public getType(): ActionType {
    return ActionType.QUALITY;
  }

  execute(simulation: Simulation, safe = false, skipStackAddition = false): void {
    let buffMod = this.getBaseBonus(simulation);
    let conditionMod = this.getBaseCondition(simulation);
    const potency = this.getPotency(simulation);
    const qualityIncrease = Math.floor(this.getBaseQuality(simulation));

    switch (simulation.state) {
      case StepState.EXCELLENT:
        conditionMod *= 4;
        break;
      case StepState.POOR:
        conditionMod *= 0.5;
        break;
      case StepState.GOOD:
        conditionMod *= simulation.crafterStats.splendorous ? 1.75 : 1.5;
        break;
      default:
        break;
    }

    const iqMod = simulation.getBuff(Buff.INNER_QUIET)?.stacks || 0;

    let buffMult = 1;
    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      buffMult += 1;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      buffMult += 0.5;
    }

    buffMod = (buffMod * buffMult * (100 + iqMod * 10)) / 100;

    const efficiency = Math.fround(potency * buffMod);

    simulation.quality += Math.floor((qualityIncrease * conditionMod * efficiency) / 100);

    if (!skipStackAddition && simulation.crafterStats.level >= 11) {
      simulation.addInnerQuietStacks(1);
    }
  }
}
