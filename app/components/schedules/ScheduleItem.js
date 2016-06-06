import _ from 'lodash'
import Immutable from 'immutable'
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeableViews from 'react-swipeable-views'

import Paper from 'material-ui/lib/paper'
import { Colors } from 'material-ui/lib/styles'

import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import ListItem from 'material-ui/lib/lists/list-item'
import Toggle from 'material-ui/lib/toggle'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'

import Close from 'material-ui/lib/svg-icons/navigation/close'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import Cloud from 'material-ui/lib/svg-icons/file/cloud'
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue'
import CloudDownload from 'material-ui/lib/svg-icons/file/cloud-download'
import CloudDone from 'material-ui/lib/svg-icons/file/cloud-done'
import CloudOff from 'material-ui/lib/svg-icons/file/cloud-off'

import {
  unsaved,
  SchedulePropType,
  ValueLinkPropType
} from '../../constants/types'
import { SECONDARY, INACTIVE, PRIMARY } from '../../constants/colors'
import {
  PENDING,
  STARTED,
  SUCCESS,
  FAILURE,
  REVOKED,
  RETRY,
  SCHEDULE_ITEM_DEFAULT_MODE,
} from '../../constants/strings'
import { SCHEDULE_ITEM_MODES } from '../../constants/arrays'
import ScheduleItemProgress from './ScheduleItemProgress'


