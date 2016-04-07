import _ from 'lodash'
import React, { PropTypes } from 'react'

import Paper from 'material-ui/lib/paper'
import { Colors } from 'material-ui/lib/styles'

import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import ListItem from 'material-ui/lib/lists/list-item'
import LinearProgress from 'material-ui/lib/linear-progress'
import Divider from 'material-ui/lib/divider'
import Toggle from 'material-ui/lib/toggle'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'

import Close from 'material-ui/lib/svg-icons/navigation/close'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox'
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue'
import CloudDownload from 'material-ui/lib/svg-icons/file/cloud-download'
import CloudDone from 'material-ui/lib/svg-icons/file/cloud-done'
import CloudOff from 'material-ui/lib/svg-icons/file/cloud-off'

import { SchedulePropType, ValueLinkPropType } from '../../constants/types'


export default class ScheduleItem extends React.Component {
  static propTypes = {
    key: PropTypes.string,
    style: PropTypes.object,
    schedule: SchedulePropType.isRequired,
    selected: PropTypes.bool.isRequired,
    opened: PropTypes.bool.isRequired,
    del: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    enabledValueLink: ValueLinkPropType.isRequired
  };

  static PROGRESS_STYLE = {
    marginTop: 12,
    width: '80%',
  };

  static LIST_ITEM_REF = 'LIST_ITEM_REF';

  static DEFAULT_NAME = 'Schedule name';
  static DEFAULT_URL = 'Schedule url to get subscribed';
  static DEFAULT_SAVE_DELAY = 500;

  componentDidMount() {
    const listItem = this.refs[this.constructor.LIST_ITEM_REF]
    listItem.setState({ open: this.props.opened })
  }

  componentWillReceiveProps(nextProps) {
    const listItem = this.refs[this.constructor.LIST_ITEM_REF]
    listItem.setState({ open: nextProps.opened })
  }

  _getProgressItem() {
    const { PROGRESS_STYLE, DEFAULT_SAVE_DELAY } = this.constructor
    const { schedule, save, enabledValueLink } = this.props

    const mode = schedule.isActive && status === 'STARTED' ?
      'indeterminate' : 'determinate'

    const text =
      !schedule.enabled ? 'Disabled' :
      schedule.state === 'STARTED' ? 'Reporters are collecting news for you..' :
      schedule.state === 'PENDING' ? 'Reporters are wating to be dispatched..' :
      schedule.state === 'SUCCESS' ? 'Reporters successfully collected news!' :
        'Something went wrong with reporters!'

    const icon =
      !schedule.enabled ? <CloudOff /> :
      schedule.state === 'STARTED' ? <CloudDownload /> :
      schedule.state === 'PENDING' ? <CloudQueue /> :
      schedule.state === 'SUCCESS' ? <CloudDone /> : <CloudQueue />

    const onToggle = (e, v) => {
      enabledValueLink.requestChange(null, v)
      setTimeout(save, DEFAULT_SAVE_DELAY)
    }

    const toggle = <Toggle toggled={schedule.enabled} onToggle={onToggle} />
    const progressBar = <LinearProgress style={PROGRESS_STYLE} mode={mode} />

    return (
      <div key={schedule.id} style={{ margin: 0, padding: 0 }} >
        <Divider style={{ margin: 0, padding: 0 }} />
        <ListItem
          secondaryText={text}
          leftIcon={icon}
          rightToggle={toggle}
        >
          {progressBar}
        </ListItem>
      </div>
    )
  }

  _getActionButton() {
    return (
      <IconButton touch tooltip="more" tooltipPosition="bottom-right" >
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )
  }

  _getActionButtonMenu() {
    const { del, schedule } = this.props
    return (
      <IconMenu iconButtonElement={this._getActionButton()}>
        <MenuItem>
          <div className="row middle-md" onClick={_.partial(del, schedule.id)}>
            <Close style={{ paddingLeft: 10, width: 20, height: 20 }} />
            <div style={{ paddingLeft: 5 }}>Delete</div>
          </div>
        </MenuItem>
      </IconMenu>
    )
  }

  _getStyle() {
    const { selected, style } = this.props
    const muiTheme = getMuiTheme()
    const textColor = muiTheme.rawTheme.palette.textColor
    const selectedColor = ColorManipulator.fade(textColor, 0.08)

    const baseStyle = {
      color: textColor,
      backgroundColor: selected ? selectedColor : undefined
    }
    return Object.assign({}, baseStyle, style)
  }

  render() {
    const { LIST_ITEM_REF, DEFAULT_NAME, DEFAULT_URL } = this.constructor
    const { schedule, select, toggleOpen, key } = this.props

    return (
      <Paper
        key={key}
        style={this._getStyle()}
        onMouseEnter={_.partial(select, schedule.id)}
      >
        <ListItem
          ref={LIST_ITEM_REF}
          primaryText={schedule.name || DEFAULT_NAME}
          secondaryText={schedule.url || DEFAULT_URL}
          leftIcon={<ContentInbox />}
          rightIconButton={this._getActionButtonMenu()}
          nestedItems={[this._getProgressItem()]}
          onClick={_.partial(toggleOpen, schedule.id)}
        />

      </Paper>
    )
  }
}
