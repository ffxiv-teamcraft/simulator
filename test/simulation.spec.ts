import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStarRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { Groundwork } from '../src/model/actions/progression/groundwork';
import { RapidSynthesis } from '../src/model/actions/progression/rapid-synthesis';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
import { WasteNot } from '../src/model/actions/buff/waste-not';
import { Manipulation } from '../src/model/actions/buff/manipulation';
import { Veneration } from '../src/model/actions/buff/veneration';
import { BasicTouch } from '../src/model/actions/quality/basic-touch';
import { MastersMend } from '../src/model/actions/other/masters-mend';
import { ByregotsBlessing } from '../src/model/actions/quality/byregots-blessing';
import { StepState } from '../src/model/step-state';
import { PrudentTouch } from '../src/model/actions/quality/prudent-touch';
import { Observe } from '../src/model/actions/other/observe';
import { Buff } from '../src/model/buff.enum';
import { GreatStrides } from '../src/model/actions/buff/great-strides';
import { Reflect } from '../src/model/actions/quality/reflect';
import { TricksOfTheTrade } from '../src/model/actions/other/tricks-of-the-trade';
import { CarefulObservation } from '../src/model/actions/other/careful-observation';
import { RemoveFinalAppraisal } from '../src/model/actions/other/remove-final-appraisal';
import { StandardTouch } from '../src/model/actions/quality/standard-touch';
import { HeartAndSoul } from '../src/model/actions/buff/heart-and-soul';
import { PreciseTouch } from '../src/model/actions/quality/precise-touch';
import { BasicSynthesis } from '../src/model/actions/progression/basic-synthesis';

describe('Craft simulator tests', () => {
  it('Should handle Reflect properly', () => {
    const simulation = new Simulation(
      generateRecipe(16, 31, 866, 50, 30),
      [
        new Reflect(), // 817
        new BasicTouch(), // 980
        new CarefulSynthesis(), // 685
      ],
      generateStats(80, 2278, 2348, 532)
    );

    simulation.run(true);

    expect(simulation.getBuff(Buff.INNER_QUIET).stacks).toBe(3);
  });

  it('Should provide same result as ingame for a low level rotation', () => {
    const simulation = new Simulation(
      generateRecipe(16, 31, 866, 50, 30),
      [
        new Reflect(), // 817
        new BasicTouch(), // 980
        new ByregotsBlessing(), // 1372,
        new CarefulSynthesis(), // 685
      ],
      generateStats(80, 2278, 2348, 532)
    );

    simulation.run(true);

    expect(simulation.success).toBeTruthy();
    expect(simulation.steps[3].addedProgression).toBe(685);
    expect(simulation.steps[0].addedQuality).toBe(817);
    expect(simulation.steps[1].addedQuality).toBe(980);
    expect(simulation.steps[2].addedQuality).toBe(1699);
  });

  it('Should provide same result as ingame for a 80 2stars rotation as lvl 80 crafter', () => {
    const simulation = new Simulation(
      generateStarRecipe(450, 2050, 9000, 110, 90, 80, 70),
      [
        new BasicSynthesis(), // 203
        new BasicTouch(), // 217
      ],
      generateStats(80, 2626, 2477, 522)
    );

    simulation.run(true);

    expect(simulation.progression).toBe(230);
    expect(simulation.quality).toBe(217);
  });

  it('Should compute high stacks Byregots blessing properly', () => {
    const simulation = new Simulation(
      generateRecipe(16, 31, 866, 50, 30),
      [
        new Reflect(), // 817
        new BasicTouch(), // 980
        new BasicTouch(),
        new MastersMend(),
        new BasicTouch(),
        new BasicTouch(),
        new BasicTouch(),
        new MastersMend(),
        new BasicTouch(),
        new BasicTouch(),
        new BasicTouch(),
        new ByregotsBlessing(), // 4902,
        new CarefulSynthesis(), // 685
      ],
      generateStats(80, 2278, 2348, 10000)
    );

    simulation.run(true);

    expect(simulation.success).toBeTruthy();
    expect(simulation.steps[11].addedQuality).toBe(4902);
  });

  it('Should reduce CP cost with PLIANT step state', () => {
    const simulation = new Simulation(
      generateStarRecipe(480, 4943, 32328, 2480, 2195, 80, 70, true),
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
      generateStarRecipe(480, 4943, 32328, 2480, 2195, 80, 70, true),
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
      generateStarRecipe(480, 4943, 32328, 2480, 2195, 80, 70, true),
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
      generateStarRecipe(480, 4943, 32328, 2480, 2195, 80, 70, true),
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
      generateStarRecipe(513, 12046, 81447, 140, 130, 80, 70, true),
      [new Veneration(), new RapidSynthesis()],
      generateStats(80, 2763, 2800, 554),
      [],
      {
        1: StepState.MALLEABLE,
      }
    );

    const result = simulation.run(true);
    expect(result.simulation.progression).toBe(2238);
  });

  xit('Should floor control bonuses properly', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 110, 90),
      [
        new PrudentTouch(), // +512 (512)
        new PrudentTouch(), // +634 (1146)
        new PrudentTouch(), // +762 (1908)
        new PrudentTouch(), // +898 (2806)
      ],
      generateStats(80, 2486, 2318, 613)
    );

    simulation.run(true);

    expect(simulation.quality).toBe(2357);
  });

  it('Should not tick buffs if a buff is set to fail', () => {
    const simulation = new Simulation(
      generateRecipe(480, 6178, 36208, 110, 90),
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
      generateRecipe(480, 6178, 36208, 110, 90),
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
      generateRecipe(480, 6178, 36208, 110, 90),
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
      generateRecipe(480, 6178, 36208, 110, 90),
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
      generateRecipe(480, 6178, 36208, 110, 90, 15),
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
      generateRecipe(480, 6178, 36208, 110, 90, 115),
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
      generateRecipe(480, 6178, 36208, 110, 90, 483),
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
      generateRecipe(480, 6178, 36208, 110, 90, 483),
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

  it('Should handle Heart and Soul properly', () => {
    const simulation = new Simulation(
      generateRecipe(480, 900, 36208, 110, 90),
      [new Observe(), new HeartAndSoul(), new PreciseTouch()],
      generateStats(90, 2745, 2885, 500),
      [],
      [StepState.NORMAL, StepState.NORMAL, StepState.NORMAL],
      []
    );

    simulation.run();
    expect(simulation.quality).toBeGreaterThan(0);
  });
});
