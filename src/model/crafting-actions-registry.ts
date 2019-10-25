import { CraftingAction } from './actions/crafting-action';
import { BasicSynthesis } from './actions/progression/basic-synthesis';
import { CarefulSynthesis } from './actions/progression/careful-synthesis';
import { RapidSynthesis } from './actions/progression/rapid-synthesis';
import { FocusedSynthesis } from './actions/progression/focused-synthesis';
import { MuscleMemory } from './actions/progression/muscle-memory';
import { BasicTouch } from './actions/quality/basic-touch';
import { StandardTouch } from './actions/quality/standard-touch';
import { ActionType } from './actions/action-type';
import { HastyTouch } from './actions/quality/hasty-touch';
import { ByregotsBlessing } from './actions/quality/byregots-blessing';
import { PreciseTouch } from './actions/quality/precise-touch';
import { FocusedTouch } from './actions/quality/focused-touch';
import { PatientTouch } from './actions/quality/patient-touch';
import { PrudentTouch } from './actions/quality/prudent-touch';
import { TricksOfTheTrade } from './actions/other/tricks-of-the-trade';
import { MastersMend } from './actions/other/masters-mend';
import { Manipulation } from './actions/buff/manipulation';
import { InnerQuiet } from './actions/buff/inner-quiet';
import { Ingenuity } from './actions/buff/ingenuity';
import { GreatStrides } from './actions/buff/great-strides';
import { Innovation } from './actions/buff/innovation';
import { Observe } from './actions/other/observe';
import { WasteNot } from './actions/buff/waste-not';
import { BrandOfTheElements } from './actions/progression/brand-of-the-elements';
import { NameOfTheElements } from './actions/buff/name-of-the-elements';
import { TrainedEye } from './actions/quality/trained-eye';
import { PreparatoryTouch } from './actions/quality/preparatory-touch';
import { IntensiveSynthesis } from './actions/progression/intensive-synthesis';
import { DelicateSynthesis } from './actions/other/delicate-synthesis';
import { Reuse } from './actions/buff/reuse';

export class CraftingActionsRegistry {
  private static ACTION_IMPORT_NAMES: { short: string; full: string }[] = [
    { short: 'observe', full: 'Observe' },
    { short: 'basicSynth', full: 'BasicSynthesis' },
    { short: 'rapidSynthesis', full: 'RapidSynthesis' },
    { short: 'basicTouch', full: 'BasicTouch' },
    { short: 'standardTouch', full: 'StandardTouch' },
    { short: 'hastyTouch', full: 'HastyTouch' },
    { short: 'byregotsBlessing', full: 'ByregotsBlessing' },
    { short: 'mastersMend', full: 'MastersMend' },
    { short: 'tricksOfTheTrade', full: 'TricksOfTheTrade' },
    { short: 'innerQuiet', full: 'InnerQuiet' },
    { short: 'wasteNot', full: 'WasteNot' },
    { short: 'innovation', full: 'Innovation' },
    { short: 'greatStrides', full: 'GreatStrides' },
    { short: 'ingenuity', full: 'Ingenuity' },
    { short: 'byregotsBrow', full: 'ByregotsBrow' },
    { short: 'preciseTouch', full: 'PreciseTouch' },
    { short: 'muscleMemory', full: 'MuscleMemory' },
    { short: 'brandOfEarth', full: 'BrandOfTheElements' },
    { short: 'brandOfFire', full: 'BrandOfTheElements' },
    { short: 'brandOfIce', full: 'BrandOfTheElements' },
    { short: 'brandOfLightning', full: 'BrandOfTheElements' },
    { short: 'brandOfWater', full: 'BrandOfTheElements' },
    { short: 'brandOfWind', full: 'BrandOfTheElements' },
    { short: 'brandOfTheElements', full: 'BrandOfTheElements' },
    { short: 'nameOfEarth', full: 'NameOfTheElements' },
    { short: 'nameOfFire', full: 'NameOfTheElements' },
    { short: 'nameOfIce', full: 'NameOfTheElements' },
    { short: 'nameOfLightning', full: 'NameOfTheElements' },
    { short: 'nameOfWater', full: 'NameOfTheElements' },
    { short: 'nameOfWind', full: 'NameOfTheElements' },
    { short: 'nameOfTheElements', full: 'NameOfTheElements' },
    { short: 'carefulSynthesis3', full: 'CarefulSynthesis' },
    { short: 'carefulSynthesis', full: 'CarefulSynthesis' },
    { short: 'patientTouch', full: 'PatientTouch' },
    { short: 'manipulation2', full: 'ManipulationII' },
    { short: 'manipulation', full: 'Manipulation' },
    { short: 'prudentTouch', full: 'PrudentTouch' },
    { short: 'focusedSynthesis', full: 'FocusedSynthesis' },
    { short: 'focusedTouch', full: 'FocusedTouch' },
    { short: 'rapidSynthesis', full: 'RapidSynthesis' },
    { short: 'rapidSynthesis3', full: 'RapidSynthesis' },
    { short: 'intensiveSynthesis', full: 'IntensiveSynthesis' },
    { short: 'preparatoryTouch', full: 'PreparatoryTouch' },
    { short: 'delicateSynthesis', full: 'DelicateSynthesis' },
    { short: 'reuse', full: 'Reuse' },
    { short: 'trainedEye', full: 'TrainedEye' }
  ];

