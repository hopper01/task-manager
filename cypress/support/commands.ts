// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('addTask', (title, description, dueDate, priority = 'medium') => {
  cy.contains('Add Task').click();
  cy.get('#title').type(title);
  cy.get('#description').type(description);
  cy.get('#dueDate').type(dueDate);
  cy.get('#priority').select(priority);
  cy.contains('button', 'Add Task').click();
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Declare the types globally in a separate .d.ts file
// cypress/support/index.d.ts

export {}; 