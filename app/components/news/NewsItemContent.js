import moment from 'moment'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {
  CardTitle,
  CardHeader,
  CardMedia,
} from 'material-ui/lib/card'


export default class NewsItemContent extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    currentUserRating: PropTypes.bool,
  };

  static TITLE_MAX_LENGTH = 60;
  static URL_MAX_LENGTH = 50;
  static DESCRIPTION_MIN_LENGTH = 15;
  static DESCRIPTION_MAX_LENGTH = 50;

  static TITLE_STYLE = {
    fontSize: 18,
    lineHeight: '150%'
  };

  static DESCRIPTION_STYLE = {
    padding: 10
  };

  static MEDIA_CONTAINER_STYLE ={
    minHeight: 250,
  };

  static MEDIA_STYLE = {
    paddingLeft: 20,
    paddingRight: 20
  };

  open() {
    window.open(this.props.url)
  }

  _getDescription() {
    const { description } = this.props
    return description
  }

  _getTitleNode() {
    const { TITLE_STYLE, TITLE_MAX_LENGTH } = this.constructor
    const { title, created } = this.props
    return (
      <CardTitle
        titleStyle={TITLE_STYLE}
        title={_.truncate(title, { length: TITLE_MAX_LENGTH })}
        subtitle={moment(created).fromNow()}
      />
    )
  }

  _getMediaNode() {
    const { image } = this.props
    const { MEDIA_CONTAINER_STYLE, MEDIA_STYLE } = this.constructor
    return (
      <CardMedia
        className="row center-md middle-md"
        style={MEDIA_CONTAINER_STYLE}
        mediaStyle={MEDIA_STYLE}
      >
        <img src={image} />
      </CardMedia>
    )
  }

  _getDescriptionNode() {
    const { description, url } = this.props
    const {
      URL_MAX_LENGTH,
      DESCRIPTION_STYLE,
      DESCRIPTION_MAX_LENGTH
    } = this.constructor

    return (
      <CardHeader
        style={DESCRIPTION_STYLE}
        title={_.truncate(description, { length: DESCRIPTION_MAX_LENGTH })}
        subtitle={_.truncate(url, { length: URL_MAX_LENGTH })}
      />
    )
  }

  render() {
    const titleNode = this._getTitleNode()
    const mediaNode = this._getMediaNode()
    const descriptionNode = this._getDescriptionNode()

    return (
      <div onClick={::this.open}>
        {titleNode}
        {mediaNode}
        {descriptionNode}
      </div>
    )
  }
}
