import { SunIcon, MoonIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onAddTask: () => void;
}

const Header = ({ onAddTask }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg 
            className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
        </div>
        
        <div className="flex space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
          
          <button
            className="btn btn-primary flex items-center"
            onClick={onAddTask}
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 