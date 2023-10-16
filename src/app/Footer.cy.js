import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Footer />)
  })

  it('should display copyright text', () => {
    cy.mount(<Footer />);
    cy.get('footer p').should('contain.text', '@Copyright Audax 2023- All Right Reserved.');
  });
  
})