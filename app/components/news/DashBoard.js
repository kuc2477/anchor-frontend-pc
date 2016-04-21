import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'


export default class DashBoard extends React.Component {
  // root element style
  static STYLE = {
    width: WINDOW_WIDTH * 0.4 - 50,
    height: WINDOW_HEIGHT * 0.5 - 30,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 100,
    paddingTop: -20,
    paddingLeft: 20,
    zDepth: 1,
    position: 'fixed',
  };

  render() {
    const { STYLE } = this.constructor
    return (
      <Paper
        zDepth={STYLE.zDepth}
        style={STYLE}
      >
        NOT IMPLEMENTED YET
      </Paper>
    )
  }
}
