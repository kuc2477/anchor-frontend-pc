import _ from 'lodash'
import React, { PropTypes } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import {
  CYCLE_OPTIONS,
  CYCLE_OPTION_TEXTS
} from '../../../constants/arrays'
import { ValueLinkPropType } from '../../../constants/types'


class CycleSelectField extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    style: PropTypes.object,
    error: PropTypes.string,
  };

  static STYLE = {
    marginTop: -10
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
    const { STYLE } = this.constructor
    const { style, valueLink, error, ...rest } = this.props

    const mergedStyle = Object.assign({}, STYLE, style)
    const { value } = valueLink

    const cycleMenuItemNodes = this._getMenuItemNodes()

    return (
        <SelectField
          floatingLabelText="News arrival cycle"
          style={mergedStyle}
          value={value}
          errorText={error}
          onChange={::this._handleChange}
          {...rest}
        >
          {cycleMenuItemNodes}
        </SelectField>
    )
  }
}


export default immutableRenderDecorator(CycleSelectField)
