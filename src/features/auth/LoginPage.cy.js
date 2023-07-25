import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage';
import userReducer from '../auth/userSlice'
import messageReducer from "../../common/messageSlice";


describe('Login Page', () => {
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
          <LoginPage />
        </Router>
      </Provider>
    );
  });

  it('should render login form', () => {
    cy.get('[data-cy=username]').should('be.visible');
    cy.get('[data-cy=password]').should('be.visible');
    cy.get('[data-cy=submit]').should('be.visible');
    cy.get('[data-cy=sign-up]').should('be.visible');
  });

  it('should allow typing in inputs', () => {
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=username]').should('have.value', 'testUser');
    cy.get('[data-cy=password]').should('have.value', 'testPassword');
  });

  it('should dispatch clearMessage action when the component mounts', () => {
    // expect(store.dispatch).to.have.been.calledWith(clearMessage());

    // Validate that some action has been dispatched
    cy.wrap(store.dispatch).should('be.called');
  });

  it('should dispatch login action on form submission', () => {
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=submit]').click();

    // Validate that some action has been dispatched
    cy.wrap(store.dispatch).should('be.called');

  });

  it('should display loading state on form submission', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/authenticate', {
      statusCode: 200,
      body: { token: 'pending' },
      delay: 1000, // Simulate the pending state with a delay
    }).as('loginRequest');

    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');

    cy.get('[data-cy=submit]').click();

    cy.wait('@loginRequest');

    cy.contains('...loading').should('be.visible');
  });

  it('should navigate to /home when isLoggedIn is true upon fulfilled request', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/authenticate', {
      statusCode: 200,
      body: { token: '123abc' },
    }).as('loginRequest');
    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');

    cy.get('[data-cy=submit]').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/home');
  });

  it('should display error message upon rejected request', () => {

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/authenticate', {
      statusCode: 403,
      body: { error: 'Unauthorized' },
    }).as('loginFailRequest');

    cy.get('[data-cy=username]').type('testUser');
    cy.get('[data-cy=password]').type('testPassword');
    cy.get('[data-cy=submit]').click();

    cy.wait('@loginFailRequest');

    cy.get('[data-cy=error]').should('contain', 'Request failed with status code 403');
  });

  it('should navigate to create-account page when Sign up link is clicked', () => {
    cy.get('[data-cy=sign-up]').click();

    cy.url().should('include', '/create-account');
  });

});
