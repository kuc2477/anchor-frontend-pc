import React, { PropTypes } from 'react'
import { Card, CardTitle, CardText, CardMedia, FlatButton } from 'material-ui'

import { NewsPropType } from '../../constants/types'


export default class NewsItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  render() {
    const { title, image, description, url } = this.props
    return (
      <Card>
        <CardTitle title={title} subtitle={url} />
        <CardMedia>
          <img src={image} />
        </CardMedia>
        <CardText>
          {description}
        </CardText>
      </Card>
    )
  }
}
