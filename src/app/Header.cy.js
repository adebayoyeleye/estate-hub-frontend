import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Header /></BrowserRouter>)
  })

  it('should have navigation links', () => {
    const links = [ '/', '/login', '/nothing-here' ];
    cy.mount(<BrowserRouter><Header /></BrowserRouter>);
    cy.get('nav ul li').should('have.length', links.length);
    links.forEach(link => {
      cy.get(`nav ul li a[href="${link}"]`).should('exist');
    });
  });
  
})