import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TaskForm from './components/TaskForm'
import { useTheme } from './hooks/useTheme'

function App() {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const { isDarkMode } = useTheme()

  return (
    <div className={`min-h-screen pb-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 min-h-screen">
        <Header 
          onAddTask={() => {
            setIsAddingTask(true)
            setEditingTaskId(null)
          }} 
        />
        <main className="container mx-auto px-4 py-6">
          <Dashboard 
            onEditTask={(taskId) => {
              setEditingTaskId(taskId)
              setIsAddingTask(true)
            }}
          />
          
          {isAddingTask && (
            <TaskForm 
              taskId={editingTaskId}
              onClose={() => {
                setIsAddingTask(false)
                setEditingTaskId(null)
              }} 
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App 