  public static readonly ALL_ACTIONS: { name: string; action: CraftingAction }[] = [
    // Progress actions
    { name: 'BasicSynthesis', action: new BasicSynthesis() },
    { name: 'CarefulSynthesis', action: new CarefulSynthesis() },
    { name: 'RapidSynthesis', action: new RapidSynthesis() },
    { name: 'FocusedSynthesis', action: new FocusedSynthesis() },
    { name: 'MuscleMemory', action: new MuscleMemory() },
    { name: 'BrandOfTheElements', action: new BrandOfTheElements() },
    { name: 'IntensiveSynthesis', action: new IntensiveSynthesis() },

    // Quality actions
    { name: 'BasicTouch', action: new BasicTouch() },
    { name: 'StandardTouch', action: new StandardTouch() },
    { name: 'HastyTouch', action: new HastyTouch() },
    { name: 'ByregotsBlessing', action: new ByregotsBlessing() },
    { name: 'PreciseTouch', action: new PreciseTouch() },
    { name: 'FocusedTouch', action: new FocusedTouch() },
    { name: 'PatientTouch', action: new PatientTouch() },
    { name: 'PrudentTouch', action: new PrudentTouch() },
    { name: 'TrainedEye', action: new TrainedEye() },
    { name: 'PreparatoryTouch', action: new PreparatoryTouch() },

    // CP recovery
    { name: 'TricksOfTheTrade', action: new TricksOfTheTrade() },

    // Repair
    { name: 'MastersMend', action: new MastersMend() },
    { name: 'Manipulation', action: new Manipulation() },

    // Buffs
    { name: 'InnerQuiet', action: new InnerQuiet() },
    { name: 'WasteNot', action: new WasteNot() },
    { name: 'Ingenuity', action: new Ingenuity() },
    { name: 'GreatStrides', action: new GreatStrides() },
    { name: 'Innovation', action: new Innovation() },
    { name: 'NameOfTheElements', action: new NameOfTheElements() },

    // Other
    { name: 'Observe', action: new Observe() },
    { name: 'DelicateSynthesis', action: new DelicateSynthesis() },
    { name: 'Reuse', action: new Reuse() }
  ];

  public static getActionsByType(type: ActionType): CraftingAction[] {
    return CraftingActionsRegistry.ALL_ACTIONS.filter(row => row.action.getType() === type).map(
      row => row.action
    );
  }

  public static importFromCraftOpt(importArray: string[]): CraftingAction[] {
    return importArray
      .map(row => {
        const found = CraftingActionsRegistry.ACTION_IMPORT_NAMES.find(
          action => action.short === row
        );
        if (found === undefined) {
          return undefined;
        }
        return CraftingActionsRegistry.ALL_ACTIONS.find(el => {
          return el.name === found.full;
        });
      })
      .filter(action => action !== undefined)
      .map((row: any) => row.action);
  }

  public static exportToCraftOpt(actionNames: string[]): string {
    return JSON.stringify(
      actionNames
        .map(actionName => {
          return CraftingActionsRegistry.ACTION_IMPORT_NAMES.find(el => {
            return el.full === actionName;
          });
        })
        .filter(action => action !== undefined)
        .map((row: any) => row.short)
    );
  }

  public static createFromIds(ids: number[]): CraftingAction[] {
    return ids
      .map(id => {
        const found = CraftingActionsRegistry.ALL_ACTIONS.find(
          row => row.action.getIds().indexOf(id) > -1
        );
        if (found !== undefined) {
          return found.action;
        }
        return undefined;
      })
      .filter(action => action !== undefined) as CraftingAction[];
  }

  public static serializeRotation(rotation: CraftingAction[]): string[] {
    return rotation
      .map(action => {
        const actionRow = CraftingActionsRegistry.ALL_ACTIONS.find(
          row => row.action.getIds()[0] === action.getIds()[0]
        );
        if (actionRow !== undefined) {
          return actionRow.name;
        }
        return undefined;
      })
      .filter(action => action !== undefined) as string[];
  }

  public static deserializeRotation(rotation: string[]): CraftingAction[] {
    return rotation
      .map(actionName => CraftingActionsRegistry.ALL_ACTIONS.find(row => row.name === actionName))
      .filter(action => action !== undefined)
      .map((row: any) => row.action);
  }
}
