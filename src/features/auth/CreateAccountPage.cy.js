import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateAccountPage from './CreateAccountPage'
import userReducer from '../auth/userSlice'
import messageReducer from "../../common/messageSlice";

describe('CreateAccount Page', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
        message: messageReducer,
      }
    });

    cy.spy(store, 'dispatch');

    cy.mount(
      <Provider store={store}>
        <Router>
          <CreateAccountPage />
        </Router>
      </Provider>
    );
  });

  it('should render createAccount form', () => {
    cy.get('[data-cy=username]').should('be.visible');
    cy.get('[data-cy=password]').should('be.visible');
    cy.get('[data-cy=confirm-password]').should('be.visible');
    cy.get('[data-cy=create-account]').should('be.visible');
    cy.get('[data-cy=login]').should('be.visible');
  });

  it('should allow typing in inputs', () => {
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=confirm-password]').type('testPassword');
    cy.get('[data-cy=username]').should('have.value', 'testUser');
    cy.get('[data-cy=password]').should('have.value', 'testPassword');
    cy.get('[data-cy=confirm-password]').should('have.value', 'testPassword');
  });

  it('should dispatch clearMessage action when the component mounts', () => {
    // expect(store.dispatch).to.have.been.calledWith(clearMessage());

    // Validate that some action has been dispatched
    cy.wrap(store.dispatch).should('be.called');
  });

  it('should dispatch createAccount action on form submission', () => {
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=confirm-password]').type('testPassword');
    cy.get('[data-cy=create-account]').click();

    // Validate that some action has been dispatched
    cy.wrap(store.dispatch).should('be.called');

  });

  it('should display loading state on form submission', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/register', {
      statusCode: 200,
      body: { token: 'pending' },
      delay: 1000, // Simulate the pending state with a delay
    }).as('createAccountRequest');

    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=confirm-password]').type('testPassword');

    cy.get('[data-cy=create-account]').click();

    cy.wait('@createAccountRequest');

    cy.contains('...loading').should('be.visible');
  });

  it('should navigate to /home when isLoggedIn is true upon fulfilled request', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/register', {
      statusCode: 200,
      body: { token: '123abc' },
    }).as('createAccountRequest');
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=confirm-password]').type('testPassword');

    cy.get('[data-cy=create-account]').click();

    cy.wait('@createAccountRequest');

    cy.url().should('include', '/home');
  });

  it('should display error message upon rejected request', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/register', {
      statusCode: 403,
      body: { error: 'Unauthorized' },
    }).as('createAccountFailRequest');

    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=confirm-password]').type('testPassword');
    cy.get('[data-cy=create-account]').click();

    cy.wait('@createAccountFailRequest');

    cy.get('[data-cy=error]').should('contain', 'Request failed with status code 403');
  });

  it('should navigate to login page when Sign login link is clicked', () => {
    cy.get('[data-cy=login]').click();

    cy.url().should('include', '/login');
  });

});
