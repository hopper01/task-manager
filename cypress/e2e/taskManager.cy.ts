describe('Task Manager', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display the app title', () => {
    cy.get('header').contains('Task Manager').should('be.visible');
  });

  it('should allow adding a task', () => {
    // Click Add Task button
    cy.contains('Add Task').click();

    // Fill out the form
    cy.get('#title').type('New Test Task');
    cy.get('#description').type('This is a test task description');
    cy.get('#dueDate').type('2025-12-31');
    cy.get('#priority').select('high');

    // Submit the form
    cy.contains('Add Task').click();

    // Verify the task is added
    cy.contains('New Test Task').should('be.visible');
    cy.contains('This is a test task description').should('be.visible');
  });

  it('should allow completing a task', () => {
    // Add a task first
    cy.contains('Add Task').click();
    cy.get('#title').type('Task to Complete');
    cy.get('#description').type('This task will be completed');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    // Find the task and click the completion checkbox
    cy.contains('Task to Complete')
      .parent()
      .find('button')
      .first() // The first button should be the completion checkbox
      .click();

    // Task should now be in the completed section
    cy.contains('Completed Tasks')
      .parent()
      .contains('Task to Complete')
      .should('be.visible');
  });

  it('should allow filtering tasks', () => {
    // Add two tasks with different priorities
    cy.contains('Add Task').click();
    cy.get('#title').type('High Priority Task');
    cy.get('#priority').select('high');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    cy.contains('Add Task').click();
    cy.get('#title').type('Low Priority Task');
    cy.get('#priority').select('low');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    // Filter by high priority
    cy.get('select').first().select('high');

    // Only high priority task should be visible
    cy.contains('High Priority Task').should('be.visible');
    cy.contains('Low Priority Task').should('not.exist');
  });

  it('should allow searching for tasks', () => {
    // Add two tasks with different titles
    cy.contains('Add Task').click();
    cy.get('#title').type('Meeting with client');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    cy.contains('Add Task').click();
    cy.get('#title').type('Submit project report');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    // Search for "meeting"
    cy.get('input[placeholder="Search tasks..."]').type('meeting');

    // Only the meeting task should be visible
    cy.contains('Meeting with client').should('be.visible');
    cy.contains('Submit project report').should('not.exist');
  });

  it('should allow deleting a task', () => {
    // Add a task first
    cy.contains('Add Task').click();
    cy.get('#title').type('Task to Delete');
    cy.get('#dueDate').type('2025-12-31');
    cy.contains('Add Task').click();

    // Verify the task is added
    cy.contains('Task to Delete').should('be.visible');

    // Delete the task
    cy.contains('Task to Delete')
      .parent()
      .parent()
      .find('button')
      .last() // The last button should be delete
      .click();

    // Verify the task is deleted
    cy.contains('Task to Delete').should('not.exist');
  });

  it('should toggle between dark and light mode', () => {
    // Check initial mode
    cy.get('body').should('not.have.class', 'dark');

    // Toggle to dark mode
    cy.get('header button').first().click();

    // Check dark mode
    cy.get('div[class*="dark:bg-gray-900"]').should('exist');

    // Toggle back to light mode
    cy.get('header button').first().click();

    // Check light mode
    cy.get('body').should('not.have.class', 'dark');
  });
}); 