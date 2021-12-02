import { Simulation } from '../simulation/simulation';

export type CrafterLevels = [number, number, number, number, number, number, number, number];

export class CrafterStats {
  constructor(
    public readonly jobId: number,
    public craftsmanship: number,
    public _control: number,
    public cp: number,
    public readonly specialist: boolean,
    public readonly level: number,
    public readonly levels: CrafterLevels
  ) {}

  public getControl(simulationState: Simulation): number {
    return this._control;
  }
}
