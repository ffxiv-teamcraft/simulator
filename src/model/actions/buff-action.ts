import { CraftingAction } from './crafting-action';
import { Simulation } from '../../simulation/simulation';
import { EffectiveBuff } from '../effective-buff';
import { Buff } from '../buff.enum';
import { ActionType } from './action-type';

export abstract class BuffAction extends CraftingAction {
  public getType(): ActionType {
    return ActionType.BUFF;
  }

  abstract getDuration(simulation: Simulation): number;

  canBeClipped(): boolean {
    return false;
  }

  execute(simulation: Simulation): void {
    for (const buffToOverride of this.getOverrides()) {
      simulation.removeBuff(buffToOverride);
    }
    simulation.buffs.push(this.getAppliedBuff(simulation));
  }

  _canBeUsed(simulationState: Simulation): boolean {
    if (this.canBeClipped()) {
      return true;
    }
    return !simulationState.hasBuff(this.getBuff());
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  /**
   * Override this method if the buff overrides other buffs (steady hands for instance).
   * Don't forget to add super.getOverrides() to the array you'll return
   * @returns {Buff | null}
   */
  public getOverrides(): Buff[] {
    return [this.getBuff()];
  }

  abstract getBuff(): Buff;

  abstract getInitialStacks(): number;

  protected abstract getTick(): ((simulation: Simulation, linear?: boolean) => void) | undefined;

  protected getOnExpire(): ((simulation: Simulation, linear?: boolean) => void) | undefined {
    // Adding a return here to avoid typescript compilation error due to empty block.
    return undefined;
  }

  private getAppliedBuff(simulation: Simulation): EffectiveBuff {
    return {
      duration: this.getDuration(simulation),
      tick: this.getTick(),
      onExpire: this.getOnExpire(),
      stacks: this.getInitialStacks(),
      buff: this.getBuff(),
      appliedStep: simulation.steps.length
    };
  }
}
