/// <reference types="cypress" />

describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("renders the core About page sections", () => {
    cy.get("h1").should("contain.text", "About Phekong");

    cy.contains("h2", "Why Choose Us").should("be.visible");
    cy.contains("h2", "Our Products & Services").should("be.visible");
    cy.contains("h2", "Our Values").should("be.visible");
  });

  it("shows the three value cards", () => {
    cy.contains("h3", "Quality").should("be.visible");
    cy.contains("h3", "Integrity").should("be.visible");
    cy.contains("h3", "Community").should("be.visible");
  });

  it("renders the call-to-action links with the correct destinations", () => {
    cy.contains("a", "Shop Now")
      .should("be.visible")
      .and("have.attr", "href", "/products");

    cy.contains("a", "Book Massage")
      .should("be.visible")
      .and("have.attr", "href", "/services");
  });

  it("renders the About Hero image", () => {
    cy.get('img[alt="Massage therapy and herbal product preparation with natural herbs"]')
      .should("be.visible");
  });

  it("renders the CTA banner image", () => {
    cy.get('img[alt="Herbal wellness tea with natural leaves"]')
      .should("be.visible");
  });

  it("does not overflow horizontally on mobile", () => {
    cy.viewport("iphone-x");
    cy.visit("/about");

    cy.window().then((win) => {
      expect(
        win.document.documentElement.scrollWidth
      ).to.be.lte(win.innerWidth);
    });
  });
});