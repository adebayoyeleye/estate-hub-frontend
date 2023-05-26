import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Header /></BrowserRouter>)
  })
})