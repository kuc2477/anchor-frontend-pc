import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Nav from '../../../components/base/Nav'


describe('Nav', () => {
  it('should be rendered', () => {
    const nav = TestUtils.renderIntoDocument(
      <Nav user={{ id: 5, username: 'NAME' }} />
    )
    expect(TestUtils.isCompositeComponent(nav)).toBeTruth()
  })
})
