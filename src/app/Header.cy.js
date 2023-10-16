import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import userReducer from '../features/auth/userSlice'

import Header from './Header'

describe('<Header />', () => {

  // beforeEach(() => {
  let mountWithState = (isLoggedIn = false) => {

    var store;
    store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: { user: { isLoggedIn } },
    });

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  };

  // });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // cy.mount(<BrowserRouter><Header /></BrowserRouter>)
    mountWithState();
  })

  it('should have navigation links', () => {
    const links = ['/', '/login', '/nothing-here'];
    // cy.mount(<BrowserRouter><Header /></BrowserRouter>);
    mountWithState();
    cy.get('nav ul li').should('have.length', links.length);
    links.forEach(link => {
      cy.get(`nav ul li a[href="${link}"]`).should('exist');
    });
  });

  it('should display a logout button when logged in', () => {

    mountWithState(true);
    // Check if the Logout button is displayed
    cy.get('button[aria-label="Logout"]').should('exist');
  });

})