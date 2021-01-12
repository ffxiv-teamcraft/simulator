import { CraftingAction } from '../model/actions/crafting-action';
import { ActionResult } from '../model/action-result';
import { CrafterStats } from '../model/crafter-stats';
import { EffectiveBuff } from '../model/effective-buff';
import { Buff } from '../model/buff.enum';
import { SimulationResult } from './simulation-result';
import { SimulationReliabilityReport } from './simulation-reliability-report';
import { Tables } from '../model/tables';
import { SimulationFailCause } from '../model/simulation-fail-cause.enum';
import { Craft } from '../model/craft';
import { StepState } from '../model/step-state';
import { FinalAppraisal } from '../model/actions/buff/final-appraisal';
import { RemoveFinalAppraisal } from '../model/actions/other/remove-final-appraisal';

export class Simulation {
  public progression = 0;
  public quality = 0;
  public startingQuality = 0;
  // Durability of the craft
  public durability: number;

  public state: StepState = StepState.NORMAL;

  public availableCP: number;
  public maxCP: number;

  public buffs: EffectiveBuff[] = [];

  public success: boolean | undefined = undefined;

  public steps: ActionResult[] = [];

  public lastPossibleReclaimStep: number = -1; // equals the index of the last step where you have CP/durability for Reclaim,
  // or -1 if Reclaim is uncastable (i.e. not enough CP)

  public safe = false;

  constructor(
    public readonly recipe: Craft,
    public actions: CraftingAction[],
    private _crafterStats: CrafterStats,
    private hqIngredients: { id: number; amount: number }[] = [],
    private stepStates: { [index: number]: StepState } = {},
    private fails: number[] = [],
    startingQuality = 0
  ) {
    this.durability = recipe.durability;
    this.availableCP = this._crafterStats.cp;
    this.maxCP = this.availableCP;
    for (const ingredient of this.hqIngredients) {
      // Get the ingredient in the recipe
      const ingredientDetails = this.recipe.ingredients.find(i => i.id === ingredient.id);
      // Check that the ingredient in included in the recipe
      if (ingredientDetails !== undefined && ingredientDetails.quality) {
        this.quality += ingredientDetails.quality * ingredient.amount;
      }
    }
    if (this.hqIngredients.length === 0) {
      this.quality = startingQuality;
    }
    this.quality = Math.floor(this.quality);
    this.startingQuality = this.quality;

    // TODO understand the bitmask properly for step conditions
    // this.possibleConditions = this.recipe.conditionsFlag
    //   .toString(2)
    //   .split('')
    //   .map((value, index) => {
    //     if (value === '1') {
    //       return index + 1 as StepState;
    //     } else {
    //       return null;
    //     }
    //   })
    //   .filter(condition => condition !== null) as StepState[];

    switch (this.recipe.conditionsFlag) {
      case 15:
        this.possibleConditions = [
          StepState.NORMAL,
          StepState.GOOD,
          StepState.EXCELLENT,
          StepState.POOR
        ];
        break;
      case 115:
        this.possibleConditions = [
          StepState.NORMAL,
          StepState.GOOD,
          StepState.CENTERED,
          StepState.STURDY,
          StepState.PLIANT
        ];
        break;
      case 483:
        this.possibleConditions = [
          StepState.NORMAL,
          StepState.GOOD,
          StepState.STURDY,
          StepState.PLIANT,
          StepState.MALLEABLE,
          StepState.PRIMED
        ];
        break;
    }
  }

  public get lastStep(): ActionResult {
    return this.steps[this.steps.length - 1];
  }

  public get crafterStats(): CrafterStats {
    return this._crafterStats;
  }

  public readonly possibleConditions: StepState[] = [];

