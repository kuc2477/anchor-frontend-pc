import React, { PropTypes } from 'react'
import Colors from 'material-ui/lib/styles/colors'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'


export default class BoardMenuIconButton extends React.Component {
  render() {
    const iconButton = (
      <IconButton>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )
    return (
      <IconMenu iconButtonElement={iconButton}>
        <MenuItem primaryText="General Settings" />
        <MenuItem primaryText="Advanced Settings" />
      </IconMenu>
    )
  }
}
