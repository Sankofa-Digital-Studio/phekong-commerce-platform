describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('renders the core About page sections', () => {
    cy.get('h1').should('contain.text', 'About Phekong');
    cy.contains('h2', 'Why Choose Us').should('be.visible');
    cy.contains('h2', 'Our Products & Services').should('be.visible');
    cy.contains('h2', 'Our Values').should('be.visible');
  });

  it('shows the three value cards', () => {
    cy.contains('h3', 'Quality').should('be.visible');
    cy.contains('h3', 'Integrity').should('be.visible');
    cy.contains('h3', 'Community').should('be.visible');
  });

  it('shows both calls to action and exposes the current navigation gap', () => {
    cy.contains('button', 'Shop Now').should('be.visible');
    cy.contains('button', 'Book Massage').should('be.visible');

    // V2 task: replace these buttons with links, then assert their href values:
    // cy.contains('a', 'Shop Now').should('have.attr', 'href', '/products');
    // cy.contains('a', 'Book a Massage').should('have.attr', 'href', '/services');
  });
});
