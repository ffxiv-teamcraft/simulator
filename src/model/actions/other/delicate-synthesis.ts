import { GeneralAction } from '../general-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class DelicateSynthesis extends GeneralAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 76 };
  }

  _canBeUsed(simulation: Simulation, linear?: boolean): boolean {
    return true;
  }

  execute(simulation: Simulation): void {
    const baseProgressIncrease = this.getBaseProgression(simulation);
    // Progress
    let progressPotency = this.getPotency(simulation);
    if (
      simulation.getBuff(Buff.WHISTLE_WHILE_YOU_WORK) &&
      simulation.getBuff(Buff.WHISTLE_WHILE_YOU_WORK).stacks % 3 === 0
    ) {
      progressPotency += 50;
    }
    simulation.progression += Math.floor((baseProgressIncrease * progressPotency) / 100);

    // Quality
    let qualityIncrease = (this.getBaseQuality(simulation) * this.getPotency(simulation)) / 100;
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
      qualityIncrease *= 2;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    simulation.quality += Math.ceil(qualityIncrease);
    if (simulation.hasBuff(Buff.INNER_QUIET) && simulation.getBuff(Buff.INNER_QUIET).stacks < 11) {
      simulation.getBuff(Buff.INNER_QUIET).stacks++;
    }
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
