import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'
import OptionURLField from './OptionURLField'
import { ValueLinkPropType } from '../../../constants/types'
import colors from '../../../constants/colors'
import { MAX_OPTION_URL_FIELD_NUMBER } from '../../../constants/numbers'


export default class OptionURLFieldSet extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    valueLink: ValueLinkPropType.isRequired,
    error: ImmutablePropTypes.listOf(PropTypes.string),
    maxOptionUrlNumber: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    maxOptionUrlNumber: MAX_OPTION_URL_FIELD_NUMBER
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static LABEL_STYLE = {
    color: colors.INACTIVE,
    fontSize: 14
  };

  static OPTION_URL_FIELD_STYLE = {
    marginBottom: 0
  };

  _onOptionURLFieldChange(index, url) {
    const { value: urls, requestChange } = this.props.valueLink
    const updated =
      // add new url field if changed brother site is new
      urls.size <= index ? urls.push(url) :
      // change url if changed url is not empty string
      url && url.length ? urls.map((v, i) => i === index ? url : v) :
      // remove changed brother field if changed to empty string
      urls.filter((v, i) => i !== index)

    requestChange(null, updated)
  }

  _getOptionURLFields() {
    const { OPTION_URL_FIELD_STYLE } = this.constructor
    const { error, valueLink, maxOptionUrlNumber } = this.props
    const { value: urls } = valueLink

    // url field text change callback factory
    const onChangeFactory = index => (e, v) => {
      this._onOptionURLFieldChange(
        index, (e.target && e.target.value) || v
      )
    }

    const visibleUrls = !urls ?
      [] : urls.size >= maxOptionUrlNumber ? urls : urls.push('')

    return visibleUrls.map((url, index) => (
      <OptionURLField
        url={url}
        key={index}
        index={index}
        error={error.get(index)}
        onChange={onChangeFactory(index)}
        style={OPTION_URL_FIELD_STYLE}
      />
    ))
  }

  render() {
    const { LABEL_STYLE } = this.constructor
    const { label, style } = this.props
    const optionURLFieldNodes = this._getOptionURLFields()

    return (
      <div style={style}>
        <small style={LABEL_STYLE}>{label}</small><br/>
        {optionURLFieldNodes}
      </div>
    )
  }
}
