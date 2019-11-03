import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { NameOfTheElements } from '../src/model/actions/buff/name-of-the-elements';
import { BrandOfTheElements } from '../src/model/actions/progression/brand-of-the-elements';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
import { Ingenuity } from '../src/model/actions/buff/ingenuity';
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { PreparatoryTouch } from '../src/model/actions/quality/preparatory-touch';
import { MastersMend } from '../src/model/actions/other/masters-mend';
import { ByregotsBlessing } from '../src/model/actions/quality/byregots-blessing';

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

  it('Should provide same result as ingame for a bad rotation', () => {
    const simulation = new Simulation(
      generateRecipe(430, 3943, 20287),
      [
        new MuscleMemory(),
        new CarefulSynthesis(),
        new CarefulSynthesis(),
        new Ingenuity(),
        new FinalAppraisal(),
        new CarefulSynthesis(),
        new CarefulSynthesis(),
        new InnerQuiet(),
        new WasteNotII(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new MastersMend(),
        new MastersMend(),
        new ByregotsBlessing(),
        new CarefulSynthesis()
      ],
      generateStats(80, 2087, 1873, 463)
    );

    console.log(simulation.run(true));

    expect(simulation.success).toBeTruthy();
    expect(simulation.quality).toBe(3655);
  });
});
