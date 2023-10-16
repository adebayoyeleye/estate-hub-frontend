import React from 'react'
import Button from './Button'

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button />)
  })

  it('should display button text from props', () => {
    const buttonText = "Submit";
    cy.mount(<Button buttonText={buttonText} />)
    cy.get('button').should('have.text', buttonText)
  })

  it('should be clickable', () => {
    const onClick = cy.stub();
    cy.mount(<Button buttonText="Click me" onClick={onClick} />);
    cy.get('button').click();
    cy.wrap(onClick).should('have.been.calledOnce');
  });
  
})