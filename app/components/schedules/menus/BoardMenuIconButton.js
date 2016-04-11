import React, { PropTypes } from 'react'
import { Colors } from 'material-ui/lib/styles'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'

import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../../../constants/strings'
import { PRIMARY, INACTIVE } from '../../../constants/colors'


export default class BoardMenuIconButton extends React.Component {
  static propTypes = {
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]).isRequired,
    setBoard: PropTypes.func.isRequired
  };

  static MENU_ITEM_ICON_STYLE = {
    marginTop: 13,
    height: 20,
    width: 20
  };

  _handleChange(event, value) {
    this.props.setBoard(value)
  }

  render() {
    const { MENU_ITEM_ICON_STYLE } = this.constructor
    const { board } = this.props

    const iconButton = (
      <IconButton>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )

    return (
      <IconMenu
        value={board}
        onChange={::this._handleChange}
        iconButtonElement={iconButton}
      >
        <MenuItem
          primaryText="General Settings"
          value={DASH_BOARD_GENERAL_SETTINGS}
          leftIcon={
            <ActionSettings
              color={board === DASH_BOARD_GENERAL_SETTINGS ? PRIMARY : INACTIVE}
              style={MENU_ITEM_ICON_STYLE}
            />
          }
        />
        <MenuItem
          primaryText="Advanced Settings"
          value={DASH_BOARD_ADVANCED_SETTINGS}
          leftIcon={
            <ActionFlightTakeoff
              color={board === DASH_BOARD_ADVANCED_SETTINGS ? PRIMARY : INACTIVE}
              style={MENU_ITEM_ICON_STYLE}
            />
          }
        />
      </IconMenu>
    )
  }
}