export default class ScheduleItem extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    schedule: SchedulePropType.isRequired,
    selected: PropTypes.bool.isRequired,
    del: PropTypes.func.isRequired,
    save: PropTypes.func,
    select: PropTypes.func.isRequired,
    enabledValueLink: ValueLinkPropType,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      hovering: false,
      mode: SCHEDULE_ITEM_DEFAULT_MODE,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = () => Immutable.fromJS(this.props)
    const state = () => Immutable.fromJS(this.state)
    const nextImmutableProps = () => Immutable.fromJS(nextProps)
    const nextImmutableState = () => Immutable.fromJS(nextState)
    return !state().equals(nextImmutableState()) ||
      !props().equals(nextImmutableProps())
  }

  static LIST_ITEM_REF = 'LIST_ITEM_REF';
  static ACTION_BUTTON_REF = 'ACTION_BUTTON_REF'
  static DEFAULT_NAME = 'Schedule name';
  static DEFAULT_URL = 'Schedule url to get subscribed';
  static DEFAULT_SAVE_DELAY = 500;
  static DEFAULT_CLICK_BUBBLE_DELAY = 300;

  // swipeable container styles
  static SLIDE_CONTAINER_STYLE = {
    paddingLeft: 0,
    paddingRight: 20,
  };
  static SLIDE_STYLE = {
    overflow: 'none',
    marginRight: 10,
  };

  // ======
  // Styles
  // ======

  _getStyle() {
    const { hovering } = this.state
    const { selected, style } = this.props
    const muiTheme = getMuiTheme()
    const textColor = muiTheme.rawTheme.palette.textColor
    const selectedColor = ColorManipulator.fade(textColor, 0.08)

    const baseStyle = {
      color: textColor,
      backgroundColor: selected && !hovering ? selectedColor : undefined
    }
    return Object.assign({}, baseStyle, style)
  }

  _getStateColor() {
    const { enabled, state } = this.props.schedule
    const color =
      [FAILURE, REVOKED, RETRY].includes(state) ? PRIMARY :
      enabled && [STARTED, SUCCESS].includes(state) ? SECONDARY : INACTIVE
    return color
  }

  // =============
  // Action Button
  // =============

  _getActionButton() {
    return (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="bottom-right"
      >
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )
  }

  _getActionButtonMenu() {
    const { ACTION_BUTTON_REF } = this.constructor
    const { del, schedule } = this.props
    return (
      <IconMenu
        ref={ACTION_BUTTON_REF}
        iconButtonElement={this._getActionButton()}
      >
        <MenuItem>
          <div
            className="row middle-md"
            onClick={_.partial(del, schedule.get('id'))}
          >
            <Close style={{ paddingLeft: 10, width: 20, height: 20 }} />
            <div style={{ paddingLeft: 5 }}>Delete</div>
          </div>
        </MenuItem>
      </IconMenu>
    )
  }

  // =========
  // Factories
  // =========

  _getStatusText() {
    const { schedule } = this.props
    const { state, enabled } = schedule.toJS()
    const text =
      state === FAILURE ? 'Something went wrong with reporters' : !enabled ? 'Disabled' :
      state === STARTED ? 'Reporters are collecting news for you' :
      state === PENDING ? 'Reporters are wating to be dispatched' :
      state === SUCCESS ? 'Reporters successfully collected news' :
          'Something went wrong with reporters'

    return text
  }

  _getStatusIcon() {
    const { schedule } = this.props
    const { state, enabled } = schedule.toJS()
    const icon = !enabled ? <CloudOff /> :
      state === 'STARTED' ? <CloudDownload /> :
      state === 'PENDING' ? <CloudQueue /> :
      state === 'SUCCESS' ? <CloudDone /> : <Cloud />

    return icon
  }

  _getDefaultItem() {
    const { LIST_ITEM_REF, DEFAULT_NAME, DEFAULT_URL } = this.constructor
    const { schedule } = this.props

    return (
      <ListItem
        style={{ height: 80, marginTop: 3 }}
        ref={LIST_ITEM_REF}
        primaryText={schedule.get('name') || DEFAULT_NAME}
        secondaryText={schedule.get('url') || DEFAULT_URL}
        leftIcon={this._getStatusIcon()}
        rightIconButton={this._getActionButtonMenu()}
        onMouseEnter={::this._onMouseEnter}
        onMouseLeave={::this._onMouseLeave}
        onClick={::this._onClick}
      />
    )
  }

  _getProgressItem() {
    const { schedule } = this.props
    const enabled = schedule.get('enabled')
    const toggle = <Toggle toggled={enabled} onToggle={::this._onToggle} />
    const progress = <ScheduleItemProgress schedule={schedule} />

    return (
      <ListItem
        secondaryText={this._getStatusText()}
        leftIcon={this._getStatusIcon()}
        onMouseEnter={::this._onMouseEnter}
        onMouseLeave={::this._onMouseLeave}
        onClick={::this._onClick}
        rightToggle={toggle}
      >
        {progress}
      </ListItem>
    )
  }

  // =========
  // Callbacks
  // =========

  _markJustClicked() {
    const { DEFAULT_CLICK_BUBBLE_DELAY } = this.constructor
    this.justClicked = true
    setTimeout(() => { this.justClicked = false }, DEFAULT_CLICK_BUBBLE_DELAY)
  }

  _justClicked() {
    return this.justClicked
  }

  _onMouseEnter() {
    const { select, schedule } = this.props
    this.setState({ hovering: true })
    select(schedule.get('id'))
  }

  _onMouseLeave() {
    this.setState({ hovering: false })
  }

  _onClick(e) {
    const { ACTION_BUTTON_REF } = this.constructor
    const actionButton = findDOMNode(this.refs[ACTION_BUTTON_REF])

    if (actionButton.contains(e.target) ||
        e.target.tagName.toLowerCase() === 'input') {
      return
    }

    const { mode } = this.state
    const size = SCHEDULE_ITEM_MODES.length
    const index = _.findIndex(SCHEDULE_ITEM_MODES, m => m === mode)
    const next = SCHEDULE_ITEM_MODES[(index + 1) % size]
    this._markJustClicked()
    this.setState({ mode: next })
    e.stopPropagation()
  }

  _onToggle(e, v) {
    if (this._justClicked()) {
      return
    }

    const { DEFAULT_SAVE_DELAY } = this.constructor
    const { schedule, enabledValueLink, save } = this.props
    // can't enable unsaved schedule
    if (unsaved(schedule)) {
      return
    }
    enabledValueLink.requestChange(null, v)
    setTimeout(save, DEFAULT_SAVE_DELAY)
  }

  // =========
  // Rendering
  // =========

  render() {
    const { SLIDE_STYLE, SLIDE_CONTAINER_STYLE } = this.constructor
    const { mode } = this.state
    const style = this._getStyle()
    const defaultItem = this._getDefaultItem()
    const progressItem = this._getProgressItem()
    const index = _.findIndex(SCHEDULE_ITEM_MODES, m => m === mode)

    return (
      <Paper style={style}>
        <SwipeableViews
          disabled
          index={index}
          style={SLIDE_CONTAINER_STYLE}
          slideStyle={SLIDE_STYLE}
        >
          {defaultItem}
          {progressItem}
        </SwipeableViews>
      </Paper>
    )
  }
}
