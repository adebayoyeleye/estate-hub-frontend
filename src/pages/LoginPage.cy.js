import React from 'react'
import LoginPage from './LoginPage'
import { BrowserRouter } from 'react-router-dom';
import { login } from '../services/auth';


describe('<LoginPage />', () => {
  it('renders', () => {
    cy.mount(<BrowserRouter><LoginPage /></BrowserRouter>);
  })

  it('renders username input field', () => {
    cy.mount(<BrowserRouter><LoginPage /></BrowserRouter>);
    cy.get('[data-cy="username"]').should('have.attr', 'type', 'text');
  })

  it('renders password field with password type', () => {
    cy.mount(<BrowserRouter><LoginPage /></BrowserRouter>);
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
  })

  it('renders submit button', () => {
    cy.mount(<BrowserRouter><LoginPage /></BrowserRouter>);
    cy.get('[data-cy="submit"]').should('be.visible');
  })

  it('renders sign up link', () => {
    cy.mount(<BrowserRouter><LoginPage /></BrowserRouter>);
    cy.get('[data-cy="sign-up"]').should('have.attr', 'href', '/create-account');
  })
})

describe('LoginPage form tests', () => {
  const username = 'user123';
  const password = 'pass123';
  const auth = { login };
  beforeEach(() => {
    cy.stub(auth, 'login'
      , (username, password) => ((username === "user123") && (password === "pass123")) ? "Login Success" : "Login Failed").as('login');
    cy.mount(<BrowserRouter><LoginPage login={auth.login} /></BrowserRouter>);
  });

  it('calls function to handlelogin on button click', () => {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="submit"]').click();
    cy.get('@login').should('be.called');
  })

  it('displays error message when wrong credentials entered', () => {
    cy.get('[data-cy="username"]').type(username + "wrong");
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-cy="password"]').type(password + "wrong")//.type('{enter}'); ==> TODO: Come back to this later to implement key down
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error"]').should('be.visible');
  })
})