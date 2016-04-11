import _ from 'lodash'
import React, { PropTypes } from 'react'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import BrotherSiteField from './BrotherSiteField'
import { ValueLinkPropType } from '../../../constants/types'
import { MAX_BROTHER_SITE_NUMBER } from '../../../constants/numbers'
import colors from '../../../constants/colors'


export default class BrotherSiteFieldSet extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    error: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object,
  };

  static TITLE_STYLE = {
    marginLeft: 0
  };

  static LABEL_STYLE = {
    color: colors.INACTIVE,
    fontSize: 14
  };

  _onBrotherSiteFieldChange(index, url) {
    const { value: brothers, requestChange } = this.props.valueLink
    const updated =
      // add new url field if changed brother site is new
      brothers.length <= index ? [...brothers, url] :
      // change url if changed url is not empty string
      url && url.length ? brothers.map((v, i) => i === index ? url : v) :
      // remove changed brother field if changed to empty string
      brothers.filter((v, i) => i !== index)

    requestChange(null, updated)
  }

  _getBrotherSiteFieldNodes() {
    const { error, valueLink } = this.props
    const { value: brothers } = valueLink

    // brother field text change callback factory
    const onChangeFactory = index => (e, v) => {
      this._onBrotherSiteFieldChange(
        index, (e.target && e.target.value) || v
      )
    }

    const visibleBrothers =
      !brothers ? [] :
      brothers.length >= MAX_BROTHER_SITE_NUMBER ? brothers :
      [...brothers, '']

    return visibleBrothers.map((url, index) => (
      <BrotherSiteField
        url={url} index={index} error={error[index]}
        onChange={onChangeFactory(index)}
      />
    ))
  }

  render() {
    const { LABEL_STYLE } = this.constructor
    const { style } = this.props
    const brotherSiteFieldNodes = this._getBrotherSiteFieldNodes()

    return (
      <div style={style}>
        <small style={LABEL_STYLE}>Brother sites</small><br/>
        {brotherSiteFieldNodes}
      </div>
    )
  }
}
