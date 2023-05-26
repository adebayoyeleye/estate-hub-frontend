import React from 'react'
import LoginPage from './LoginPage'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../app/store'
import { login } from '../../services/auth';
import { userLoaded } from './userSlice';


describe('<LoginPage />', () => {
  it('renders', () => {
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>);
  })

  it('renders username input field', () => {
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>);
    cy.get('[data-cy="username"]').should('have.attr', 'type', 'text');
  })

  it('renders password field with password type', () => {
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>);
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
  })

  it('renders submit button', () => {
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>);
    cy.get('[data-cy="submit"]').should('be.visible');
  })

  it('renders sign up link', () => {
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>);
    cy.get('[data-cy="sign-up"]').should('have.attr', 'href', '/create-account');
  })
})

describe('LoginPage form tests', () => {
  const username = 'user123';
  const password = 'pass123';
  const auth = { login };
  beforeEach(() => {
    cy.stub(auth, 'login'
      , (username, password) => (dispatch) => {
        ((username === "user123") && (password === "pass123"))
          ? dispatch(userLoaded("Login Success")) : dispatch(userLoaded("Login Failed"))
      })
      .as('login');
    cy.mount(<Provider store={store}><BrowserRouter><LoginPage login={auth.login} /></BrowserRouter></Provider>);
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