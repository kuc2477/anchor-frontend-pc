import _ from 'lodash'

import React, { PropTypes } from 'react'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import {
  CYCLE_OPTIONS,
  CYCLE_OPTION_TEXTS
} from '../../constants/arrays'


export default class CycleSelectField extends React.Component {
  static propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.number.isRequired
  };

  static STYLE = {
    marginTop: -20,
    marginBottom: 10
  };

  _getCycleMenuItemNodes() {
    return _.zip(CYCLE_OPTIONS, CYCLE_OPTION_TEXTS).map((zipped) => {
      const [cycle, text] = zipped
      return <MenuItem value={cycle} primaryText={text} /> })
  }


  render() {
    const cycleMenuItemNodes = this._getCycleMenuItemNodes()

    return (
      <div style={this.constructor.STYLE}>
        <SelectField
          floatingLabelText="News arrival cycle"
          {...this.props}
        >
          {cycleMenuItemNodes}
        </SelectField>
      </div>
    )
  }
}
