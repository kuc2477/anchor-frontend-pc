import React, { PropTypes } from 'react'
import { Colors } from 'material-ui/lib/styles'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../../../constants/strings'


export default class BoardMenuIconButton extends React.Component {
  static propTypes = {
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]).isRequired,
    setBoard: PropTypes.func.isRequired
  };

  _handleChange(event, value) {
    this.props.setBoard(value)
  }

  render() {
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
          value={DASH_BOARD_GENERAL_SETTINGS}
          primaryText="General Settings"
        />
        <MenuItem
          value={DASH_BOARD_ADVANCED_SETTINGS}
          primaryText="Advanced Settings"
        />
      </IconMenu>
    )
  }
}
