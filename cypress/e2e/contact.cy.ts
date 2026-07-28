describe('Contact page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('shows validation feedback for an empty form', () => {
    cy.findByRole('button', { name: /submit form/i }).click();

    cy.contains('Full name is required.').should('be.visible');
    cy.contains('Email address is required.').should('be.visible');
    cy.contains('Message is required.').should('be.visible');
  });

  it('reveals wholesale fields when the enquiry type changes', () => {
    cy.findByLabelText(/inquiry type/i).select('wholesale');

    cy.findByLabelText(/company \/ business name/i).should('be.visible');
    cy.findByLabelText(/estimated monthly volume/i).should('be.visible');
  });

  it('preserves product context from query parameters', () => {
    cy.visit('/contact?productName=Restorative%20Body%20Oil&productId=restorative-body-oil');

    cy.contains('Inquiry about product:').should('contain.text', 'Restorative Body Oil');
    cy.findByLabelText(/inquiry type/i).should('have.value', 'product_inquiry');
  });
});
