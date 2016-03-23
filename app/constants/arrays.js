import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from './strings'

function _getText(cycle) {
  const cycleInMinutes = cycle
  const cycleInHours = Math.round(cycle / 60)
  const plural = x => x === 1 ? '' : 's'

  return cycle < 60 ?
    `Every ${cycleInMinutes} minute${plural(cycleInMinutes)}` :
    `Every ${cycleInHours} hour${plural(cycleInHours)}`
}

export const CYCLE_OPTIONS = [5, 15, 30, 45, 60]
export const CYCLE_OPTION_TEXTS = CYCLE_OPTIONS.map(_getText)

export const SCHEDULE_DASH_BOARDS = [
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS
];
