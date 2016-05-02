import React, { PropTypes } from 'react'
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
import { SchedulePropType } from '../../constants/types.js'


export default class DashBoard extends React.Component {
  static propTypes = {
    recommendations: PropTypes.arrayOf(PropTypes.number),
    recommendationsById: PropTypes.arrayOf(SchedulePropType),
    isFetchingRecommendations: PropTypes.bool.isRequired,
    didFetchingRecommendationsFail: PropTypes.bool.isRequired,
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
    const { isFetchingRecommendations } = this.props
    const indicator = isFetchingRecommendations ?
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
