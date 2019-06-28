import { ProgressAction } from '../progress-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';

export class RapidSynthesisIII extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 72 };
  }

  execute(simulation: Simulation): void {
    let potency = this.getPotency(simulation);
    if (
      simulation.hasBuff(Buff.WHISTLE_WHILE_YOU_WORK) &&
      simulation.getBuff(Buff.WHISTLE_WHILE_YOU_WORK).stacks > 0 &&
      simulation.getBuff(Buff.WHISTLE_WHILE_YOU_WORK).stacks % 3 === 0
    ) {
      potency += 50;
    }
    // TODO figure out exact penalty for then durability is < 20, we'll assume divided by 4 for now.
    if (simulation.durability < 20) {
      simulation.progression += Math.floor(
        (this.getBaseProgression(simulation) * potency) / 4 / 100
      );
    } else {
      simulation.progression += Math.floor((this.getBaseProgression(simulation) * potency) / 100);
    }
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 24;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 20;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 60;
  }

  getIds(): number[] {
    return [100307, 100308, 100309, 100310, 100311, 100312, 100313, 100314];
  }

  getPotency(simulation: Simulation): number {
    return 600;
  }
}
