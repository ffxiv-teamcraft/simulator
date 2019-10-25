import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';
import { InnerQuiet } from '../buff/inner-quiet';

export class Reflect extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 69 };
  }

  _canBeUsed(simulation: Simulation): boolean {
    return simulation.steps.length === 0;
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    const iq = new InnerQuiet();
    simulation.buffs.push({
      appliedStep: simulation.steps.length,
      stacks: iq.getInitialStacks() + 3,
      buff: iq.getBuff(),
      tick: iq.getTick(),
      duration: iq.getDuration(simulation)
    });
  }

  // TODO: we need the new action cost
  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  // TODO: we need the new action IDs
  getIds(): number[] {
    return [100275, 100276, 100277, 100278, 100279, 100280, 100281, 100282];
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }
}
