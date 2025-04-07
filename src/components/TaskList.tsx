import { Task } from '../context/TaskContext';
import { useTask } from '../hooks/useTask';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { format, isPast, parseISO } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (taskId: string) => void;
}

const TaskList = ({ tasks, onEditTask }: TaskListProps) => {
  const { toggleTaskCompletion, deleteTask } = useTask();

  const getPriorityClasses = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isPastDue = isPast(parseISO(task.dueDate)) && !task.completed;
        
        return (
          <div key={task.id} className="card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-grow">
                <div className="flex items-start">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`flex-shrink-0 mr-3 h-5 w-5 mt-1 rounded-full border ${
                      task.completed 
                        ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } flex items-center justify-center`}
                  >
                    {task.completed && (
                      <CheckIcon className="h-3 w-3 text-white" />
                    )}
                  </button>
                  
                  <div className="flex-grow">
                    <h3 className={`text-lg font-medium ${
                      task.completed ? 'text-gray-500 line-through dark:text-gray-400' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-wrap mt-2 gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriorityClasses(task.priority)
                      }`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isPastDue
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-8">
                <button
                  onClick={() => onEditTask(task.id)}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700"
                  aria-label="Edit task"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700"
                  aria-label="Delete task"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList; 