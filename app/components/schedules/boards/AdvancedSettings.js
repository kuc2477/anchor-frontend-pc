import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { ValueLinkPropType } from '../../../constants/types'
import MaxVisitSlider from '../fields/MaxVisitSlider'
import MaxDistSlider from '../fields/MaxDistSlider'


export default class AdvancedSettings extends React.Component {
  static propTypes = {
    maxDistValueLink: ValueLinkPropType.isRequired,
    maxVisitValueLink: ValueLinkPropType.isRequired,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static STYLE = {
    marginLeft: -20
  };
  static MAX_VISIT_FIELD_STYLE = {
  };
  static MAX_DIST_FIELD_STYLE = {
  };

  render() {
    const { maxDistValueLink, maxVisitValueLink } = this.props
    const {
      STYLE,
      MAX_VISIT_FIELD_STYLE,
      MAX_DIST_FIELD_STYLE,
    } = this.constructor

    return (
      <div style={STYLE}>
        <MaxVisitSlider
          style={MAX_VISIT_FIELD_STYLE}
          valueLink={maxVisitValueLink}
        />
        <MaxDistSlider
          style={MAX_DIST_FIELD_STYLE}
          valueLink={maxDistValueLink}
        />
      </div>
    )
  }
}
