import { Buff } from './buff.enum';
import { Simulation } from '../simulation/simulation';
import { CraftingAction } from './actions/crafting-action';

export interface EffectiveBuff {
  duration: number;
  stacks: number;
  buff: Buff;

  tick?: (simulationState: Simulation, linear?: boolean, action?: CraftingAction) => void;
  onExpire?: (simulationState: Simulation, linear?: boolean) => void;

  appliedStep: number;
}
