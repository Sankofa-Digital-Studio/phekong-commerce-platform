describe("adaptive homepage smoke", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("moves from the ritual welcome into guided product discovery", () => {
    cy.contains("Rooting your wellness journey").should("be.visible");
    cy.contains("button", "Enter now").click();
    cy.contains("Rooting your wellness journey").should("not.exist");

    cy.contains("a", "Find your remedy")
      .should("be.visible")
      .and("have.attr", "href", "/#shop-by-need");
    cy.contains("a", "Shop by what you need")
      .should("have.attr", "href", "#shop-by-need");
    cy.get("#shop-by-need").should("exist");
    cy.get(".shell-hero__image").should(($image) => {
      expect(($image[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
    });
  });

  it("supports manual carousel control and a persistent data-saver override", () => {
    cy.contains("button", "Enter now").click();
    cy.get("h1").contains(/healing herbal teas for daily balance/i).should("exist");
    cy.get('[aria-label="Next slide"]').click();
    cy.get("h1").contains(/fresh herbal juices with a clean finish/i).should("exist");

    cy.contains("button", "Use less data").click();
    cy.contains("button", "Use enhanced visuals").should("have.attr", "aria-pressed", "true");
    cy.window().its("localStorage").invoke("getItem", "phekong-data-saver").should("equal", "on");
  });

  it("does not hide focusable carousel controls from assistive technology", () => {
    cy.get('[aria-hidden="true"]').each(($element) => {
      expect($element.find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).to.have.length(0);
    });
    cy.get('[role="group"][aria-label="Choose featured product slide"]')
      .find("button")
      .should("have.length", 4);
  });
});
