import React from 'react'
import { Router } from 'react-router'
import TestUtils from 'react-addons-test-utils'

import Nav from '../../../app/components/base/Nav'


describe('Nav', () => {
  it('should be rendered', () => {
    const nav = TestUtils.renderIntoDocument(
      <Router><Nav user={{ id: 5, username: 'NAME' }} /></Router>
    )
    expect(TestUtils.isCompositeComponent(nav)).toBeTruthy()
  })
})
