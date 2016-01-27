import React, { PropTypes } from 'React'
import ImmutablePropTypes from 'react-immutable-proptypes'

import BrotherSiteField from './BrotherSiteField'


export default class BrotherSiteFieldSet extends React.Component {
  static propTypes = {
    brothers: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  _getBrotherSiteFieldNodes() {
    return this.props.brothers.map(url => <BrotherSiteField url={url} />)
  }

  render() {
    const brotherSiteFieldNodes = this._getBrotherSiteFieldNodes()

    return (
      <div>
        Brother sites
        {brotherSiteFieldNodes}
      </div>
    )
  }
}
