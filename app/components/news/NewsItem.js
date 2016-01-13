import React from 'react'
import { Card, CardTitle, CardText, CardMedia, FlatButton } from 'material-ui'

import { NewsPropType } from '../../constants/types'


export default class NewsItem extends React.Component {
  static propTypes = {
    news: NewsPropType.isRequired
  };

  render() {
    return (
      <Card>
        <CardTitle>
          {this.props.news.get('title')}
        </CardTitle>

        <CardMedia>
          <img src={this.props.news.get('image')} />
        </CardMedia>

        <CardText>
          {this.props.news.get('description')}
        </CardText>
      </Card>
    )
  }
}
