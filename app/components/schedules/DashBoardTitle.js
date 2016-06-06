import _ from 'lodash'
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Ink from 'react-ink'
import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff'
import DeviceHub from 'material-ui/lib/svg-icons/hardware/device-hub'
import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
  DASH_BOARD_URL_SETTINGS,
} from '../../constants/strings'
import { SECONDARY, INACTIVE } from '../../constants/colors'
import { SCHEDULE_DASH_BOARDS } from '../../constants/arrays'
import Title from '../base/Title'
import BoardMenuIconButton from './menus/BoardMenuIconButton'


export default class DashBoardTitle extends React.Component {
  static propTypes = {
    setBoard: PropTypes.func.isRequired,
    board: PropTypes.oneOf(SCHEDULE_DASH_BOARDS).isRequired,
  };

  constructor(props) {
    super(props)
    this.state = { hovering: false }
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static RIPPLE_DELAY = 220;
  static HOVER_COLORS = {
    on: SECONDARY,
    off: INACTIVE,
  };
  static TITLE_LABELS = {
    [DASH_BOARD_GENERAL_SETTINGS]: 'General Settings',
    [DASH_BOARD_ADVANCED_SETTINGS]: 'Advanced Settings',
    [DASH_BOARD_URL_SETTINGS]: 'URL Settings',
  };
  static TITLE_ICONS = {
    [DASH_BOARD_GENERAL_SETTINGS]: ActionSettings,
    [DASH_BOARD_ADVANCED_SETTINGS]: ActionFlightTakeoff,
    [DASH_BOARD_URL_SETTINGS]: DeviceHub,
  };
  static TITLE_ROW_STYLE = {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    className: 'row middle-md between-md',
  };
  static TITLE_ICON_STYLE = {
    height: 25,
    width: 25,
    marginRight: 10,
  };
  static TITLE_STYLE = {
    padding: 5,
    position: 'relative',
    className: 'clickable',
  };

  _getIcon() {
    const { hovering } = this.state
    const { board } = this.props
    const {
      HOVER_COLORS,
      TITLE_ICONS,
      TITLE_ICON_STYLE,
    } = this.constructor

    const iconColor = hovering ? HOVER_COLORS.on : HOVER_COLORS.off
    const iconClass = TITLE_ICONS[board]
    return React.createElement(iconClass, {
      style: TITLE_ICON_STYLE, color: iconColor
    })
  }

  _getLabel() {
    const { TITLE_LABELS } = this.constructor
    const { board } = this.props
    return TITLE_LABELS[board]
  }

  _getTitle() {
    const { hovering } = this.state
    const { TITLE_STYLE, HOVER_COLORS } = this.constructor
    const style = Object.assign({}, TITLE_STYLE, {
      color: hovering ? HOVER_COLORS.on : HOVER_COLORS.off
    })

    const icon = this._getIcon()
    const label = this._getLabel()

    return (
      <Title
        style={style}
        className={style.className}
        onClick={::this.proceed}
        onMouseEnter={::this.hoverEnter}
        onMouseLeave={::this.hoverLeave}
      >
        {icon}
        {label}
        <Ink background={false} style={{ color: HOVER_COLORS.off }} />
      </Title>
    )
  }

  proceed() {
    const { board, setBoard } = this.props
    const { RIPPLE_DELAY } = this.constructor
    const boards = SCHEDULE_DASH_BOARDS
    const currentIndex = _.findIndex(boards, b => b === board)
    setTimeout(() => {
      setBoard(boards[(currentIndex + 1) % boards.length])
    }, RIPPLE_DELAY)
  }

  hoverEnter() {
    this.setState({ hovering: true })
  }

  hoverLeave() {
    this.setState({ hovering: false })
  }

  render() {
    const {
      TITLE_ROW_STYLE,
      TITLE_LABELS,
      TITLE_ICONS,
    } = this.constructor
    const { board, setBoard } = this.props
    const title = this._getTitle()

    return (
      <div style={TITLE_ROW_STYLE} className={TITLE_ROW_STYLE.className}>
        {title}
        <BoardMenuIconButton
          board={board}
          setBoard={setBoard}
          labels={TITLE_LABELS}
          icons={TITLE_ICONS}
        />
      </div>
    )
  }
}
