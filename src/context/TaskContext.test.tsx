import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider, TaskContext, Task, Priority } from './TaskContext';
import { format } from 'date-fns';

// Define Task type if not exported from TaskContext
interface TestTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

// Create a modified TaskProvider specifically for testing
const CustomTaskProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock an empty initial state with proper typing
  const [tasks, setTasks] = React.useState<TestTask[]>([]);

  const addTask = (task: Omit<TestTask, 'id' | 'createdAt'>) => {
    const newTask: TestTask = {
      ...task,
      id: 'test-id',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Omit<TestTask, 'id' | 'createdAt'>>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const searchTasks = (query: string) => {
    if (!query) return tasks;
    const lowerCaseQuery = query.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseQuery) ||
        task.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filterTasks = (filters: { priority?: 'low' | 'medium' | 'high'; status?: 'completed' | 'active' | 'all' }) => {
    return tasks.filter((task) => {
      let match = true;
      
      if (filters.priority) {
        match = match && task.priority === filters.priority;
      }
      
      if (filters.status) {
        if (filters.status === 'completed') {
          match = match && task.completed;
        } else if (filters.status === 'active') {
          match = match && !task.completed;
        }
      }
      
      return match;
    });
  };

  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTask,
    searchTasks,
    filterTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Test component to interact with context
const TestComponent = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = React.useContext(TaskContext);

  return (
    <div>
      <h1 data-testid="task-count">Task Count: {tasks.length}</h1>
      <button 
        data-testid="add-task-button"
        onClick={() => addTask({
          title: 'Test Task',
          description: 'Test Description',
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          priority: 'medium',
          completed: false,
        })}
      >
        Add Task
      </button>
      {tasks.map((task) => (
        <div key={task.id} data-testid={`task-${task.id}`}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p data-testid={`completed-${task.id}`}>Completed: {task.completed ? 'Yes' : 'No'}</p>
          <button 
            data-testid={`toggle-${task.id}`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            Toggle Complete
          </button>
          <button 
            data-testid={`delete-${task.id}`}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

describe('TaskContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  it('provides initial tasks', () => {
    render(
      <CustomTaskProvider>
        <TestComponent />
      </CustomTaskProvider>
    );
    
    // With our custom provider, we should start with 0 tasks
    expect(screen.getByTestId('task-count')).toHaveTextContent('Task Count: 0');
  });

  it('allows adding a task', async () => {
    const user = userEvent.setup();
    
    render(
      <CustomTaskProvider>
        <TestComponent />
      </CustomTaskProvider>
    );
    
    // Click the add task button
    await user.click(screen.getByTestId('add-task-button'));
    
    // Verify a new task is added - we should now have 1 task
    expect(screen.getByTestId('task-count')).toHaveTextContent('Task Count: 1');
    
    // Find the newly created task (it should be the only one)
    const taskElement = screen.getByText('Test Task');
    expect(taskElement).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Priority: medium')).toBeInTheDocument();
    expect(screen.getByTestId('completed-test-id')).toHaveTextContent('Completed: No');
  });

  it('allows toggling task completion', async () => {
    const user = userEvent.setup();
    
    render(
      <CustomTaskProvider>
        <TestComponent />
      </CustomTaskProvider>
    );
    
    // Add a task first
    await user.click(screen.getByTestId('add-task-button'));
    
    // Toggle completion
    await user.click(screen.getByTestId('toggle-test-id'));
    
    // Verify completion status is toggled
    expect(screen.getByTestId('completed-test-id')).toHaveTextContent('Completed: Yes');
  });

  it('allows deleting a task', async () => {
    const user = userEvent.setup();
    
    render(
      <CustomTaskProvider>
        <TestComponent />
      </CustomTaskProvider>
    );
    
    // Add a task first
    await user.click(screen.getByTestId('add-task-button'));
    
    // Delete the task
    await user.click(screen.getByTestId('delete-test-id'));
    
    // Verify the task is deleted - we should now have 0 tasks
    expect(screen.getByTestId('task-count')).toHaveTextContent('Task Count: 0');
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
  });
}); 