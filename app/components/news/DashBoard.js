import React, { PropTypes } from 'react'
import {
  Card,
  CardTitle,
  CardHeader,
  CardMedia,
} from 'material-ui/lib/card'
import ChromeReaderMode from 'material-ui/lib/svg-icons/action/chrome-reader-mode'


import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'
import { SchedulePropType } from '../../constants/types.js'


export default class DashBoard extends React.Component {
  static propTypes = {
    schedulesById: PropTypes.arrayOf(SchedulePropType),
    schedules: PropTypes.arrayOf(PropTypes.number)
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

  render() {
    // TODO: NOT IMPLEMENTED YET
    const { STYLE } = this.constructor
    return (
      <Card
        style={STYLE}
        zDepth={STYLE.zDepth}
      >
        <CardTitle
          title="You might also like"
          subtitle="Our neural network's recommendation"
        />
      </Card>
    )
  }
}
