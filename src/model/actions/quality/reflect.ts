import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { InnerQuiet } from '../buff/inner-quiet';
import { FinalAppraisal } from '../buff/final-appraisal';
import { RemoveFinalAppraisal } from '../other/remove-final-appraisal';

export class Reflect extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 69 };
  }

  _canBeUsed(simulation: Simulation): boolean {
    return (
      simulation.steps.filter(
        step => !step.action.is(FinalAppraisal) && !step.action.is(RemoveFinalAppraisal)
      ).length === 0
    );
  }

  canBeMoved(): boolean {
    return false;
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    const iq = new InnerQuiet();
    simulation.buffs.push({
      appliedStep: simulation.steps.length,
      stacks: 3,
      buff: iq.getBuff(),
      tick: iq.getTick(),
      duration: iq.getDuration(simulation)
    });
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 24;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100387, 100388, 100389, 100390, 100391, 100392, 100393, 100394];
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }
}
