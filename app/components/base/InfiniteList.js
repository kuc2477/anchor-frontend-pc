import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import { WINDOW_WIDTH } from '../../constants/numbers'


export default class InfiniteList extends React.Component {
  static propTypes = {
    onLatestLoad: PropTypes.func,
    latestContentExists: PropTypes.bool,
    latestContentIndicatorProps: PropTypes.object,
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

  // TODO: NOT IMPLEMENTED YET
  _getLatestContentIndicator() {
    const { onLatestLoad, latestContentIndicatorProps } = this.props
    return (
      <div onclick={onLatestLoad}>LOAD LATEST NEWS</div>
    )
  }

  _getLoadingIndicator() {
    return (
      <RefreshIndicator
        {...this.props.loadingIndicatorProps}
        status="loading"
      />
    )
  }

  render() {
    const {
      latestContentExists,
      isInfiniteLoading,
      children,
      ...rest
    } = this.props

    // indicators
    const latestContentIndicator = latestContentExists ?
      this._getLatestContentIndicator() : null
    const loadingIndicator = isInfiniteLoading ?
      this._getLoadingIndicator() : null

    return (
      <div>
        {latestContentIndicator}
        {loadingIndicator}
        <Infinite {...rest}>
          {children}
        </Infinite>
      </div>
    )
  }
}
