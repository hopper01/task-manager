# Task Manager

A straightforward task management application with a clean and responsive UI.

🚀 **Live Demo**: [https://task-manager-sigma-self.vercel.app/](https://task-manager-sigma-self.vercel.app/)

## Features

- **Dashboard**: View upcoming, overdue, and completed tasks
- **Task Management**: Add, edit, and delete tasks
- **Priority Levels**: Set task priorities (High, Medium, Low)
- **Search and Filter**: Find and filter tasks easily
- **Dark/Light Mode**: Toggle between dark and light themes
- **Mobile Friendly**: Responsive design works on all devices
- **Local Storage**: Task data persists in browser storage

## Testing

The project includes both unit tests and end-to-end (E2E) tests.

### Unit Tests

Unit tests are implemented using Vitest and React Testing Library. They test individual components and contexts to ensure they work as expected in isolation.

To run the unit tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### End-to-End Tests

E2E tests are implemented using Cypress. They simulate real user interactions with the application to ensure the entire flow works as expected.

To run the E2E tests:

```bash
# Open Cypress test runner
npm run test:e2e

# Run E2E tests in headless mode
npm run test:e2e:headless
```

## Deployment on Vercel

The application is currently deployed on Vercel: [https://task-manager-sigma-self.vercel.app/](https://task-manager-sigma-self.vercel.app/)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- date-fns (date manipulation)
- Heroicons (icons)
- HeadlessUI (accessible components)
- Vitest & React Testing Library (unit testing)
- Cypress (E2E testing)

## Usage

- **Add Task**: Click the "Add Task" button in the header
- **Edit Task**: Click the pencil icon on any task
- **Delete Task**: Click the trash icon on any task
- **Complete Task**: Click the circle checkbox on any task
- **Search**: Use the search box to find specific tasks
- **Filter**: Filter tasks by priority or completion status
- **Toggle Theme**: Click the sun/moon icon to switch between light and dark mode 