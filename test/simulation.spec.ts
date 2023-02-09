import { Simulation } from '../src/simulation/simulation';
import { generateRecipe, generateStarRecipe, generateStats } from './mocks';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { Groundwork } from '../src/model/actions/progression/groundwork';
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
import { PreparatoryTouch } from '../src/model/actions/quality/preparatory-touch';
import { DelicateSynthesis } from '../src/model/actions/other/delicate-synthesis';
import { Innovation } from '../src/model/actions/buff/innovation';
import { AdvancedTouch } from '../src/model/actions/quality/advanced-touch';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { FocusedTouch } from '../src/model/actions/quality/focused-touch';
import { TrainedFinesse } from '../src/model/actions/quality/trained-finesse';

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

  it('Should handle new Innovation interactions properly', () => {
    const simulation = new Simulation(
      generateRecipe(517, 2000, 5200, 121, 105),
      [
        new Reflect(), // 299
        new DelicateSynthesis(), // 358
        new DelicateSynthesis(), // 388
        new WasteNot(),
        new Groundwork(),
        new Innovation(),
        new PreparatoryTouch(), // 1255
        new PreparatoryTouch(), // 1435
        new MastersMend(),
        new PreparatoryTouch(), // 1614
      ],
      generateStats(80, 2763, 2780, 545)
    );

    simulation.run(true);

    expect(simulation.steps[0].addedQuality).toBe(299);
    expect(simulation.steps[1].addedQuality).toBe(358);
    expect(simulation.steps[2].addedQuality).toBe(388);
    expect(simulation.steps[6].addedQuality).toBe(1255);
    expect(simulation.steps[7].addedQuality).toBe(1435);
    expect(simulation.steps[9].addedQuality).toBe(1614);
  });

  it('Should compute flooring accurately', () => {
    const simulation = new Simulation(
      generateRecipe(517, 2000, 5200, 121, 105),
      [new BasicTouch(), new BasicTouch(), new BasicTouch(), new BasicTouch()],
      generateStats(80, 1645, 1532, 400)
    );

    simulation.run(true);

    expect(simulation.quality).toBe(827);

    const simulation2 = new Simulation(
      generateStarRecipe(580, 3900, 10920, 130, 115, 80, 70),
      [
        new MuscleMemory(),
        new Veneration(),
        new Groundwork(),
        new Groundwork(),
        new Observe(),
        new Observe(),
        new CarefulSynthesis(),
      ],
      generateStats(90, 3289, 3420, 400)
    );

    simulation2.run(true);

    expect(simulation2.steps[0].addedProgression).toBe(609);
    expect(simulation2.progression).toBe(3897);
  });

  it('Should not combo AdvancedTouch if StandardTouch was not combo itself', () => {
    const simulation = new Simulation(
      generateRecipe(517, 1000, 5200, 121, 105),
      [new StandardTouch(), new AdvancedTouch()],
      generateStats(90, 2763, 2780, 545)
    );

    simulation.run(true);

    expect(simulation.steps[1].cpDifference).toBe(-46);

    const simulation2 = new Simulation(
      generateRecipe(517, 1000, 5200, 121, 105),
      [new BasicTouch(), new StandardTouch(), new AdvancedTouch()],
      generateStats(90, 2763, 2780, 545)
    );

    simulation2.run(true);

    expect(simulation2.steps[2].cpDifference).toBe(-18);
  });

  it('Should be accurate at level 90', () => {
    const simulation = new Simulation(
      generateStarRecipe(560, 1000, 5200, 130, 115, 90, 80),
      [
        new Reflect(), // 222
        new BasicSynthesis(), // 222
        new BasicTouch(), // 266
      ],
      generateStats(90, 2659, 2803, 548)
    );

    simulation.run(true);

    expect(simulation.steps[0].addedQuality).toBe(222);
    expect(simulation.steps[1].addedProgression).toBe(222);
    expect(simulation.steps[2].addedQuality).toBe(266);
  });

  it('Should handle new Innovation interactions with Great Strides properly', () => {
    const simulation = new Simulation(
      generateRecipe(16, 31, 866, 50, 30),
      [
        new Reflect(), // 817
        new Innovation(),
        new GreatStrides(),
        new BasicTouch(), // 2451
      ],
      generateStats(80, 2278, 2348, 532)
    );

    simulation.run(true);

    expect(simulation.steps[0].addedQuality).toBe(817);
    expect(simulation.steps[3].addedQuality).toBe(2451);
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

  it('Progress flooring', () => {
    const simulation = new Simulation(
      generateRecipe(535, 3000, 6700, 125, 109),
      [new CarefulSynthesis()],
      generateStats(90, 2606, 2457, 507)
    );

    simulation.run(true);

    expect(simulation.progression).toBe(378);
  });

  it('Quality Buff flooring', () => {
    const simulation = new Simulation(
      generateRecipe(285, 980, 3420, 88, 68),
      [new Innovation(), new PrudentTouch(), new PrudentTouch(), new PrudentTouch()],
      generateStats(66, 813, 683, 283)
    );

    simulation.run(true);

    expect(simulation.quality).toBe(667);
  });

  it('Quality flooring', () => {
    const simulation = new Simulation(
      generateRecipe(145, 3000, 6700, 68, 48),
      [new Innovation(), new BasicTouch(), new StandardTouch(), new BasicTouch()],
      generateStats(58, 2606, 434, 507)
    );

    simulation.run(true);

    expect(simulation.steps[3].addedQuality).toBe(225);

    const simulation2 = new Simulation(
      generateStarRecipe(610, 5060, 12628, 130, 115, 80, 70),
      [
        new MuscleMemory(),
        new Manipulation(),
        new Veneration(),
        new WasteNotII(),
        new Groundwork(),
        new Groundwork(),
        new DelicateSynthesis(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
      ],
      generateStats(90, 3702, 3792, 588)
    );

    simulation2.run(true);

    expect(simulation2.steps[8].addedQuality).toBe(663);
  });

  it('Should fail if required quality is not met', () => {
    const simulation = new Simulation(
      generateStarRecipe(590, 4300, 12800, 130, 115, 80, 70, false, 15, { requiredQuality: 12800 }),
      [
        new MuscleMemory(),
        new Manipulation(),
        new Veneration(),
        new WasteNotII(),
        new FinalAppraisal(),
        new Groundwork(),
        new Groundwork(),
        new CarefulSynthesis(),
        new Innovation(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new Innovation(),
        new PrudentTouch(),
        new PrudentTouch(),
        new Observe(),
        new FocusedTouch(),
        new Innovation(),
        new TrainedFinesse(),
        new TrainedFinesse(),
        new GreatStrides(),
        new ByregotsBlessing(),
        new BasicSynthesis(),
      ],
      generateStats(90, 3392, 3338, 675)
    );

    expect(simulation.run(true).success).toBe(false);

    const simulation2 = new Simulation(
      generateStarRecipe(590, 4300, 12800, 130, 115, 80, 70, false, 15, { requiredQuality: 6400 }),
      [
        new MuscleMemory(),
        new Manipulation(),
        new Veneration(),
        new WasteNotII(),
        new FinalAppraisal(),
        new Groundwork(),
        new Groundwork(),
        new CarefulSynthesis(),
        new Innovation(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new Innovation(),
        new PrudentTouch(),
        new PrudentTouch(),
        new Observe(),
        new FocusedTouch(),
        new Innovation(),
        new TrainedFinesse(),
        new TrainedFinesse(),
        new GreatStrides(),
        new ByregotsBlessing(),
        new BasicSynthesis(),
      ],
      generateStats(90, 3392, 3338, 675)
    );

    expect(simulation2.run(true).success).toBe(true);
  });

  it('Should handle ToT and Heart and Soul properly', () => {
    const simulation = new Simulation(
      generateStarRecipe(590, 4300, 12800, 130, 115, 80, 70, false, 15),
      [new HeartAndSoul(), new PreparatoryTouch(), new TricksOfTheTrade()],
      generateStats(90, 500, 500, 675),
      [],
      {
        2: StepState.GOOD,
      }
    );

    simulation.run(true);

    expect(simulation.getBuff(Buff.HEART_AND_SOUL)).not.toBeUndefined();

    const simulation2 = new Simulation(
      generateStarRecipe(590, 4300, 12800, 130, 115, 80, 70, false, 15),
      [new HeartAndSoul(), new PreparatoryTouch(), new TricksOfTheTrade()],
      generateStats(90, 500, 500, 675)
    );

    simulation2.run(true);

    expect(simulation2.getBuff(Buff.HEART_AND_SOUL)).toBeUndefined();
  });

  it('Should calculate min stats', () => {
    const simulation = new Simulation(
      generateRecipe(525, 1300, 6200, 123, 107, 15, { durability: 40 }),
      [
        new Reflect(),
        new Groundwork(),
        new MastersMend(),
        new Manipulation(),
        new WasteNot(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new ByregotsBlessing(),
        new BasicSynthesis(),
      ],
      generateStats(90, 4021, 3600, 500)
    );

    const stats = simulation.getMinStats();
    expect(stats.found).toBe(true);
    expect(stats.craftsmanship).toBe(3309);
    expect(stats.control).toBe(3125);
    expect(stats.cp).toBe(448);
  });

  it('Should correctly identify Collectibility tiers for min stats', () => {
    const simulation = new Simulation(
      generateRecipe(560, 3500, 7200, 130, 115, 15, { progressModifier: 90, qualityModifier: 80 }),
      [
        new MuscleMemory(),
        new WasteNotII(),
        new Groundwork(),
        new DelicateSynthesis(),
        new Innovation(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new PreparatoryTouch(),
        new ByregotsBlessing(),
        new CarefulSynthesis(),
      ],
      generateStats(90, 4021, 3600, 601)
    );

    const stats = simulation.getMinStats(true, { low: 396, mid: 540, high: 684 });
    expect(stats.found).toBe(true);
    expect(stats.craftsmanship).toBe(3875);
    expect(stats.control).toBe(2962);
  });
});
