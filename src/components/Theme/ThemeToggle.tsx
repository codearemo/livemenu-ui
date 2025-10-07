import React from 'react';
import { useLiveMenuTheme } from './ThemeProvider';

export interface LiveMenuThemeToggleProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show text label alongside icon
   */
  showLabel?: boolean;
}

/**
 * LiveMenuThemeToggle - A button component to toggle between light and dark themes
 * 
 * @example
 * ```tsx
 * // Simple icon button
 * <LiveMenuThemeToggle />
 * 
 * // With label
 * <LiveMenuThemeToggle showLabel />
 * 
 * // With custom styling
 * <LiveMenuThemeToggle className="shadow-lg" />
 * ```
 */
export const LiveMenuThemeToggle: React.FC<LiveMenuThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  const handleToggle = () => {
    // If currently in system mode, switch to the opposite of current appearance
    // Otherwise, toggle between light and dark
    if (theme === 'system') {
      setTheme(isDark ? 'light' : 'dark');
    } else {
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  // Sun icon (for light mode - shown when in dark mode)
  const SunIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  // Moon icon (for dark mode - shown when in light mode)
  const MoonIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  // Base button styles
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    px-3 py-2 rounded-md
    font-medium text-sm
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-livemenu
    dark:focus:ring-offset-dark-bg-primary
  `;

  // Theme-specific styles
  const themeClasses = isDark
    ? `
      bg-dark-bg-tertiary text-dark-text-primary border border-dark-border
      hover:bg-dark-bg-secondary hover:shadow-md
      active:scale-95
    `
    : `
      bg-gray-100 text-gray-700 border border-gray-300
      hover:bg-gray-200 hover:shadow-md
      active:scale-95
    `;

  const buttonClasses = [baseClasses, themeClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      onClick={handleToggle}
      className={buttonClasses}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      {showLabel && (
        <span className="select-none">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

// Legacy export
export const ThemeToggle = LiveMenuThemeToggle;
export type ThemeToggleProps = LiveMenuThemeToggleProps;

