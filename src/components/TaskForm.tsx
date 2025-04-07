import { useEffect, useState } from 'react';
import { useTask } from '../hooks/useTask';
import { Priority } from '../context/TaskContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface TaskFormProps {
  taskId: string | null;
  onClose: () => void;
}

const TaskForm = ({ taskId, onClose }: TaskFormProps) => {
  const { addTask, updateTask, getTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!taskId;

  useEffect(() => {
    if (taskId) {
      const task = getTask(taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
      }
    }
  }, [taskId, getTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!dueDate) {
      setError('Due date is required');
      return;
    }
    
    if (isEditing && taskId) {
      updateTask(taskId, {
        title,
        description,
        dueDate,
        priority,
      });
    } else {
      addTask({
        title,
        description,
        dueDate,
        priority,
        completed: false,
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-100">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="priority"
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 