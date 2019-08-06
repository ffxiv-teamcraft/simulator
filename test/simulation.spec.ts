import { SteadyHandII } from '../src/model/actions/buff/steady-hand-ii';
import { BasicTouch } from '../src/model/actions/quality/basic-touch';
import { Simulation } from '../src/simulation/simulation';
import { BasicSynthesis } from '../src/model/actions/progression/basic-synthesis';
import { SteadyHand } from '../src/model/actions/buff/steady-hand';
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet';
import { Buff } from '../src/model/buff.enum';
import { Manipulation } from '../src/model/actions/buff/manipulation';
import { ManipulationII } from '../src/model/actions/buff/manipulation-ii';
import { WasteNot } from '../src/model/actions/buff/waste-not';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { Ingenuity } from '../src/model/actions/buff/ingenuity';
import { IngenuityII } from '../src/model/actions/buff/ingenuity-ii';
import { InitialPreparations } from '../src/model/actions/buff/initial-preparations';
import { MakersMark } from '../src/model/actions/buff/makers-mark';
import { FlawlessSynthesis } from '../src/model/actions/progression/flawless-synthesis';
import { Observe } from '../src/model/actions/other/observe';
import { FocusedSynthesis } from '../src/model/actions/progression/focused-synthesis';
import { HastyTouch } from '../src/model/actions/quality/hasty-touch';
import { RapidSynthesisII } from '../src/model/actions/progression/rapid-synthesis-ii';
import {
  acchanStats,
  alc70i331Stats,
  alc70i350Stats,
  enchantedTruegoldInkRecipe,
  generateRecipeForIngenuityTests,
  generateStatsForIngenuityTests,
  gradeIIInfusionOfStrRecipe,
  infusionOfMindRecipe
} from './mocks';
import { ComfortZone } from '../src/model/actions/buff/comfort-zone';
import { SpecialtyReflect } from '../src/model/actions/other/specialty-reflect';
import { PieceByPiece } from '../src/model/actions/progression/piece-by-piece';
import { PrudentTouch } from '../src/model/actions/quality/prudent-touch';
import { FocusedTouch } from '../src/model/actions/quality/focused-touch';
import { GreatStrides } from '../src/model/actions/buff/great-strides';
import { Innovation } from '../src/model/actions/buff/innovation';
import { ByregotsMiracle } from '../src/model/actions/quality/byregots-miracle';
import { Rumination } from '../src/model/actions/other/rumination';
import { CarefulSynthesisIII } from '../src/model/actions/progression/careful-synthesis-iii';
import { StandardSynthesis } from '../src/model/actions/progression/standard-synthesis';
import { PatientTouch } from '../src/model/actions/quality/patient-touch';
import { MastersMendII } from '../src/model/actions/other/masters-mend-ii';
import { ByregotsBlessing } from '../src/model/actions/quality/byregots-blessing';
import { Reuse } from '../src/model/actions/buff/reuse';
import { CrafterStats } from '../src/model/crafter-stats';
import { TricksOfTheTrade } from '../src/model/actions/other/tricks-of-the-trade';
import { StepState } from '../src/model/step-state';

