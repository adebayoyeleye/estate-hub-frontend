import React from 'react'
import LoginPage from './LoginPage'

describe('<LoginPage />', () => {
  it('renders', () => {
    cy.mount(<LoginPage />);
  })

  it('renders password field with password type', ()=>{
    cy.mount(<LoginPage />);
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
  })
})