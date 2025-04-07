# Task Manager

A straightforward task management application with a clean and responsive UI.

## Features

- **Dashboard**: View upcoming, overdue, and completed tasks
- **Task Management**: Add, edit, and delete tasks
- **Priority Levels**: Set task priorities (High, Medium, Low)
- **Search and Filter**: Find and filter tasks easily
- **Dark/Light Mode**: Toggle between dark and light themes
- **Mobile Friendly**: Responsive design works on all devices
- **Local Storage**: Task data persists in browser storage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Git (for version control)

### Installation

1. Clone or download this repository
2. Navigate to the project directory

```bash
cd task-manager
```

3. Install dependencies and start the development server

```bash
npm run setup
```

Or manually:

```bash
npm install
npm run dev
```

4. Open your browser and visit http://localhost:5173

## Version Control with Git

### Setup Git for this project

The project comes with Git already initialized. To customize your Git configuration:

1. Update your user details in the Git config:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

2. Create your first commit:

```bash
git add .
git commit -m "Initial commit"
```

3. Link to your remote repository (GitHub, GitLab, etc.):

```bash
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
```

### Workflow

1. Make changes to the code
2. Stage your changes:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the remote repository:
   ```bash
   git push
   ```

## Deployment on Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy from the project directory
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." > "Project"

4. Import your repository

5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Click "Deploy"

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- date-fns (date manipulation)
- Heroicons (icons)
- HeadlessUI (accessible components)

## Usage

- **Add Task**: Click the "Add Task" button in the header
- **Edit Task**: Click the pencil icon on any task
- **Delete Task**: Click the trash icon on any task
- **Complete Task**: Click the circle checkbox on any task
- **Search**: Use the search box to find specific tasks
- **Filter**: Filter tasks by priority or completion status
- **Toggle Theme**: Click the sun/moon icon to switch between light and dark mode 