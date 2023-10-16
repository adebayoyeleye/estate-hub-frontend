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

  it('should handle value changes', () => {
    const handleChange = cy.stub();
    cy.mount(<Input name="username" onChange={handleChange} />);
    cy.get('input[name="username"]').type('John');
    cy.wrap(handleChange).should('have.been.calledWithMatch', {
      target: { value: 'John' }
    });
  });
  
})