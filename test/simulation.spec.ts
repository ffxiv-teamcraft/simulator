import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { NameOfTheElements } from '../src/model/actions/buff/name-of-the-elements';
import { BrandOfTheElements } from '../src/model/actions/progression/brand-of-the-elements';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';

describe('Craft simulator tests', () => {
  it('Should apply Name of the Elements bonus properly', () => {
    const simulation = new Simulation(
      generateRecipe(430),
      [new MuscleMemory(), new NameOfTheElements(), new BrandOfTheElements()],
      generateStats(80, 2087, 1873, 463)
    );
    simulation.run(true);
    expect(simulation.progression).toBe(2184);

    const simulation2 = new Simulation(
      generateRecipe(430),
      [
        new MuscleMemory(),
        new CarefulSynthesis(),
        new NameOfTheElements(),
        new BrandOfTheElements()
      ],
      generateStats(80, 2087, 1873, 463)
    );
    simulation2.run(true);
    expect(simulation2.progression).toBe(2681);
  });

  it('Should use MuMe properly', () => {
    const simulation = new Simulation(
      generateRecipe(430),
      [new MuscleMemory()],
      generateStats(80, 2087, 1873, 463)
    );
    simulation.run(true);
    expect(simulation.progression).toBe(1008);
  });
});
