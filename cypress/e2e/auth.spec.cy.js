describe('Login feature', () => {
  it('login', () => {
    cy.visit('/');
    cy.get('[data-cy="username"]').type('user123');
    cy.get('[data-cy="password"]').type('pass123');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/home')
  });
});