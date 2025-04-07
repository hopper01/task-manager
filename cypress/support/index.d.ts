/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add a task
     * @param title - The title of the task
     * @param description - The description of the task
     * @param dueDate - The due date in yyyy-MM-dd format
     * @param priority - The priority level (low, medium, high)
     */
    addTask(title: string, description: string, dueDate: string, priority?: string): Chainable<Element>
  }
} 