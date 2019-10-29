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
    // Progress
    const progressPotency = this.getPotency(simulation);
    let progressBonus = 1;
    if (simulation.hasBuff(Buff.MUSCLE_MEMORY)) {
      progressBonus += 2;
      simulation.removeBuff(Buff.MUSCLE_MEMORY);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      progressBonus += 0.2;
    }
    simulation.progression +=
      (this.getBaseProgression(simulation) * progressPotency * progressBonus) / 100;
    // Quality
    const qualityPotency = this.getPotency(simulation);
    let qualityBonus = 1;
    if (simulation.hasBuff(Buff.GREAT_STRIDES)) {
      qualityBonus += 2;
      simulation.removeBuff(Buff.GREAT_STRIDES);
    }
    if (simulation.hasBuff(Buff.INNOVATION)) {
      qualityBonus += 0.2;
    }
    let qualityIncrease = Math.floor(
      (this.getBaseQuality(simulation) * qualityPotency * qualityBonus) / 100
    );
    if (simulation.hasBuff(Buff.INNOVATION)) {
      qualityIncrease *= 1.2;
    }
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
    simulation.quality += Math.floor(qualityIncrease);
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
