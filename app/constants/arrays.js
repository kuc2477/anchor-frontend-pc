import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from './strings'

function _getText(cycle) {
  const pluralize = x => x > 1 ? 's' : ''
  const isplural = x => x > 1

  const cycleInMinutes = isplural(cycle) ? `${cycle} ` : ''
  const cycleInHours = isplural(Math.round(cycle / 60)) ?
    `${Math.round(cycle / 60)} ` : ''

  return cycle < 60 ?
    `Every ${cycleInMinutes}minute${pluralize(cycleInMinutes)}` :
    `Every ${cycleInHours}hour${pluralize(cycleInHours)}`
}

export const CYCLE_OPTIONS = [10, 45, 60, 180, 360]
export const CYCLE_OPTION_TEXTS = CYCLE_OPTIONS.map(_getText)

export const SCHEDULE_DASH_BOARDS = [
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS
];
