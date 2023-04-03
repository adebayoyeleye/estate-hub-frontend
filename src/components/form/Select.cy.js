import React from 'react'
import Select from './Select'

describe('<Select />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Select />)
  })

  it('should have label', () => {
    const labelText = "Label";
    cy.mount(<Select label={labelText} />)
    cy.get('label').should('have.text', labelText)
  })
})