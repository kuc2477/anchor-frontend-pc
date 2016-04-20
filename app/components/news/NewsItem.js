import _ from 'lodash'
import React, { PropTypes } from 'react'
import {
  Card,
  CardTitle,
  CardText,
  CardMedia,
} from 'material-ui/lib/card'
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/lib/svg-icons/action/thumb-down'
import FlatButton from 'material-ui/lib/flat-button'


export default class NewsItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rate: PropTypes.func.isRequired,
  };

  static STYLE = {
    padding: 10
  };

  static BUTTON_ICON_STYLE = {
    height: 25,
    width: 25,
    marginRight: 10,
  };

  static MEDIA_STYLE = {
    width: 300,
    padding: 10
  };

  static IMAGE_STYLE = {
    width: 200,
    height: 200,
    padding: 20
  };

  _mediaOnClick() {
    const { url } = this.props
    window.open(url)
  }

  render() {
    const {
      STYLE,
      IMAGE_STYLE,
      MEDIA_STYLE,
      BUTTON_ICON_STYLE
    } = this.constructor
    const {
      id,
      title,
      image,
      description,
      url,
      rate,
    } = this.props

    return (
      <Card style={STYLE}>
        <CardTitle title={title} subtitle={url} />
        <CardMedia style={MEDIA_STYLE} onClick={::this._mediaOnClick}>
          <img src={image} style={IMAGE_STYLE} />
        </CardMedia>
        <CardText>
          {description}
        </CardText>

        <FlatButton
          secondary
          label="Like it"
          labelPosition="after"
          onClick={_.partial(rate, id, true, null)}
        >
          <ThumbUp style={BUTTON_ICON_STYLE} />
        </FlatButton>

        <FlatButton
          primary
          label="Useless"
          labelPosition="after"
          onClick={_.partial(rate, id, false, null)}
        >
          <ThumbDown style={BUTTON_ICON_STYLE} />
        </FlatButton>
      </Card>
    )
  }
}
