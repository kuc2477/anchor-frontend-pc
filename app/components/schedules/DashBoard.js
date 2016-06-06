import _ from 'lodash'
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Paper from 'material-ui/lib/paper'
import SwipeableViews from 'react-swipeable-views'

import DashBoardTitle from './DashBoardTitle'
import GeneralSettings from './boards/GeneralSettings'
import AdvancedSettings from './boards/AdvancedSettings'
import { ValueLinkPropType } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'
import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../../constants/strings'
import { SCHEDULE_DASH_BOARDS } from '../../constants/arrays'


export default class DashBoard extends React.Component {
  static propTypes = {
    schedule: PropTypes.number,
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]).isRequired,
    // value links
    enabledValueLink: ValueLinkPropType.isRequired,
    nameValueLink: ValueLinkPropType.isRequired,
    urlValueLink: ValueLinkPropType.isRequired,
    cycleValueLink: ValueLinkPropType.isRequired,
    maxVisitValueLink: ValueLinkPropType.isRequired,
    maxDistValueLink: ValueLinkPropType.isRequired,
    urlWhitelistValueLink: ValueLinkPropType.isRequired,
    urlBlacklistValueLink: ValueLinkPropType.isRequired,
    // errors
    nameError: PropTypes.string,
    urlError: PropTypes.string,
    cycleError: PropTypes.string,
    urlWhitelistError: ImmutablePropTypes.listOf(PropTypes.string),
    urlBlacklistError: ImmutablePropTypes.listOf(PropTypes.string),
    // schedule entry / board manipulation
    save: PropTypes.func.isRequired,
    setBoard: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  // root element style
  static STYLE = {
    width: WINDOW_WIDTH * 0.5 - 140,
    height: WINDOW_HEIGHT * 0.8 - 30,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 70,
    paddingTop: -20,
    paddingLeft: 20,
    zDepth: 1,
    position: 'fixed',
  };

  // swipeable container style
  static SLIDE_CONTAINER_STYLE = {
    paddingLeft: 20,
  };

  static SLIDE_STYLE = {
    overflow: 'none',
    marginRight: 20,
  };

  _getContainerStyle() {
    const { STYLE, SLIDE_CONTAINER_STYLE } = this.constructor
    return {
      width: STYLE.width,
      height: STYLE.height,
      ...SLIDE_CONTAINER_STYLE
    }
  }

  render() {
    const SLIDE_CONTAINER_STYLE = this._getContainerStyle()
    const { STYLE, SLIDE_STYLE } = this.constructor
    const { board, setBoard, save } = this.props

    const generalSettingsProps = _.pick(this.props, [
      'nameValueLink', 'urlValueLink', 'cycleValueLink',
      'maxVisitValueLink', 'maxDistValueLink',
      'nameError', 'urlError', 'cycleError'
    ])

    const advancedSettingsProps = _.pick(this.props, [
      'urlWhitelistValueLink', 'urlWhitelistError',
      'urlBlacklistValueLink', 'urlBlacklistError',
    ])

    return (
      <Paper
        zDepth={STYLE.zDepth}
        style={STYLE}
        onMouseLeave={save}
      >
        <DashBoardTitle board={board} setBoard={setBoard} />
        <SwipeableViews
          disabled
          index={_.findIndex(SCHEDULE_DASH_BOARDS, b => b === board)}
          style={SLIDE_CONTAINER_STYLE}
          slideStyle={SLIDE_STYLE}
        >
          <GeneralSettings {...generalSettingsProps} />
          <AdvancedSettings {...advancedSettingsProps} />
        </SwipeableViews>
      </Paper>
    )
  }
}
