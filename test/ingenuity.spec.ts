import { generateRecipe, generateStats } from './mocks';
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
        recipe: generateRecipe(409),
        stats: generateStats(80, 1736),
        expected: 557
      },
      {
        recipe: generateRecipe(390),
        stats: generateStats(70, 1567),
        expected: 294
      },
      {
        recipe: generateRecipe(406),
        stats: generateStats(70, 1567),
        expected: 248
      },
      {
        recipe: generateRecipe(395),
        stats: generateStats(70, 1610),
        expected: 260
      },
      {
        recipe: generateRecipe(400),
        stats: generateStats(70, 1440),
        expected: 227
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(70, 1610),
        expected: 257
      },
      {
        recipe: generateRecipe(390, 1320),
        stats: generateStats(72, 1699),
        expected: 556
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(76, 1843),
        expected: 601
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(77, 1843),
        expected: 601
      },
      {
        recipe: generateRecipe(409),
        stats: generateStats(77, 1843),
        expected: 596
      },
      {
        recipe: generateRecipe(418),
        stats: generateStats(76, 1741),
        expected: 553
      },
      {
        recipe: generateRecipe(420),
        stats: generateStats(76, 1741),
        expected: 545
      },
      {
        recipe: generateRecipe(279),
        stats: generateStats(70, 1654),
        expected: 552
      },
      {
        recipe: generateRecipe(282),
        stats: generateStats(70, 1654),
        expected: 548
      },
      {
        recipe: generateRecipe(285),
        stats: generateStats(70, 1654),
        expected: 540
      },
      {
        recipe: generateRecipe(288),
        stats: generateStats(70, 1654),
        expected: 518
      },
      {
        recipe: generateRecipe(290),
        stats: generateStats(70, 1654),
        expected: 496
      },
      {
        recipe: generateRecipe(300),
        stats: generateStats(70, 1658),
        expected: 356
      },
      {
        recipe: generateRecipe(320),
        stats: generateStats(70, 1654),
        expected: 341
      },
      {
        recipe: generateRecipe(350),
        stats: generateStats(70, 1654),
        expected: 325
      },
      {
        recipe: generateRecipe(380),
        stats: generateStats(70, 1654),
        expected: 314
      },
      {
        recipe: generateRecipe(430),
        stats: generateStats(80, 2067),
        expected: 665
      },
      {
        recipe: generateRecipe(40, 136),
        stats: generateStats(35, 197),
        expected: 65,
        action: new StandardSynthesis()
      },
      {
        recipe: generateRecipe(450),
        stats: generateStats(80, 2236),
        expected: 712
      },
      {
        recipe: generateRecipe(26, 99),
        stats: generateStats(26, 111),
        expected: 31
      },
      {
        recipe: generateRecipe(27, 99),
        stats: generateStats(26, 111),
        expected: 30
      },
      {
        recipe: generateRecipe(14, 67),
        stats: generateStats(14, 86),
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
        recipe: generateRecipe(409),
        stats: generateStats(80, 1736),
        expected: 557
      },
      {
        recipe: generateRecipe(390),
        stats: generateStats(70, 1567),
        expected: 304
      },
      {
        recipe: generateRecipe(406),
        stats: generateStats(70, 1567),
        expected: 248
      },
      {
        recipe: generateRecipe(395),
        stats: generateStats(70, 1610),
        expected: 266
      },
      {
        recipe: generateRecipe(400),
        stats: generateStats(70, 1440),
        expected: 227
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(70, 1610),
        expected: 257
      },
      {
        recipe: generateRecipe(390),
        stats: generateStats(72, 1699),
        expected: 556
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(76, 1843),
        expected: 601
      },
      {
        recipe: generateRecipe(403),
        stats: generateStats(77, 1843),
        expected: 601
      },
      {
        recipe: generateRecipe(409),
        stats: generateStats(77, 1843),
        expected: 596
      },
      {
        recipe: generateRecipe(418),
        stats: generateStats(76, 1741),
        expected: 553
      },
      {
        recipe: generateRecipe(420),
        stats: generateStats(76, 1741),
        expected: 545
      },
      {
        recipe: generateRecipe(279),
        stats: generateStats(70, 1654),
        expected: 552
      },
      {
        recipe: generateRecipe(282),
        stats: generateStats(70, 1654),
        expected: 552
      },
      {
        recipe: generateRecipe(285),
        stats: generateStats(70, 1654),
        expected: 540
      },
      {
        recipe: generateRecipe(288),
        stats: generateStats(70, 1654),
        expected: 525
      },
      {
        recipe: generateRecipe(290),
        stats: generateStats(70, 1654),
        expected: 503
      },
      {
        recipe: generateRecipe(300),
        stats: generateStats(70, 1658),
        expected: 367
      },
      {
        recipe: generateRecipe(320),
        stats: generateStats(70, 1654),
        expected: 348
      },
      {
        recipe: generateRecipe(350),
        stats: generateStats(70, 1654),
        expected: 336
      },
      {
        recipe: generateRecipe(430),
        stats: generateStats(80, 2067),
        expected: 665
      },
      {
        recipe: generateRecipe(380),
        stats: generateStats(70, 1654),
        expected: 321
      },
      {
        recipe: generateRecipe(450),
        stats: generateStats(80, 2236),
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
