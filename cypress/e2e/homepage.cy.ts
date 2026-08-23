describe("adaptive homepage smoke", () => {
  const waitForButtonlessWelcome = () => {
    cy.contains("button", "Enter now").should("not.exist");
    cy.window().should((win) => {
      expect(win.sessionStorage.getItem("phekong-welcome-seen")).to.equal("true");
    });
    cy.contains("Rooting your wellness journey").should("not.exist");
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/", {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
  });

  it("completes the buttonless ritual welcome once per session", () => {
    waitForButtonlessWelcome();

    cy.reload();
    cy.contains("Rooting your wellness journey").should("not.exist");
    cy.contains("button", "Enter now").should("not.exist");

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
    waitForButtonlessWelcome();
    cy.get("h1").contains(/aloe wellness for everyday balance/i).should("exist");
    cy.get('[aria-label="Next slide"]').click();
    cy.get("h1").contains(/a closer look at our aloe puree/i).should("exist");

    cy.contains("button", "Use less data").click();
    cy.contains("button", "Use enhanced visuals").should("have.attr", "aria-pressed", "true");
    cy.window().its("localStorage").invoke("getItem", "phekong-data-saver").should("equal", "on");
  });

  it("keeps the hero stable and the trust row clear of the principles strip", () => {
    cy.viewport(390, 844);
    waitForButtonlessWelcome();

    cy.get(".shell-hero").then(($hero) => {
      const initialHeight = $hero[0].getBoundingClientRect().height;

      cy.get('[aria-label="Next slide"]').click().click();
      cy.contains("h1", /herbal therapy rooted in traditional care/i).should("be.visible");
      cy.get(".shell-hero").should(($changedHero) => {
        expect($changedHero[0].getBoundingClientRect().height).to.equal(initialHeight);
      });
    });

    cy.get(".shell-trust").then(($trust) => {
      cy.get(".shell-feature-strip").should(($strip) => {
        expect($trust[0].getBoundingClientRect().bottom).to.be.at.most(
          $strip[0].getBoundingClientRect().top,
        );
      });
    });
  });

  it("does not hide focusable carousel controls from assistive technology", () => {
    cy.get('[aria-hidden="true"]').each(($element) => {
      expect($element.find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).to.have.length(0);
    });
    cy.get('[role="group"][aria-label="Choose featured product slide"]')
      .find("button")
      .should("have.length", 3);
  });
});
