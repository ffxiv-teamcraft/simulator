import { generateRecipeForIngenuityTests, generateStatsForIngenuityTests } from './mocks';
import { StandardSynthesis } from '../src/model/actions/progression/standard-synthesis';
import { Simulation } from '../src/simulation/simulation';
import { SteadyHand } from '../src/model/actions/buff/steady-hand';
import { Ingenuity } from '../src/model/actions/buff/ingenuity';
import { BasicSynthesis } from '../src/model/actions/progression/basic-synthesis';
import { IngenuityII } from '../src/model/actions/buff/ingenuity-ii';

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
      },
      {
        recipe: generateRecipeForIngenuityTests(26, 99),
        stats: generateStatsForIngenuityTests(26, 111),
        expected: 31
      },
      {
        recipe: generateRecipeForIngenuityTests(27, 99),
        stats: generateStatsForIngenuityTests(26, 111),
        expected: 30
      },
      {
        recipe: generateRecipeForIngenuityTests(14, 67),
        stats: generateStatsForIngenuityTests(14, 86),
        expected: 20
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
