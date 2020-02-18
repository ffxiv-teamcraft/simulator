import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { NameOfTheElements } from '../src/model/actions/buff/name-of-the-elements';
import { BrandOfTheElements } from '../src/model/actions/progression/brand-of-the-elements';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { IntensiveSynthesis } from '../src/model/actions/progression/intensive-synthesis';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { Manipulation } from '../src/model/actions/buff/manipulation';
import { BasicTouch } from '../src/model/actions/quality/basic-touch';
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
    expect(simulation.progression).toBe(2831);

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
    expect(simulation2.progression).toBe(3422);
  });

  it('Should use MuMe properly', () => {
    const simulation = new Simulation(
      generateRecipe(430),
      [new MuscleMemory()],
      generateStats(80, 2087, 1873, 463)
    );
    simulation.run(true);
    expect(simulation.progression).toBe(1344);
  });

  it('Should provide same result as ingame for a bad rotation', () => {
    const simulation = new Simulation(
      generateRecipe(430, 3943, 18262),
      [
        new MuscleMemory(), // 1344
        new CarefulSynthesis(), // 1344
        new CarefulSynthesis(), // 672
        new FinalAppraisal(),
        new CarefulSynthesis(), // 582
        new InnerQuiet(),
        new WasteNotII(),
        new PreparatoryTouch(), // 1396
        new PreparatoryTouch(), // 2048
        new MastersMend(),
        new MastersMend(),
        new ByregotsBlessing(), // 2491
        new CarefulSynthesis()
      ],
      generateStats(80, 2087, 1873, 463)
    );

    simulation.run(true);

    expect(simulation.success).toBeTruthy();
    expect(simulation.quality).toBe(5935);
  });

  it('Should match 5.2 preliminary patch notes', () => {
    const simulation = new Simulation(
      generateRecipe(430, 3943, 18262),
      [
        new InnerQuiet(),
        new Manipulation(),
        new NameOfTheElements(),
        new IntensiveSynthesis(),
        new BasicTouch()
      ],
      generateStats(80, 1822, 1696, 421)
    );
    simulation.run(true);

    expect(simulation.durability).toBe(70);
    expect(simulation.progression).toBe(1149);
    expect(simulation.quality).toBe(626); // starting HQ with 1 each of oyster+lemonette for 5481
    expect(simulation.success).toBeFalsy();
  });
});
