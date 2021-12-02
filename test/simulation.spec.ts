import { Simulation } from '../src/simulation/simulation';
import { SimulationFailCause } from '../src/model/simulation-fail-cause.enum';
import { generateRecipe, generateStarRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { Groundwork } from '../src/model/actions/progression/groundwork';
import { RapidSynthesis } from '../src/model/actions/progression/rapid-synthesis';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
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
import { CarefulObservation } from '../src/model/actions/other/careful-observation';
import { RemoveFinalAppraisal } from '../src/model/actions/other/remove-final-appraisal';
import { StandardTouch } from '../src/model/actions/quality/standard-touch';
import { FocusedSynthesis } from '../src/model/actions/progression/focused-synthesis';

describe('Craft simulator tests', () => {
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
        new WasteNotII(),
        new PreparatoryTouch(), // 1396
        new PreparatoryTouch(), // 2048
        new MastersMend(),
        new MastersMend(),
        new ByregotsBlessing(), // 2491
        new CarefulSynthesis(),
      ],
      generateStats(80, 2087, 1873, 463)
    );

    simulation.run(true);

    expect(simulation.success).toBeTruthy();
    expect(simulation.quality).toBe(5935);
  });

  it('Should fail a craft when user is below minimum stat requirements', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195),
      [
        new MuscleMemory(),
        new WasteNot(),
        new Veneration(),
        new Groundwork(),
        new CarefulSynthesis(),
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
        1: StepState.PLIANT,
      }
    );
    const result = simulation.run(true);
    expect(result.simulation.availableCP).toBe(541 - 6 - Math.floor(56 / 2));
  });

  it('Should reduce CP cost with PLIANT step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, true),
      [new PrudentTouch()],
      generateStats(80, 2800, 2500, 541),
      [],
      {
        0: StepState.PLIANT,
      }
    );
    const result = simulation.run(true);
    expect(result.simulation.availableCP).toBe(541 - 13);
  });

  it('Should reduce Durability cost with STURDY step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, true),
      [new PrudentTouch()],
      generateStats(80, 2800, 2500, 541),
      [],
      {
        0: StepState.STURDY,
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
        1: StepState.STURDY,
      }
    );
    const result2 = simulation2.run(true);
    expect(result2.simulation.durability).toBe(70 - 3);
  });

  it('Should use floor correctly with MALLEABLE step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(513, 12046, 81447, 2620, 2540, true),
      [new Veneration(), new RapidSynthesis()],
      generateStats(80, 2763, 2800, 554),
      [],
      {
        1: StepState.MALLEABLE,
      }
    );

    const result = simulation.run(true);
    expect(result.simulation.progression).toBe(5298);
  });

  it('Should floor control bonuses properly', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new PrudentTouch(), // +512 (512)
        new PrudentTouch(), // +634 (1146)
        new PrudentTouch(), // +762 (1908)
        new PrudentTouch(), // +898 (2806)
      ],
      generateStats(80, 2486, 2318, 613)
    );

    simulation.run(true);

    expect(simulation.quality).toBe(2806);
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

  it('Should not tick buffs when using final appraisal or careful observation', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new GreatStrides(),
        new FinalAppraisal(),
        new CarefulObservation(),
        new RemoveFinalAppraisal(),
      ],
      generateStats(80, 2486, 2318, 613),
      [],
      [],
      []
    );

    simulation.run(true);

    expect(simulation.getBuff(Buff.GREAT_STRIDES).duration).toBe(3);
  });

  it('Should apply 5.4 bonus for combo on standard touch', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [new BasicTouch(), new StandardTouch()],
      generateStats(80, 2486, 2318, 613),
      [],
      [],
      []
    );

    simulation.run(true);
    expect(simulation.lastStep.cpDifference).toBe(-18);
  });

  it('Should count buffs properly in step by step mode', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195),
      [
        new MuscleMemory(),
        new Manipulation(),
        new Observe(),
        new Veneration(),
        new Groundwork(),
        new PrudentTouch(),
        new PrudentTouch(),
        new PrudentTouch(),
        new PrudentTouch(),
        new PrudentTouch(),
      ],
      generateStats(80, 2745, 2885, 626),
      [],
      [],
      []
    );

    simulation.run(true, 4);
    expect(simulation.getBuff(Buff.MANIPULATION).duration).toBe(6);
  });

  it('Should have proper conditions for normal recipes', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195, 15),
      [],
      generateStats(80, 2745, 2885, 626),
      [],
      [],
      []
    );

    expect(simulation.possibleConditions).toStrictEqual([
      StepState.NORMAL,
      StepState.GOOD,
      StepState.EXCELLENT,
      StepState.POOR,
    ]);
  });

  it('Should have proper conditions for expert 1 recipes', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195, 115),
      [],
      generateStats(80, 2745, 2885, 626),
      [],
      [],
      []
    );

    expect(simulation.possibleConditions).toStrictEqual([
      StepState.NORMAL,
      StepState.GOOD,
      StepState.CENTERED,
      StepState.STURDY,
      StepState.PLIANT,
    ]);
  });

  it('Should have proper conditions for expert 2 recipes', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195, 483),
      [],
      generateStats(80, 2745, 2885, 626),
      [],
      [],
      []
    );

    expect(simulation.possibleConditions).toStrictEqual([
      StepState.NORMAL,
      StepState.GOOD,
      StepState.STURDY,
      StepState.PLIANT,
      StepState.MALLEABLE,
      StepState.PRIMED,
    ]);
  });

  it('Should apply conditions with the proper rates for expert 2 recipes', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 2480, 2195, 483),
      [],
      generateStats(80, 2745, 2885, 626),
      [],
      [],
      []
    );

    simulation.recipe.expert = true;

    const rates: { [state in StepState]?: number } = {
      [StepState.NORMAL]: 0,
      [StepState.GOOD]: 0,
      [StepState.STURDY]: 0,
      [StepState.PLIANT]: 0,
      [StepState.MALLEABLE]: 0,
      [StepState.PRIMED]: 0,
    };

    const numSamples = 100000;

    for (let i = 0; i < numSamples; i++) {
      simulation.tickState();
      rates[simulation.state]! += 1;
    }

    expect(rates[StepState.NORMAL]! / numSamples).toBeCloseTo(0.37, 1);
    expect(rates[StepState.GOOD]! / numSamples).toBeCloseTo(0.12, 1);
    expect(rates[StepState.STURDY]! / numSamples).toBeCloseTo(0.15, 1);
    expect(rates[StepState.PLIANT]! / numSamples).toBeCloseTo(0.12, 1);
    expect(rates[StepState.MALLEABLE]! / numSamples).toBeCloseTo(0.12, 1);
    expect(rates[StepState.PRIMED]! / numSamples).toBeCloseTo(0.12, 1);
  });

  it('Should handle skipped actions due to missing CP/Level', () => {
    const simulation = new Simulation(
      generateRecipe(480, 900, 36208, 2480, 2195),
      [new Observe(), new CarefulSynthesis(), new ByregotsBlessing(), new FocusedSynthesis()],
      generateStats(80, 2745, 2885, 12),
      [],
      [],
      []
    );

    const result = simulation.getReliabilityReport();

    expect(result.successPercent).toBe(100);
    const simulation2 = new Simulation(
      generateRecipe(480, 900, 1400, 2480, 2195),
      [new BasicTouch(), new ByregotsBlessing(), new StandardTouch()],
      generateStats(80, 2745, 2885, 36),
      [],
      [],
      []
    );

    const result2 = simulation2.getReliabilityReport();
    expect(result2.averageHQPercent).toBe(100);
  });
});
