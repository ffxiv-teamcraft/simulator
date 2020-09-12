import { Simulation } from '../src/simulation/simulation';
import { SimulationFailCause } from '../src/model/simulation-fail-cause.enum';
import { generateRecipe, generateStarRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { NameOfTheElements } from '../src/model/actions/buff/name-of-the-elements';
import { BrandOfTheElements } from '../src/model/actions/progression/brand-of-the-elements';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { Groundwork } from '../src/model/actions/progression/groundwork';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet';
import { WasteNot } from '../src/model/actions/buff/waste-not';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { Manipulation } from '../src/model/actions/buff/manipulation';
import { Veneration } from '../src/model/actions/buff/veneration';
import { BasicTouch } from '../src/model/actions/quality/basic-touch';
import { PreparatoryTouch } from '../src/model/actions/quality/preparatory-touch';
import { MastersMend } from '../src/model/actions/other/masters-mend';
import { ByregotsBlessing } from '../src/model/actions/quality/byregots-blessing';
import { StepState } from '../src/model/step-state';
import { PrudentTouch } from '../src/model/actions/quality/prudent-touch';
import { Observe } from '../src/model/actions/other/observe';
import { Buff } from '../src/model/buff.enum';
import { GreatStrides } from '../src/model/actions/buff/great-strides';
import { TricksOfTheTrade } from '../src/model/actions/other/tricks-of-the-trade';

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
        new BrandOfTheElements(),
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

  it('Should fail a craft when user is below minimum stat requirements', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195),
      [
        new MuscleMemory(),
        new WasteNot(),
        new Veneration(),
        new Groundwork(),
        new CarefulSynthesis()
      ],
      generateStats(80, 2450, 2500, 541)
    );
    const result = simulation.run(true);

    expect(simulation.success).toBeFalsy();
    expect(result.failCause).toBe(
      SimulationFailCause[SimulationFailCause.MISSING_STATS_REQUIREMENT]
    );
  });

  it('Should reduce CP cost with PLIANT step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, true),
      [new MuscleMemory(), new WasteNot()],
      generateStats(80, 2800, 2500, 541),
      [],
      {
        1: StepState.PLIANT
      }
    );
    const result = simulation.run(true);
    expect(result.simulation.availableCP).toBe(541 - 6 - Math.floor(56 / 2));
  });

  it('Should reduce Durability cost with STURDY step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, true),
      [new PrudentTouch()],
      generateStats(80, 2800, 2500, 541),
      [],
      {
        0: StepState.STURDY
      }
    );
    const result = simulation.run(true);
    expect(result.simulation.durability).toBe(70 - 3);

    const simulation2 = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, true),
      [new WasteNot(), new CarefulSynthesis()],
      generateStats(80, 2800, 2500, 541),
      [],
      {
        1: StepState.STURDY
      }
    );
    const result2 = simulation2.run(true);
    expect(result2.simulation.durability).toBe(70 - 3);
  });

  it('Should floor control bonuses properly', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new InnerQuiet(),
        new PrudentTouch(), // +512 (512)
        new PrudentTouch(), // +634 (1146)
        new PrudentTouch(), // +762 (1908)
        new PrudentTouch() // +898 (2806)
      ],
      generateStats(80, 2486, 2318, 613)
    );

    simulation.run(true);

    expect(simulation.quality).toBe(2806);
  });

  it('Should add nameless after name of the element expired', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new NameOfTheElements(),
        new Observe(),
        new Observe(),
        new Observe(),
        new Observe(),
        new Observe()
      ],
      generateStats(80, 2486, 2318, 613)
    );

    simulation.run(true);

    expect(simulation.buffs.some(buff => buff.buff === Buff.NAMELESS)).toBeTruthy();
  });

  it('Should block name of the elements when nameless is applied', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new NameOfTheElements(),
        new Observe(),
        new Observe(),
        new Observe(),
        new Observe(),
        new Observe(),
        new NameOfTheElements()
      ],
      generateStats(80, 2486, 2318, 613)
    );

    simulation.run(true);

    expect(simulation.buffs.some(buff => buff.buff === Buff.NAME_OF_THE_ELEMENTS)).toBeFalsy();
    expect(new NameOfTheElements().canBeUsed(simulation)).toBeFalsy();
  });

  it('Should not tick buffs if a buff is set to fail', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [new GreatStrides(), new TricksOfTheTrade()],
      generateStats(80, 2486, 2318, 613),
      [],
      [StepState.NORMAL],
      [1]
    );

    simulation.run(true);

    expect(simulation.getBuff(Buff.GREAT_STRIDES).duration).toBe(3);
  });
});
