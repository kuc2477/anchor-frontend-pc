import _ from 'lodash'

import React, { PropTypes } from 'react'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import {
  CYCLE_OPTIONS,
  CYCLE_OPTION_TEXTS
} from '../../../constants/arrays'
import { ValueLinkPropType } from '../../../constants/types'


export default class CycleSelectField extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    style: PropTypes.object,
  };

  _getMenuItemNodes() {
    return _.zip(CYCLE_OPTIONS, CYCLE_OPTION_TEXTS).map(zipped => {
      const [cycle, text] = zipped
      return <MenuItem key={cycle} value={cycle} primaryText={text} />
    })
  }

  _handleChange(event, index, value) {
    const { requestChange } = this.props.valueLink
    requestChange(null, value)
  }


  render() {
    const { style, valueLink, ...rest } = this.props
    const { value } = valueLink
    const cycleMenuItemNodes = this._getMenuItemNodes()

    return (
        <SelectField
          floatingLabelText="News arrival cycle"
          style={style}
          value={value}
          onChange={::this._handleChange}
          {...rest}
        >
          {cycleMenuItemNodes}
        </SelectField>
    )
  }
}