  public getReliabilityReport(): SimulationReliabilityReport {
    this.reset();
    let results: SimulationResult[] = [];
    // Let's run the simulation 200 times.
    for (let i = 0; i < 200; i++) {
      results.push(this.run(false));
      this.reset();
    }
    const successPercent = (results.filter(res => res.success).length / results.length) * 100;
    const hqPercent = results.reduce((p, c) => p + c.hqPercent, 0) / results.length;
    let hqMedian: number;
    results = results.sort((a, b) => a.hqPercent - b.hqPercent);
    if (results.length % 2) {
      hqMedian = results[Math.floor(results.length / 2)].hqPercent;
    } else {
      hqMedian =
        (results[Math.floor(results.length / 2)].hqPercent +
          results[Math.ceil(results.length / 2)].hqPercent) /
        2;
    }
    return {
      rawData: results,
      successPercent: Math.round(successPercent),
      averageHQPercent: Math.round(hqPercent),
      medianHQPercent: hqMedian,
      minHQPercent: results[0].hqPercent,
      maxHQPercent: results[results.length - 1].hqPercent
    };
  }

  public getMinStats(): { control: number; craftsmanship: number; cp: number; found: boolean } {
    let totalIterations = 0;
    const originalHqPercent = this.run(true).hqPercent;
    const originalStats = { ...this.crafterStats };
    const res = {
      control: this.crafterStats._control,
      craftsmanship: this.crafterStats.craftsmanship,
      cp: this.crafterStats.cp,
      found: true
    };

    this.crafterStats.craftsmanship = 1;
    this.reset();
    let result = this.run(true);
    // Three loops, one per stat
    while (!result.success && totalIterations < 10000) {
      this.crafterStats.craftsmanship++;
      this.reset();
      result = this.run(true);
      totalIterations++;
    }

    res.craftsmanship = this.crafterStats.craftsmanship;

    this.crafterStats._control = 1;
    this.reset();
    result = this.run(true);

    while (result.hqPercent < originalHqPercent && totalIterations < 10000) {
      this.crafterStats._control++;
      this.reset();
      result = this.run(true);
      totalIterations++;
    }

    res.control = this.crafterStats._control;

    this.crafterStats.cp = 180;
    this.reset();
    result = this.run(true);

    while (totalIterations < 10000 && (!result.success || result.hqPercent < originalHqPercent)) {
      this.crafterStats.cp++;
      this.reset();
      result = this.run(true);
      totalIterations++;
    }

    res.cp = this.crafterStats.cp;

    if (totalIterations >= 10000) {
      res.found = false;
    }

    this.crafterStats.cp = originalStats.cp;
    this.crafterStats.craftsmanship = originalStats.craftsmanship;
    this.crafterStats._control = originalStats._control;
    return res;
  }

  public reset(): void {
    delete this.success;
    this.progression = 0;
    this.durability = this.recipe.durability;
    this.quality = this.startingQuality;
    this.buffs = [];
    this.steps = [];
    this.maxCP = this.crafterStats.cp;
    this.availableCP = this.maxCP;
    this.state = StepState.NORMAL;
    this.safe = false;
  }

