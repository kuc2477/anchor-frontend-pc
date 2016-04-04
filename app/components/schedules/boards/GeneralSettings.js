import React, { PropTypes } from 'react'
import { decamelize } from 'humps'

import { ValueLinkPropType } from '../../../constants/types'
import ScheduleNameField from '../fields/ScheduleNameField'
import ScheduleURLField from '../fields/ScheduleURLField'
import CycleSelectField from '../fields/CycleSelectField'
import MaxDepthSlider from '../fields/MaxDepthSlider'
import MaxDistanceSlider from '../fields/MaxDistanceSlider'


export default class GeneralSettings extends React.Component {
  static propTypes = {
    nameValueLink: ValueLinkPropType.isRequired,
    urlValueLink: ValueLinkPropType.isRequired,
    cycleValueLink: ValueLinkPropType.isRequired,
    maxDistValueLink: ValueLinkPropType.isRequired,
    maxDepthValueLink: ValueLinkPropType.isRequired,
    nameError: PropTypes.string,
    urlError: PropTypes.string,
    cycleError: PropTypes.string,
  };

  // ===========
  // Base styles
  // ===========

  static NAME_FIELD_STYLE = {
    marginTop: 0
  };

  static URL_FIELD_STYLE = {
    marginTop: -10
  };

  static CYCLE_FIELD_STYLE = {
  };

  static MAX_DEPTH_FIELD_STYLE = {
    marginTop: 10
  };

  static MAX_DIST_FIELD_STYLE = {
  };

  // ==================
  // Compensated styles
  // ==================

  static COMPENSATED_URL_FIELD_STYLE = {
    marginTop: -20
  };

  static COMPENSATED_CYCLE_FIELD_STYLE = {
    marginTop: -20
  };

  static COMPENSATED_MAX_DEPTH_FIELD_STYLE = {
    marginTop: -5
  };

  render() {
    const {
      // base styles
      NAME_FIELD_STYLE,
      URL_FIELD_STYLE,
      CYCLE_FIELD_STYLE,
      MAX_DEPTH_FIELD_STYLE,
      MAX_DIST_FIELD_STYLE,
      // compensated styles
      COMPENSATED_URL_FIELD_STYLE,
      COMPENSATED_CYCLE_FIELD_STYLE,
      COMPENSATED_MAX_DEPTH_FIELD_STYLE,
    } = this.constructor

    const {
      // value links
      nameValueLink,
      urlValueLink,
      cycleValueLink,
      maxDepthValueLink,
      maxDistValueLink,
      // errors
      nameError,
      urlError,
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
        <MaxDepthSlider
          style={
            nameError || urlError ?
            COMPENSATED_MAX_DEPTH_FIELD_STYLE: MAX_DEPTH_FIELD_STYLE}
          valueLink={maxDistValueLink}
        />
        <MaxDistanceSlider
          style={MAX_DIST_FIELD_STYLE}
          valueLink={maxDepthValueLink}
        />
      </div>
    )
  }
}
