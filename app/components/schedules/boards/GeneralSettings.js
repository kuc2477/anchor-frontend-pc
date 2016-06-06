import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { ValueLinkPropType } from '../../../constants/types'
import ScheduleNameField from '../fields/ScheduleNameField'
import ScheduleURLField from '../fields/ScheduleURLField'
import CycleSelectField from '../fields/CycleSelectField'


export default class GeneralSettings extends React.Component {
  static propTypes = {
    nameValueLink: ValueLinkPropType.isRequired,
    urlValueLink: ValueLinkPropType.isRequired,
    cycleValueLink: ValueLinkPropType.isRequired,
    nameError: PropTypes.string,
    urlError: PropTypes.string,
    cycleError: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  // ===========
  // Base styles
  // ===========

  static NAME_FIELD_STYLE = {
    marginTop: 0
  };

  static URL_FIELD_STYLE = {
    marginTop: 0
  };

  static CYCLE_FIELD_STYLE = {
    marginTop: 0,
    marginBottom: 10
  };

  // ==================
  // Compensated styles
  // ==================

  static COMPENSATED_URL_FIELD_STYLE = {
    marginTop: -30
  };

  static COMPENSATED_CYCLE_FIELD_STYLE = {
    marginTop: -30
  };

  render() {
    const {
      // base styles
      NAME_FIELD_STYLE,
      URL_FIELD_STYLE,
      CYCLE_FIELD_STYLE,
      // compensated styles
      COMPENSATED_URL_FIELD_STYLE,
      COMPENSATED_CYCLE_FIELD_STYLE,
    } = this.constructor

    const {
      // value links
      nameValueLink,
      urlValueLink,
      cycleValueLink,
      // errors
      nameError,
      urlError,
      cycleError,
    } = this.props

    return (
      <div>
        <ScheduleNameField
          style={NAME_FIELD_STYLE}
          valueLink={nameValueLink}
          error={nameError}
        />
        <ScheduleURLField
          style={nameError ? COMPENSATED_URL_FIELD_STYLE : URL_FIELD_STYLE}
          valueLink={urlValueLink}
          error={urlError}
        />
        <CycleSelectField
          style={urlError ? COMPENSATED_CYCLE_FIELD_STYLE : CYCLE_FIELD_STYLE}
          valueLink={cycleValueLink}
          error={cycleError}
        />
      </div>
    )
  }
}