  /**
   * Run the simulation.
   * @param {boolean} linear should everything be linear (aka no fail on actions, Initial preparations never procs)
   * @param maxTurns
   * @param safeMode Safe mode makes all the actions that have success chances < 100
   * @returns {ActionResult[]}
   */
  public run(linear = false, maxTurns = Infinity, safeMode = false): SimulationResult {
    this.lastPossibleReclaimStep = -1;
    this.actions
      .filter(a => a !== undefined)
      .forEach((action: CraftingAction, index: number) => {
        this.state = this.stepStates[index] || StepState.NORMAL;
        let result: ActionResult;
        let failCause: SimulationFailCause | undefined = undefined;
        const canUseAction = action.canBeUsed(this, linear);
        if (!canUseAction) {
          failCause = action.getFailCause(this, linear, safeMode);
        }
        const hasEnoughCP = action.getBaseCPCost(this) <= this.availableCP;
        if (!hasEnoughCP) {
          failCause = SimulationFailCause.NOT_ENOUGH_CP;
        }
        // If we can use the action
        if (
          this.success === undefined &&
          hasEnoughCP &&
          this.steps.length < maxTurns &&
          canUseAction
        ) {
          result = this.runAction(action, linear, safeMode, index);
        } else {
          // If we can't, add the step to the result but skip it.
          result = {
            action: action,
            success: null,
            addedQuality: 0,
            addedProgression: 0,
            cpDifference: 0,
            skipped: true,
            solidityDifference: 0,
            state: this.state,
            failCause: failCause
          };
        }
        if (this.steps.length < maxTurns) {
          const qualityBefore = this.quality;
          const progressionBefore = this.progression;
          const durabilityBefore = this.durability;
          const cpBefore = this.availableCP;
          const skipTicksOnFail = !result.success && action.skipOnFail();
          if (this.success === undefined && !action.skipsBuffTicks() && !skipTicksOnFail) {
            // Tick buffs after checking synth result, so if we reach 0 durability, synth fails.
            this.tickBuffs(linear);
          }
          result.afterBuffTick = {
            // Amount of progression added to the craft
            addedProgression: this.progression - progressionBefore,
            // Amount of quality added to the craft
            addedQuality: this.quality - qualityBefore,
            // CP added to the craft (negative if removed)
            cpDifference: this.availableCP - cpBefore,
            // Solidity added to the craft (negative if removed)
            solidityDifference: this.durability - durabilityBefore
          };
        }
        // Tick state to change it for next turn if not in linear mode
        if (!linear && !action.is(FinalAppraisal) && !action.is(RemoveFinalAppraisal)) {
          this.tickState();
        }

        this.steps.push(result);
      });

    const failedAction = this.steps.find(step => step.failCause !== undefined);
    const res: SimulationResult = {
      steps: this.steps,
      hqPercent: this.getHQPercent(),
      success: this.progression >= this.recipe.progress,
      simulation: this
    };
    if (failedAction !== undefined && failedAction.failCause) {
      res.failCause = SimulationFailCause[failedAction.failCause];
    }
    return res;
  }

  /**
   * Runs an action, can be called from external class (Whistle for instance).
   * @param {CraftingAction} action
   * @param {boolean} linear
   * @param {boolean} safeMode
   * @param index
   */
  public runAction(
    action: CraftingAction,
    linear = false,
    safeMode = false,
    index: number = -1
  ): ActionResult {
    // The roll for the current action's success rate, 0 if ideal mode, as 0 will even match a 1% chances.
    let probabilityRoll = linear ? 0 : Math.random() * 100;
    if (this.fails.includes(index)) {
      // Impossible to succeed
      probabilityRoll = 999;
    }
    const qualityBefore = this.quality;
    const progressionBefore = this.progression;
    const durabilityBefore = this.durability;
    const cpBefore = this.availableCP;
    let failCause: SimulationFailCause | undefined = undefined;
    let success = false;
    if (safeMode && (action.getSuccessRate(this) < 100 || action.requiresGood())) {
      failCause = SimulationFailCause.UNSAFE_ACTION;
      action.onFail(this);
      this.safe = false;
    } else {
      if (action.getSuccessRate(this) >= probabilityRoll) {
        action.execute(this, safeMode);
        success = true;
      } else {
        action.onFail(this);
      }
    }

    // Even if the action failed, we have to remove the durability cost
    this.durability -= action.getDurabilityCost(this);
    // Even if the action failed, CP has to be consumed too
    this.availableCP -= action.getCPCost(this, linear);
    if (this.progression >= this.recipe.progress) {
      this.success = true;
    } else if (this.durability <= 0) {
      failCause = SimulationFailCause.DURABILITY_REACHED_ZERO;
      // Check durability to see if the craft is failed or not
      this.success = false;
    }
    // return action result
    return {
      action: action,
      success: success,
      addedQuality: this.quality - qualityBefore,
      addedProgression: this.progression - progressionBefore,
      cpDifference: this.availableCP - cpBefore,
      skipped: false,
      solidityDifference: this.durability - durabilityBefore,
      state: this.state,
      failCause: failCause
    };
  }

  public hasBuff(buff: Buff): boolean {
    return this.buffs.find(row => row.buff === buff) !== undefined;
  }

  public getBuff(buff: Buff): EffectiveBuff {
    return this.buffs.find(row => row.buff === buff) as EffectiveBuff;
  }

