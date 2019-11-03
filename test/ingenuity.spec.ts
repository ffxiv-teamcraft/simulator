import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStats } from './mocks';
import { Ingenuity } from '../src/model/actions/buff/ingenuity';
import { CraftingAction } from '../src/model/actions/crafting-action';
import { CraftingJob } from '../src/model/crafting-job.enum';
import { ActionType } from '../src/model/actions/action-type';
import { LevelDifference } from '../src/model/formulas/craft-level-difference';

const ingenuityData = require('./ingenuity-data.json');

class TestAction extends CraftingAction {
  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    return true;
  }

  execute(simulation: Simulation, safe?: boolean): void {}

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 0 };
  }

  getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getType(): ActionType {
    return ActionType.OTHER;
  }

  public getLevelDifference(simulation: Simulation): LevelDifference {
    return super.getLevelDifference(simulation);
  }
}

describe('Ingenuity', () => {
  it('Should match data reports from players', () => {
    ingenuityData.forEach((entry: any) => {
      const simulation = new Simulation(
        generateRecipe(entry.rlvl),
        [],
        generateStats(entry.clvl, entry.craftsmanship, entry.control)
      );
      try {
        simulation.run(true);

        expect(Math.floor(new TestAction().getBaseProgression(simulation))).toBe(entry.progress100);
        expect(Math.floor(new TestAction().getBaseQuality(simulation))).toBe(entry.quality100);

        simulation.actions.push(new Ingenuity());
        simulation.run(true);

        expect(Math.floor(new TestAction().getBaseProgression(simulation))).toBe(
          entry.progress100Ingen
        );
        expect(Math.floor(new TestAction().getBaseQuality(simulation))).toBe(entry.quality100Ingen);
      } catch (e) {
        console.log(entry);
        console.log(new TestAction().getLevelDifference(simulation));
        throw e;
      }
    });
  });
});
