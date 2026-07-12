describe("living ritual homepage smoke", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage();
    cy.visit("/");
  });

  it("builds and preserves a restoring ritual", () => {
    cy.contains("h1", "How do you want to feel today?").should("be.visible");
    cy.contains("button", "Choose a feeling to begin").should("be.disabled");
    cy.contains("button", "I need to feel restored").click();
    cy.location("search").should("contain", "ritual=restore");
    cy.contains("h2", "Restore your rhythm").should("be.visible");
    cy.contains("a", "Meet your ritual: Growth & Strength Oil").should("exist");
    cy.window().its("sessionStorage").invoke("getItem", "phekong-ritual").should("equal", "restore");
  });

  it("keeps controls separate and prevents horizontal overflow", () => {
    cy.viewport(320, 568);
    cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.equal(doc.documentElement.clientWidth));
    cy.get(".ritual-product").first().within(() => {
      cy.get(".stock").should("exist");
      cy.get(".save-product").should("have.css", "width", "44px");
    });
  });

  it("contains no focusable descendants inside aria-hidden content", () => {
    cy.get('[aria-hidden="true"]').each(($element) => {
      expect($element.find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).to.have.length(0);
    });
  });
});
