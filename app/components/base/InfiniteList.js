import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import { WINDOW_WIDTH } from '../../constants/numbers'


export default class InfiniteList extends React.Component {
  static propTypes = {
    isInfiniteLoading: PropTypes.bool,
    loadingIndicatorProps: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    isInfiniteLoading: false,
    loadingIndicatorProps: {
      size: 40,
      left: WINDOW_WIDTH / 3 - 80,
      top: 150
    },
  };

  _getLoadingIndicator() {
    return (
      <RefreshIndicator
        {...this.props.loadingIndicatorProps}
        status="loading"
      />
    )
  }

  render() {
    const { isInfiniteLoading, children, ...rest } = this.props
    const indicator = isInfiniteLoading ? this._getLoadingIndicator() : null
    return (
      <div>
        {indicator}
        <Infinite {...rest}>
          {children}
        </Infinite>
      </div>
    )
  }
}
