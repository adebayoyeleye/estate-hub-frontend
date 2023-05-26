import React from 'react'
import Input from './Input'

describe('<Input />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Input />)
  })

  it('should have label', () => {
    const labelText = "Label";
    cy.mount(<Input label={labelText} />)
    cy.get('label').should('have.text', labelText)
  })
})