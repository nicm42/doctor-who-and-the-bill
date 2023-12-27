describe('testing spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('passes when using a mouse', () => {
    // Initial text
    cy.contains('Doctor Who regulars who have been in The Bill and The Bill regulars who have been in Doctor Who', {
      matchCase: false,
    }).should('exist');
    cy.contains(
      'Press a button to see Doctor Who regulars who have been in The Bill or The Bill regulars who have been in Doctor Who',
      { matchCase: false },
    ).should('exist');
    cy.contains('Show Doctor Who regulars', { matchCase: false }).should('exist');
    cy.contains('Show The Bill regulars', { matchCase: false }).should('exist');
    cy.title().should('eq', 'Doctor Who & The Bill');
    cy.visit('/').document().its('head').find('link[rel="icon"]').should('have.attr', 'href').should('eq', '');

    // Pressing Doctor Who button
    cy.get('button').first().click();
    cy.contains('Doctor Who regulars who have been in The Bill', {
      matchCase: false,
    }).should('exist');
    cy.contains("Here are the regulars from Doctor Who who have been in The Bill and the episodes they've been in", {
      matchCase: false,
    }).should('exist');
    cy.title().should('eq', 'Doctor Who in The Bill');
    // TODO why is the favicon still blank?
    //cy.visit('/').document().its('head').find('link[rel="icon"]').should('have.attr', 'href').should('eq', '/tardis.png');

    // Pressing The Bill button
    cy.get('button').eq(1).click();
    cy.contains('The Bill regulars who have been in Doctor Who', {
      matchCase: false,
    }).should('exist');
    cy.contains("Here are the regulars from The Bill who have been in Doctor Who and the episodes they've been in", {
      matchCase: false,
    }).should('exist');
    cy.title().should('eq', 'The Bill in Doctor Who');
    // TODO why is the favicon still blank?
    //cy.visit('/').document().its('head').find('link[rel="icon"]').should('have.attr', 'href').should('eq', '/helmet.png');

    // Open the episode list for one of the cards
    cy.get('.card--button').eq(1).click();
    cy.focused().should('have.class', 'card--episodes-close');
    cy.contains("Graham Cole's Doctor Who episodes", {
      matchCase: false,
    }).should('exist');
    cy.contains('Full Circle', {
      matchCase: false,
    }).should('exist');
    // TODO need to fix cards on top of modal problem
    /* cy.get('.card--episodes-close').click();
    cy.focused().should('have.class', 'card--button');
    cy.contains('Full Circle', {
      matchCase: false,
    }).should('not.exist'); */
  });
});
