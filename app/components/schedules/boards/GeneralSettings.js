import React from 'react'

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
    maxDepthValueLink: ValueLinkPropType.isRequired,
    maxDistValueLink: ValueLinkPropType.isRequired,
  };

  static NAME_FIELD_STYLE = {
    marginTop: -5,
    marginBottom: -5,
  };

  static URL_FIELD_STYLE = {
    marginBottom: -5,
  };

  static CYCLE_FIELD_STYLE = {
    marginBottom: 25,
  };

  static MAX_DEPTH_FIELD_STYLE = {
    marginBottom: 30
  };

  static MAX_DIST_FIELD_STYLE = {
    marginBottom: 30
  };

  render() {
    const {
      NAME_FIELD_STYLE, URL_FIELD_STYLE, CYCLE_FIELD_STYLE,
      MAX_DEPTH_FIELD_STYLE, MAX_DIST_FIELD_STYLE,
    } = this.constructor

    const {
      nameValueLink, urlValueLink, cycleValueLink,
      maxDepthValueLink, maxDistValueLink,
    } = this.props

    return (
      <div>
        <ScheduleNameField style={NAME_FIELD_STYLE} valueLink={nameValueLink}/>
        <ScheduleURLField style={URL_FIELD_STYLE} valueLink={urlValueLink} />
        <CycleSelectField style={CYCLE_FIELD_STYLE} valueLink={cycleValueLink} />
        <MaxDepthSlider style={MAX_DEPTH_FIELD_STYLE} valueLink={maxDistValueLink} />
        <MaxDistanceSlider style={MAX_DIST_FIELD_STYLE} valueLink={maxDepthValueLink} />
      </div>
    )
  }
}
