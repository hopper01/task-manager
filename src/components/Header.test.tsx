import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { ThemeContext } from '../context/ThemeContext';

describe('Header Component', () => {
  it('renders correctly', () => {
    const mockOnAddTask = vi.fn();
    const mockToggleTheme = vi.fn();
    
    render(
      <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: mockToggleTheme }}>
        <Header onAddTask={mockOnAddTask} />
      </ThemeContext.Provider>
    );
    
    // Check if the app title is displayed
    expect(screen.getByRole('heading', { name: 'Task Manager' })).toBeInTheDocument();
    
    // Check if the theme toggle button exists
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    
    // Check if the add task button exists
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });
  
  it('calls onAddTask when add button is clicked', async () => {
    const mockOnAddTask = vi.fn();
    const mockToggleTheme = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: mockToggleTheme }}>
        <Header onAddTask={mockOnAddTask} />
      </ThemeContext.Provider>
    );
    
    // Click the add task button
    await user.click(screen.getByRole('button', { name: 'Add Task' }));
    
    // Verify that onAddTask was called
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });
  
  it('calls toggleTheme when theme button is clicked', async () => {
    const mockOnAddTask = vi.fn();
    const mockToggleTheme = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: mockToggleTheme }}>
        <Header onAddTask={mockOnAddTask} />
      </ThemeContext.Provider>
    );
    
    // Click the theme toggle button
    await user.click(screen.getByLabelText('Switch to dark mode'));
    
    // Verify that toggleTheme was called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
}); 