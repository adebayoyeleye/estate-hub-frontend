const username = 'user123';
const password = 'pass123';
describe('Login feature', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('logs in user successfully', () => {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/home')
  });

  it('login fails with wrong credentials', () => {
    cy.get('[data-cy="username"]').type(username + 'wrong');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-cy="password"]').type(password + 'wrong')//.type('{enter}'); ==> TODO: come back to this after implemeting keydown submit
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error"]').should('be.visible');
  });
});

describe('Registration feature', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="sign-up"]').click();
  })
  it('sign up user successfully', () => {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(password);
    cy.get('[data-cy="create-account"]').click();
    cy.url().should('include', '/home')
  });

  describe('sign up fails', () => {
    beforeEach(() => {
      cy.get('[data-cy="password"]').type(password + 'wrong')
    })
    it('fails with incomplete form', () => {
      cy.get('[data-cy="username"]').type('');
      cy.get('[data-cy="create-account"]').click();
      cy.get('[data-cy="error"]').should('be.visible');
    });
  });

});