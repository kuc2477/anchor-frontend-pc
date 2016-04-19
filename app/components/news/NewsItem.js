import React, { PropTypes } from 'react'
import { Card, CardTitle, CardText, CardMedia, FlatButton } from 'material-ui'


export default class NewsItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  static STYLE = {
    padding: 10
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

  render() {
    const { STYLE, IMAGE_STYLE, MEDIA_STYLE } = this.constructor
    const { title, image, description, url } = this.props
    return (
      <Card style={STYLE}>
        <CardTitle title={title} subtitle={url} />
        <CardMedia style={MEDIA_STYLE}>
          <img src={image} style={IMAGE_STYLE} />
        </CardMedia>
        <CardText>
          {description}
        </CardText>
      </Card>
    )
  }
}
