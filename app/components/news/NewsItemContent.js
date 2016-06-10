import moment from 'moment'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { NewsPropType } from '../../constants/types'
import {
  CardTitle,
  CardHeader,
  CardMedia,
} from 'material-ui/lib/card'


// TODO: NEED TO CLEANUP NESTED MEDIA STYLES
export default class NewsItemContent extends React.Component {
  static propTypes = {
    news: NewsPropType.isRequired
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static TITLE_MAX_LENGTH = 60;
  static URL_MAX_LENGTH = 50;
  static SUMAMRY_MIN_LENGTH = 15;
  static SUMMARY_MAX_LENGTH = 50;

  static TITLE_STYLE = {
    fontSize: 18,
    lineHeight: '150%'
  };

  static SUMMARY_STYLE = {
    padding: 10
  };

  static MEDIA_CONTAINER_STYLE ={
    minHeight: 250,
  };

  static MEDIA_STYLE = {
    paddingLeft: 20,
    paddingRight: 20
  };

  static IMAGE_STYLE = {
    maxHeight: 300,
  };

  open() {
    const { news } = this.props
    window.open(news.get('url'))
  }

  _getTitleNode() {
    const { TITLE_STYLE, TITLE_MAX_LENGTH } = this.constructor
    const { news } = this.props
    const { title, created } = news.toJS()
    return (
      <CardTitle
        titleStyle={TITLE_STYLE}
        title={_.truncate(title, { length: TITLE_MAX_LENGTH })}
        subtitle={`Reported ${moment(created).fromNow()}`}
      />
    )
  }

  _getMediaNode() {
    const { news } = this.props
    const { image } = news.toJS()
    const {
      MEDIA_CONTAINER_STYLE,
      MEDIA_STYLE,
      IMAGE_STYLE,
    } = this.constructor

    return (
      <CardMedia
        className="row center-md middle-md clickable"
        style={MEDIA_CONTAINER_STYLE}
        mediaStyle={MEDIA_STYLE}
      >
        <img src={image} style={IMAGE_STYLE}/>
      </CardMedia>
    )
  }

  _getSummaryNode() {
    const { news } = this.props
    const { summary, url } = news.toJS()
    const {
      URL_MAX_LENGTH,
      SUMMARY_STYLE,
      SUMMARY_MAX_LENGTH
    } = this.constructor

    return (
      <CardHeader
        style={SUMMARY_STYLE}
        title={_.truncate(summary, { length: SUMMARY_MAX_LENGTH })}
        subtitle={_.truncate(url, { length: URL_MAX_LENGTH })}
      />
    )
  }

  render() {
    const titleNode = this._getTitleNode()
    const mediaNode = this._getMediaNode()
    const summaryNode = this._getSummaryNode()

    return (
      <div onClick={::this.open}>
        {titleNode}
        {mediaNode}
        {summaryNode}
      </div>
    )
  }
}
