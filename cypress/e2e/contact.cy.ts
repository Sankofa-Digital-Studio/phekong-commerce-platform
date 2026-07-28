describe('Contact page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('shows validation feedback for an empty form', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Full name is required.').should('be.visible');
    cy.contains('Email address is required.').should('be.visible');
    cy.contains('Message is required.').should('be.visible');
  });

  it('reveals wholesale fields when the enquiry type changes', () => {
    cy.get('#topic').select('wholesale');

    cy.get('#businessName').should('be.visible');
    cy.get('#estimatedVolume').should('be.visible');
  });

  it('preserves product context from query parameters', () => {
    cy.visit('/contact?productName=Restorative%20Body%20Oil&productId=restorative-body-oil');

    cy.contains('Inquiry about product:').should('contain.text', 'Restorative Body Oil');
    cy.get('#topic').should('have.value', 'product_inquiry');
  });
});
