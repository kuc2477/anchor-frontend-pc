import _ from 'lodash'
import React, { PropTypes } from 'react'
import {
  Card,
  CardTitle,
  CardText,
  CardMedia,
} from 'material-ui/lib/card'
import Divider from 'material-ui/lib/divider'


export default class NewsItemContent extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currentUserRating: PropTypes.bool,
  };

  static SUBTITLE_LENGTH = 60
  static MEDIA_STYLE = {
    width: 200,
    height: 180,
    marginLeft: 100,
    padding: 30,
  };

  _mediaOnClick() {
    window.open(this.props.url)
  }

  render() {
    const { MEDIA_STYLE, SUBTITLE_LENGTH } = this.constructor
    const { id, title, image, description, url } = this.props
    return (
      <div>
        <CardTitle title={title} subtitle={
          _.truncate(url, { length: SUBTITLE_LENGTH })}
        />
        <CardMedia
          className="row middle-md center-md"
          style={MEDIA_STYLE}
          onClick={::this._mediaOnClick}
          >
          <img src={image} />
        </CardMedia>
        <CardText>
          {description}
        </CardText>
        <Divider />
      </div>
    )
  }
}