  public removeBuff(buff: Buff): void {
    this.buffs = this.buffs.filter(row => row.buff !== buff);
  }

  public repair(amount: number): void {
    this.durability += amount;
    if (this.durability > this.recipe.durability) {
      this.durability = this.recipe.durability;
    }
  }

  clone(): Simulation {
    return new Simulation(
      this.recipe,
      this.actions,
      this.crafterStats,
      this.hqIngredients,
      this.stepStates,
      this.fails,
      this.startingQuality
    );
  }

  private getHQPercent(): number {
    const qualityPercent = Math.min(this.quality / this.recipe.quality, 1) * 100;
    if (qualityPercent === 0) {
      return 1;
    } else if (qualityPercent >= 100) {
      return 100;
    } else {
      return Tables.HQ_TABLE[Math.floor(qualityPercent)];
    }
  }

  private tickBuffs(linear = false): void {
    for (const effectiveBuff of this.buffs) {
      // We are checking the appliedStep because ticks only happen at the beginning of the second turn after the application,
      // For instance, Great strides launched at turn 1 will start to loose duration at the beginning of turn 3
      if (effectiveBuff.appliedStep < this.steps.length) {
        // If the buff has something to do, let it do it
        if (effectiveBuff.tick !== undefined) {
          effectiveBuff.tick(this, linear);
        }
        effectiveBuff.duration--;
      }
    }
    this.buffs
      .filter(buff => buff.duration <= 0 && buff.onExpire !== undefined)
      .forEach((expired: any) => {
        expired.onExpire(this, linear);
      });
    this.buffs = this.buffs.filter(buff => buff.duration > 0);
  }

  /**
   * Changes the state of the craft,
   * source: https://github.com/Ermad/ffxiv-craft-opt-web/blob/master/app/js/ffxivcraftmodel.js#L255
   */
  public tickState(): void {
    // If current state is EXCELLENT, then next one is poor
    if (this.state === StepState.EXCELLENT) {
      this.state = StepState.POOR;
      return;
    }

    // Good
    const recipeLevel = this.recipe.rlvl;
    const qualityAssurance = this.crafterStats.level >= 63;
    let goodChances = 0;
    if (recipeLevel >= 300) {
      // 70*+
      goodChances = qualityAssurance ? 0.11 : 0.1;
    } else if (recipeLevel >= 276) {
      // 65+
      goodChances = qualityAssurance ? 0.17 : 0.15;
    } else if (recipeLevel >= 255) {
      // 61+
      goodChances = qualityAssurance ? 0.22 : 0.2;
    } else if (recipeLevel >= 150) {
      // 60+
      goodChances = qualityAssurance ? 0.11 : 0.1;
    } else if (recipeLevel >= 136) {
      // 55+
      goodChances = qualityAssurance ? 0.17 : 0.15;
    } else {
      goodChances = qualityAssurance ? 0.27 : 0.25;
    }

    // Excellent
    let excellentChances = 0;
    if (recipeLevel >= 300) {
      // 70*+
      excellentChances = 0.01;
    } else if (recipeLevel >= 255) {
      // 61+
      excellentChances = 0.02;
    } else if (recipeLevel >= 150) {
      // 60+
      excellentChances = 0.01;
    } else {
      excellentChances = 0.02;
    }

    const statesAndRates = this.possibleConditions
      .map(condition => {
        // Default rate
        let rate = 0.25;
        switch (condition) {
          case StepState.NORMAL:
            rate = 1;
            break;
          case StepState.GOOD:
            rate = goodChances;
            break;
          case StepState.EXCELLENT:
            rate = excellentChances;
            break;
          case StepState.POOR:
            rate = 0;
            break;
        }
        return {
          state: condition,
          rate: rate
        };
      })
      .sort((a, b) => {
        return a.rate - b.rate;
      });

    for (let possibleState of statesAndRates) {
      const roll = Math.random();
      if (roll <= possibleState.rate) {
        this.state = possibleState.state;
        break;
      }
    }
  }
}
