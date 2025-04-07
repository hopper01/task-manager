import { useState } from 'react';
import { useTask } from '../hooks/useTask';
import { Task, Priority } from '../context/TaskContext';
import TaskList from './TaskList';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { format, isAfter, isBefore, startOfToday } from 'date-fns';

interface DashboardProps {
  onEditTask: (taskId: string) => void;
}

const Dashboard = ({ onEditTask }: DashboardProps) => {
  const { tasks, searchTasks } = useTask();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | ''>('');
  const [statusFilter, setStatusFilter] = useState<'completed' | 'active' | 'all'>('all');
  
  const today = startOfToday();

  // Filtered tasks based on search query and filters
  const filteredTasks = searchTasks(searchQuery).filter((task) => {
    // Priority filter
    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === 'completed' && !task.completed) {
      return false;
    }
    if (statusFilter === 'active' && task.completed) {
      return false;
    }
    
    return true;
  });

  // Group tasks
  const upcomingTasks = filteredTasks.filter(
    (task) => !task.completed && isAfter(new Date(task.dueDate), today)
  );
  
  const overdueTasks = filteredTasks.filter(
    (task) => !task.completed && isBefore(new Date(task.dueDate), today)
  );
  
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative inline-block">
              <select
                className="input pr-8 appearance-none"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as Priority | '')}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <FunnelIcon className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative inline-block">
              <select
                className="input pr-8 appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'completed' | 'active' | 'all')}
              >
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <FunnelIcon className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Task Lists */}
      {overdueTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Overdue Tasks</h2>
          <TaskList tasks={overdueTasks} onEditTask={onEditTask} />
        </div>
      )}
      
      {upcomingTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Upcoming Tasks</h2>
          <TaskList tasks={upcomingTasks} onEditTask={onEditTask} />
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">Completed Tasks</h2>
          <TaskList tasks={completedTasks} onEditTask={onEditTask} />
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 