describe('Craft simulator tests', () => {
  describe('Base tests', () => {
    it('should be able to predict correct progression on action', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [new SteadyHand(), new BasicSynthesis()],
        alc70i350Stats
      );
      simulation.run();
      expect(simulation.progression).toBeCloseTo(353, 1);
    });

    it('should be able to predict correct progression on action for high level crafts', () => {
      const simulation = new Simulation(
        gradeIIInfusionOfStrRecipe,
        [new BasicSynthesis()],
        acchanStats
      );
      simulation.run(true);
      expect(simulation.progression).toBe(237);

      const simulation2 = new Simulation(
        enchantedTruegoldInkRecipe,
        [new BasicSynthesis()],
        alc70i331Stats
      );
      simulation2.run(true);
      expect(simulation2.progression).toBe(253);
    });

    it('should be able to predict correct quality increase on action', () => {
      const simulation = new Simulation(
        gradeIIInfusionOfStrRecipe,
        [new BasicTouch()],
        acchanStats
      );
      simulation.run(true);
      expect(simulation.quality).toBe(290);
    });

    it('should apply stroke of genius on specialist craft start', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [new BasicSynthesis()],
        alc70i350Stats
      );
      simulation.run();
      expect(simulation.availableCP).toBe(489);
      expect(simulation.maxCP).toBe(489);
    });

    it('should remove CP properly on action', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [new SteadyHand(), new BasicSynthesis()],
        alc70i350Stats
      );
      simulation.run();
      expect(simulation.availableCP).toBe(467);
    });

    it('should take Observe combo into account', () => {
      const results = [];
      // Run simulation 10k times, to be sure with probability
      for (let i = 0; i < 10000; i++) {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new Observe(), new FocusedSynthesis()],
          alc70i350Stats
        );
        simulation.run();
        results.push(simulation.steps[0].success);
      }
      expect(results.filter(row => !row).length).toBe(0);
    });
  });

  describe('Buffs tests', () => {
    describe('Steady Hands', () => {
      it('should be able to apply steady hand buff properly', () => {
        const results = [];
        // Run simulation 10k times, to be sure with probability
        for (let i = 0; i < 10000; i++) {
          const simulation = new Simulation(
            infusionOfMindRecipe,
            [new SteadyHand(), new BasicSynthesis()],
            alc70i350Stats
          );
          simulation.run();
          results.push(simulation.steps[1].success);
        }
        // Expect no failures, as steady hand ensures 100% success with a 90% skill.
        expect(results.filter(res => !res).length).toBe(0);
      });

      it('should be able to apply steady hand II buff properly', () => {
        const results = [];
        // Run simulation 10k times, to be sure with probability
        for (let i = 0; i < 10000; i++) {
          const simulation = new Simulation(
            infusionOfMindRecipe,
            [new SteadyHandII(), new BasicTouch()],
            alc70i350Stats
          );
          simulation.run();
          results.push(simulation.steps[1].success);
        }
        // Expect no failures, as steady hand ensures 100% success with a 90% skill.
        expect(results.filter(res => !res).length).toBe(0);
      });
    });

    describe('Inner Quiet', () => {
      it('should increase Inner Quiet stacks on quality addition', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new InnerQuiet(), new SteadyHandII(), new BasicTouch()],
          alc70i350Stats
        );
        simulation.run(true);
        expect(simulation.getBuff(Buff.INNER_QUIET).stacks).toBe(2);
      });

      it('should affect quality increase properly', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new InnerQuiet(), new SteadyHandII(), new BasicTouch(), new BasicTouch()],
          alc70i350Stats
        );
        simulation.run(true);
        expect(simulation.quality).toBeCloseTo(1262, 1);
      });
    });

    describe('Manipulations', () => {
      it('should repair properly with Manupilation', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [
            new Manipulation(),
            new BasicSynthesis(),
            new BasicSynthesis(),
            new BasicSynthesis(),
            new BasicSynthesis()
          ],
          alc70i350Stats
        );
        simulation.run();
        expect(simulation.durability).toBe(70);
      });

      it('should repair properly with Manupilation II', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new ManipulationII(), new BasicSynthesis(), new BasicSynthesis(), new BasicSynthesis()],
          alc70i350Stats
        );
        simulation.run();
        expect(simulation.durability).toBe(65);
      });
    });

    describe('Waste nots', () => {
      it('should take waste not into account', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new WasteNot(), new BasicSynthesis()],
          alc70i350Stats
        );
        simulation.run();
        expect(simulation.durability).toBe(75);
      });

      it('should take waste not II into account', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new WasteNotII(), new BasicSynthesis()],
          alc70i350Stats
        );
        simulation.run();
        expect(simulation.durability).toBe(75);
      });
    });

    describe('Ingenuities', () => {
      it('should properly reduce recipe level with Ingenuity, influencing progression', () => {
        const results = [
          {
            recipe: generateRecipeForIngenuityTests(409),
            stats: generateStatsForIngenuityTests(80, 1736),
            expected: 557
          },
          {
            recipe: generateRecipeForIngenuityTests(390),
            stats: generateStatsForIngenuityTests(70, 1567),
            expected: 294
          },
          {
            recipe: generateRecipeForIngenuityTests(406),
            stats: generateStatsForIngenuityTests(70, 1567),
            expected: 248
          },
          {
            recipe: generateRecipeForIngenuityTests(395),
            stats: generateStatsForIngenuityTests(70, 1610),
            expected: 260
          },
          {
            recipe: generateRecipeForIngenuityTests(400),
            stats: generateStatsForIngenuityTests(70, 1440),
            expected: 227
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(70, 1610),
            expected: 257
          },
          {
            recipe: generateRecipeForIngenuityTests(390, 1320),
            stats: generateStatsForIngenuityTests(72, 1699),
            expected: 556
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(76, 1843),
            expected: 601
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(77, 1843),
            expected: 601
          },
          {
            recipe: generateRecipeForIngenuityTests(409),
            stats: generateStatsForIngenuityTests(77, 1843),
            expected: 596
          },
          {
            recipe: generateRecipeForIngenuityTests(418),
            stats: generateStatsForIngenuityTests(76, 1741),
            expected: 553
          },
          {
            recipe: generateRecipeForIngenuityTests(420),
            stats: generateStatsForIngenuityTests(76, 1741),
            expected: 545
          },
          {
            recipe: generateRecipeForIngenuityTests(279),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 552
          },
          {
            recipe: generateRecipeForIngenuityTests(282),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 548
          },
          {
            recipe: generateRecipeForIngenuityTests(285),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 540
          },
          {
            recipe: generateRecipeForIngenuityTests(288),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 518
          },
          {
            recipe: generateRecipeForIngenuityTests(290),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 496
          },
          {
            recipe: generateRecipeForIngenuityTests(300),
            stats: generateStatsForIngenuityTests(70, 1658),
            expected: 356
          },
          {
            recipe: generateRecipeForIngenuityTests(320),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 341
          },
          {
            recipe: generateRecipeForIngenuityTests(350),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 325
          },
          {
            recipe: generateRecipeForIngenuityTests(380),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 314
          },
          {
            recipe: generateRecipeForIngenuityTests(430),
            stats: generateStatsForIngenuityTests(80, 2067),
            expected: 665
          },
          {
            recipe: generateRecipeForIngenuityTests(40, 136),
            stats: generateStatsForIngenuityTests(35, 197),
            expected: 65,
            action: new StandardSynthesis()
          },
          {
            recipe: generateRecipeForIngenuityTests(450),
            stats: generateStatsForIngenuityTests(80, 2236),
            expected: 712
          }
        ];

        for (const entry of results) {
          const simulation = new Simulation(
            entry.recipe,
            [new SteadyHand(), new Ingenuity(), entry.action || new BasicSynthesis()],
            entry.stats
          );
          simulation.run(true);
          if (simulation.progression !== entry.expected) {
            console.log(entry.recipe.rlvl, entry.stats.craftsmanship);
          }
          expect(simulation.progression).toBe(entry.expected);
        }
      });

      it('should properly reduce recipe level with Ingenuity II, influencing progression', () => {
        const results = [
          {
            recipe: generateRecipeForIngenuityTests(409),
            stats: generateStatsForIngenuityTests(80, 1736),
            expected: 557
          },
          {
            recipe: generateRecipeForIngenuityTests(390),
            stats: generateStatsForIngenuityTests(70, 1567),
            expected: 304
          },
          {
            recipe: generateRecipeForIngenuityTests(406),
            stats: generateStatsForIngenuityTests(70, 1567),
            expected: 248
          },
          {
            recipe: generateRecipeForIngenuityTests(395),
            stats: generateStatsForIngenuityTests(70, 1610),
            expected: 266
          },
          {
            recipe: generateRecipeForIngenuityTests(400),
            stats: generateStatsForIngenuityTests(70, 1440),
            expected: 227
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(70, 1610),
            expected: 257
          },
          {
            recipe: generateRecipeForIngenuityTests(390),
            stats: generateStatsForIngenuityTests(72, 1699),
            expected: 556
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(76, 1843),
            expected: 601
          },
          {
            recipe: generateRecipeForIngenuityTests(403),
            stats: generateStatsForIngenuityTests(77, 1843),
            expected: 601
          },
          {
            recipe: generateRecipeForIngenuityTests(409),
            stats: generateStatsForIngenuityTests(77, 1843),
            expected: 596
          },
          {
            recipe: generateRecipeForIngenuityTests(418),
            stats: generateStatsForIngenuityTests(76, 1741),
            expected: 553
          },
          {
            recipe: generateRecipeForIngenuityTests(420),
            stats: generateStatsForIngenuityTests(76, 1741),
            expected: 545
          },
          {
            recipe: generateRecipeForIngenuityTests(279),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 552
          },
          {
            recipe: generateRecipeForIngenuityTests(282),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 552
          },
          {
            recipe: generateRecipeForIngenuityTests(285),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 540
          },
          {
            recipe: generateRecipeForIngenuityTests(288),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 525
          },
          {
            recipe: generateRecipeForIngenuityTests(290),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 503
          },
          {
            recipe: generateRecipeForIngenuityTests(300),
            stats: generateStatsForIngenuityTests(70, 1658),
            expected: 367
          },
          {
            recipe: generateRecipeForIngenuityTests(320),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 348
          },
          {
            recipe: generateRecipeForIngenuityTests(350),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 336
          },
          {
            recipe: generateRecipeForIngenuityTests(430),
            stats: generateStatsForIngenuityTests(80, 2067),
            expected: 665
          },
          {
            recipe: generateRecipeForIngenuityTests(380),
            stats: generateStatsForIngenuityTests(70, 1654),
            expected: 321
          },
          {
            recipe: generateRecipeForIngenuityTests(450),
            stats: generateStatsForIngenuityTests(80, 2236),
            expected: 712
          }
        ];

        for (const entry of results) {
          const simulation = new Simulation(
            entry.recipe,
            [new SteadyHand(), new IngenuityII(), new BasicSynthesis()],
            entry.stats
          );
          simulation.run(true);
          expect(simulation.progression).toBe(entry.expected);
        }
      });
    });

    describe("Maker's Mark", () => {
      it('should compute correct stacks amount', () => {
        const simulation = new Simulation(infusionOfMindRecipe, [new MakersMark()], alc70i350Stats);
        simulation.run();
        expect(simulation.getBuff(Buff.MAKERS_MARK).duration).toBe(25);
      });

      it('should affect Flawless Synthesis as it has to', () => {
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new MakersMark(), new SteadyHand(), new FlawlessSynthesis()],
          alc70i350Stats
        );
        simulation.run();
        expect(simulation.getBuff(Buff.MAKERS_MARK).duration).toBe(23);
        expect(simulation.progression).toBe(40);
        expect(simulation.availableCP).toBe(447);
        expect(simulation.durability).toBe(80);
      });
    });
  });

  describe('Other tests', () => {
    it('should be able to run in linear mode properly', () => {
      const results = [];
      // Run simulation 10k times, to be sure with probability
      for (let i = 0; i < 10000; i++) {
        // Hasty Touch has 50% probability, with linear mode this should never fail.
        const simulation = new Simulation(
          infusionOfMindRecipe,
          [new HastyTouch(), new HastyTouch(), new HastyTouch()],
          alc70i350Stats
        );
        simulation.run(true);
        results.push(...simulation.steps.map(step => step.success));
      }
      // Expect no failure at all
      expect(results.filter(res => !res).length).toBe(0);
    });

    it('should be able to provide proper reliability report', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [new RapidSynthesisII(), new RapidSynthesisII(), new RapidSynthesisII()],
        acchanStats
      );
      const report = simulation.getReliabilityReport();
      expect(report.successPercent).toBeGreaterThan(15);
      expect(report.averageHQPercent).toBe(1);
      expect(report.medianHQPercent).toBe(1);
    });

    it('should be consistent with current rotations', () => {
      const acchanMacro = [
        new InitialPreparations(),
        new ComfortZone(),
        new InnerQuiet(),
        new SpecialtyReflect(),
        new SteadyHandII(),
        new PieceByPiece(),
        new PrudentTouch(),
        new PrudentTouch(),
        new PrudentTouch(),
        new PrudentTouch(),
        new Observe(),
        new FocusedTouch(),
        new ManipulationII(),
        new ComfortZone(),
        new Ingenuity(),
        new Observe(),
        new FocusedTouch(),
        new GreatStrides(),
        new Observe(),
        new FocusedTouch(),
        new IngenuityII(),
        new SteadyHandII(),
        new Innovation(),
        new PrudentTouch(),
        new GreatStrides(),
        new ByregotsMiracle(),
        new PieceByPiece(),
        new Rumination(),
        new Ingenuity(),
        new Observe(),
        new FocusedSynthesis(),
        new Observe(),
        new FocusedSynthesis(),
        new CarefulSynthesisIII()
      ];
      const simulation = new Simulation(gradeIIInfusionOfStrRecipe, acchanMacro, acchanStats);
      simulation.run(true);
      expect(simulation.progression).toBe(3443);
      expect(simulation.quality).toBe(22028);
      expect(simulation.availableCP).toBe(0);
    });
    it('Should not reproduce behavior from issue #3', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [
          new Observe(),
          new FocusedTouch(),
          new Observe(),
          new FocusedSynthesis(),
          new Observe(),
          new FocusedSynthesis()
        ],
        alc70i350Stats
      );
      simulation.run();
      expect(
        simulation.steps.some(step => isNaN(step.addedQuality) || isNaN(step.addedProgression))
      ).toBeFalsy();
    });

    it('Should be able to use Reuse with 100% quality', () => {
      const simulation = new Simulation(
        infusionOfMindRecipe,
        [
          new InnerQuiet(),
          new PatientTouch(),
          new PatientTouch(),
          new PatientTouch(),
          new PatientTouch(),
          new MastersMendII(),
          new GreatStrides(),
          new ByregotsBlessing(),
          new Reuse()
        ],
        generateStatsForIngenuityTests(80, 2000)
      );
      const res = simulation.run(true);
      expect(res.steps[res.steps.length - 1].success).toBeTruthy();
    });
  });

  it('Should be able to compute min stats', () => {
    const acchanMacro = [
      new InitialPreparations(),
      new ComfortZone(),
      new InnerQuiet(),
      new SpecialtyReflect(),
      new SteadyHandII(),
      new PieceByPiece(),
      new PrudentTouch(),
      new PrudentTouch(),
      new PrudentTouch(),
      new PrudentTouch(),
      new Observe(),
      new FocusedTouch(),
      new ManipulationII(),
      new ComfortZone(),
      new Ingenuity(),
      new Observe(),
      new FocusedTouch(),
      new GreatStrides(),
      new Observe(),
      new FocusedTouch(),
      new IngenuityII(),
      new SteadyHandII(),
      new Innovation(),
      new PrudentTouch(),
      new GreatStrides(),
      new ByregotsMiracle(),
      new PieceByPiece(),
      new Rumination(),
      new Ingenuity(),
      new Observe(),
      new FocusedSynthesis(),
      new Observe(),
      new FocusedSynthesis(),
      new CarefulSynthesisIII()
    ];
    const simulation = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, true, 70, [70, 70, 70, 70, 70, 70, 70, 70])
    );
    const minStats = simulation.getMinStats();
    expect(minStats.craftsmanship).toBeLessThan(1850);
    expect(minStats.control).toBeLessThan(2000);
    expect(minStats.cp).toBeLessThan(600);
  });

  it("Should be able to tell when it's not possible to compute min stats", () => {
    const acchanMacro = [new InitialPreparations(), new ComfortZone()];
    const simulation = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, true, 70, [70, 70, 70, 70, 70, 70, 70, 70])
    );
    const minStats = simulation.getMinStats();
    expect(minStats.found).toBeFalsy();
  });

  it('Should not regen CP with ToT on safe mode', () => {
    const acchanMacro = [new SteadyHandII(), new TricksOfTheTrade()];
    const simulation = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, false, 70, [70, 70, 70, 70, 70, 70, 70, 70])
    );
    const res = simulation.run(true, Infinity, true);
    expect(res.simulation.availableCP).toBe(1000 - new SteadyHandII().getBaseCPCost(simulation));
  });

  it('Should apply state changes', () => {
    const acchanMacro = [new InnerQuiet(), new SteadyHandII(), new PrudentTouch()];
    const simulationWithoutSteps = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, false, 70, [70, 70, 70, 70, 70, 70, 70, 70])
    );
    const simulation = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, false, 70, [70, 70, 70, 70, 70, 70, 70, 70]),
      [],
      [StepState.NORMAL, StepState.NORMAL, StepState.EXCELLENT]
    );
    const resWithoutSteps = simulationWithoutSteps.run(true, Infinity, true);
    const res = simulation.run(true, Infinity, true);
    expect(res.simulation.quality).toBe(4 * resWithoutSteps.simulation.quality);
  });

  it('Should increase IQ stacks with quality actions in safe mode', () => {
    const acchanMacro = [new InnerQuiet(), new SteadyHandII(), new PrudentTouch()];
    const simulation = new Simulation(
      gradeIIInfusionOfStrRecipe,
      acchanMacro,
      new CrafterStats(14, 1850, 2000, 1000, false, 70, [70, 70, 70, 70, 70, 70, 70, 70])
    );
    const res = simulation.run(true, Infinity, true);
    expect(res.simulation.getBuff(Buff.INNER_QUIET).stacks).toBeGreaterThan(1);
  });
});
