import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface LiveMenuThemeContextValue {
  /**
   * Current theme setting ('light', 'dark', or 'system')
   */
  theme: Theme;
  /**
   * Set the theme
   */
  setTheme: (theme: Theme) => void;
  /**
   * Whether dark mode is currently active
   */
  isDark: boolean;
}

export interface LiveMenuThemeProviderProps {
  /**
   * Child components
   */
  children: React.ReactNode;
  /**
   * Default theme
   */
  defaultTheme?: Theme;
  /**
   * localStorage key for persisting theme
   */
  storageKey?: string;
  /**
   * Whether to apply theme to document root automatically
   */
  applyToRoot?: boolean;
}

const LiveMenuThemeContext = createContext<LiveMenuThemeContextValue | undefined>(undefined);

/**
 * LiveMenuThemeProvider - Provides theme management for LiveMenu UI components
 * 
 * @example
 * ```tsx
 * import { LiveMenuThemeProvider } from 'livemenu-ui';
 * 
 * function App() {
 *   return (
 *     <LiveMenuThemeProvider defaultTheme="system" storageKey="livemenu-theme">
 *       <YourApp />
 *     </LiveMenuThemeProvider>
 *   );
 * }
 * ```
 */
export const LiveMenuThemeProvider: React.FC<LiveMenuThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'livemenu-theme',
  applyToRoot = true,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    }
    return defaultTheme;
  });

  const [isDark, setIsDark] = useState(false);

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Calculate if dark mode should be active
  const calculateIsDark = (currentTheme: Theme): boolean => {
    if (currentTheme === 'dark') return true;
    if (currentTheme === 'light') return false;
    return getSystemTheme() === 'dark';
  };

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  // Update isDark when theme changes
  useEffect(() => {
    const darkMode = calculateIsDark(theme);
    setIsDark(darkMode);

    // Apply to document root if enabled
    if (applyToRoot && typeof window !== 'undefined') {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, applyToRoot]);

  // Listen for system theme changes when using 'system' theme
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const darkMode = e.matches;
      setIsDark(darkMode);
      
      if (applyToRoot) {
        const root = document.documentElement;
        if (darkMode) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, applyToRoot]);

  const value: LiveMenuThemeContextValue = {
    theme,
    setTheme,
    isDark,
  };

  return (
    <LiveMenuThemeContext.Provider value={value}>
      {children}
    </LiveMenuThemeContext.Provider>
  );
};

/**
 * useLiveMenuTheme - Hook to access and manage theme
 * 
 * @returns {LiveMenuThemeContextValue} Theme context value
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, isDark } = useLiveMenuTheme();
 *   
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <p>Dark mode active: {isDark ? 'Yes' : 'No'}</p>
 *       <button onClick={() => setTheme('dark')}>Enable Dark Mode</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useLiveMenuTheme = (): LiveMenuThemeContextValue => {
  const context = useContext(LiveMenuThemeContext);
  
  if (context === undefined) {
    throw new Error(
      'useLiveMenuTheme must be used within a LiveMenuThemeProvider. ' +
      'Wrap your app with <LiveMenuThemeProvider> to use theme features.'
    );
  }
  
  return context;
};

// Legacy exports
export const ThemeProvider = LiveMenuThemeProvider;
export const useTheme = useLiveMenuTheme;
export type ThemeProviderProps = LiveMenuThemeProviderProps;
export type ThemeContextValue = LiveMenuThemeContextValue;

