import React from 'react'
import CreateAccountPage from './CreateAccountPage'
import { BrowserRouter } from 'react-router-dom';
import {createAccount} from '../services/auth';


describe('<CreateAccountPage />', () => {
  it('renders', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
  })

  it('renders username input field', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
    cy.get('[data-cy="username"]').should('have.attr', 'type', 'text');
  })

  it('renders password field with password type', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
  })

  it('renders confirm password field with password type', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
    cy.get('[data-cy="confirm-password"]').should('have.attr', 'type', 'password');
  })

  it('renders create-account button', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
    cy.get('[data-cy="create-account"]').should('be.visible');
  })

  it('renders sign up link', () => {
    cy.mount(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
    cy.get('[data-cy="login"]').should('have.attr', 'href', '/login');
  })
})

describe('CreateAccountPage form tests', () => {
  const username = 'user123';
  const password = 'pass123';
  const auth = {createAccount};
  beforeEach(() => {
    cy.stub(auth, 'createAccount'
      , (username, password) => ((username === "user123") && (password === "pass123")) ? "Account Creation Success" : "Account Creation Failed").as('createAccount');
    cy.mount(<BrowserRouter><CreateAccountPage createAccount={auth.createAccount} /></BrowserRouter>);
  });

  it('calls function to handleAccountCreation on button click', () => {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(password);
    cy.get('[data-cy="create-account"]').click();
    cy.get('@createAccount').should('be.called');
  })

  // describe('sign up fails', () => {
  //   beforeEach(() => {
  //     cy.get('[data-cy="password"]').type(password + 'wrong')
  //   })
  //   it('fails with incomplete form', () => {
  //     cy.get('[data-cy="username"]').type('');
  //     cy.get('[data-cy="create-account"]').click();
  //     cy.get('[data-cy="error"]').should('be.visible');
  //   });
  // });
})