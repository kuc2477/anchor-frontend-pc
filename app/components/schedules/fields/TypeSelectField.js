import _ from 'lodash'
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { URL } from '../../../constants/strings'
import { SCHEDULE_TYPES, SCHEDULE_TYPE_TEXTS } from '../../../constants/arrays'
import { ValueLinkPropType } from '../../../constants/types'


export default class TypeSelectField extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    style: PropTypes.object,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static STYLE = {
    marginTop: -10,
  };

  _getMenuItemNodes() {
    return _.zip(SCHEDULE_TYPES, SCHEDULE_TYPE_TEXTS).map(zipped => {
      const [ type, text ] = zipped
      return <MenuItem key={type} value={type} primaryText={text} />
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
    const typeMenuItemNodes = this._getMenuItemNodes()

    return (
        <SelectField
          floatingLabelText="News type"
          style={mergedStyle}
          value={value || URL}
          errorText={error}
          onChange={::this._handleChange}
          {...rest}
        >
          {typeMenuItemNodes}
        </SelectField>
    )
  }
}
