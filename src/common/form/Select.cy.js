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

  it('should render options correctly', () => {
    const options = ['Apple', 'Banana', 'Cherry'];
    cy.mount(<Select name="fruits" options={options} />);
    cy.get('select[name="fruits"]').should('have.value', 'apple'); // default first value
    cy.get('select[name="fruits"] option').should('have.length', options.length);
  });
  
  // it('should handle option selection', () => {
  //   const handleChange = cy.stub();
  //   const options = ['Apple', 'Banana', 'Cherry'];
  //   cy.mount(<Select name="fruits" options={options} onChange={handleChange} />);
  //   cy.get('select[name="fruits"]').select('banana');
  //   cy.wrap(handleChange).should('have.been.calledWithMatch', {
  //     target: { value: 'banana' }
  //   });
  // });
  
})