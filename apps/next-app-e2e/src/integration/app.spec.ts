describe('next-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('input').first().type('pika');
    cy.get('li').first().should('have.text', 'Pikachu');
    cy.get('body').screenshot();
  });
});
