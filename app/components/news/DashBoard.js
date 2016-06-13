import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardMedia,
} from 'material-ui/lib/card'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import ChromeReaderMode from 'material-ui/lib/svg-icons/action/chrome-reader-mode'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'
import { NewsPropType, SchedulePropType } from '../../constants/types.js'


export default class DashBoard extends React.Component {
  static propTypes = {
    recomms: ImmutablePropTypes.listOf(PropTypes.number),
    recommsById: ImmutablePropTypes.contains(SchedulePropType),
    isFetchingRecomms: PropTypes.bool.isRequired,
    didFetchingRecommsFailed: PropTypes.bool.isRequired,
  };

  static LOADING_INDICATOR_PROPS = {
    size: 40,
    left: WINDOW_WIDTH - 270,
    top: 250,
  };

  // root element style
  static STYLE = {
    width: WINDOW_WIDTH * 0.4 - 20,
    height: WINDOW_HEIGHT * 0.6 - 30,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 80,
    paddingTop: -20,
    paddingLeft: 20,
    zDepth: 1,
    position: 'fixed',
  };

  _getLoadingIndicator() {
    return (
      <RefreshIndicator
        {...this.constructor.LOADING_INDICATOR_PROPS}
        status="loading"
      />
    )
  }

  render() {
    const { STYLE } = this.constructor
    const { isFetchingRecomms } = this.props
    const indicator = isFetchingRecomms ?
      this._getLoadingIndicator() : null

    return (
      <div>
        {indicator}
        <Card
          style={STYLE}
          zDepth={STYLE.zDepth}
        >
          <CardTitle
            title="You might also like"
            subtitle="Our neural network's recommendation"
          />
          <CardText>
          </CardText>
        </Card>
      </div>
    )
  }
}
