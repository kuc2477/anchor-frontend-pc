import React, { PropTypes } from 'react'
import { Colors } from 'material-ui/lib/styles'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import { SCHEDULE_DASH_BOARDS } from '../../../constants/arrays'
import { PRIMARY, INACTIVE } from '../../../constants/colors'

export default class BoardMenuIconButton extends React.Component {
  static propTypes = {
    board: PropTypes.oneOf(SCHEDULE_DASH_BOARDS).isRequired,
    setBoard: PropTypes.func.isRequired,
    labels: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
  };

  static MENU_ITEM_ICON_STYLE = {
    marginTop: 13,
    height: 20,
    width: 20
  };

  _handleChange(event, value) {
    this.props.setBoard(value)
  }

  _getIconButton() {
    return (
      <IconButton>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )
  }

  _getMenuItems() {
    const { MENU_ITEM_ICON_STYLE } = this.constructor
    const { board, labels, icons } = this.props
    return SCHEDULE_DASH_BOARDS.map(b => {
      const label = labels[b]
      const iconClass = icons[b]
      const icon = React.createElement(iconClass, {
        color: b === board ? PRIMARY : INACTIVE,
        style: MENU_ITEM_ICON_STYLE
      })
      return <MenuItem value={b} primaryText={label} leftIcon={icon} />
    })
  }

  render() {
    const { board } = this.props
    const iconButton = this._getIconButton()
    const menuItems = this._getMenuItems()

    return (
      <IconMenu
        value={board}
        onChange={::this._handleChange}
        iconButtonElement={iconButton}
      >
        {menuItems}
      </IconMenu>
    )
  }
}
