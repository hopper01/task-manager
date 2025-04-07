import { createContext, useState, useEffect, ReactNode } from 'react';
import { format } from 'date-fns';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  searchTasks: (query: string) => Task[];
  filterTasks: (filters: { priority?: Priority; status?: 'completed' | 'active' | 'all' }) => Task[];
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleTaskCompletion: () => {},
  getTask: () => undefined,
  searchTasks: () => [],
  filterTasks: () => [],
});

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finalize the project proposal document including timeline and budget.',
    dueDate: format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    priority: 'high',
    completed: false,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    description: 'Set up weekly team meeting to discuss project progress.',
    dueDate: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    priority: 'medium',
    completed: false,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    title: 'Review code changes',
    description: 'Review pull requests and code changes from the development team.',
    dueDate: format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    priority: 'high',
    completed: true,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update the user documentation with the latest feature changes.',
    dueDate: format(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    priority: 'low',
    completed: false,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
  }
];

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
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

  const filterTasks = (filters: { priority?: Priority; status?: 'completed' | 'active' | 'all' }) => {
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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        getTask,
        searchTasks,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}; 