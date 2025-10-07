import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { LiveMenuToast, ToastOptions, ToastPosition } from './Toast';

export interface ToastInstance {
  id: string;
  message: string | React.ReactNode;
  options: ToastOptions;
}

interface ToastContextValue {
  showToast: (message: string | React.ReactNode, options?: ToastOptions) => string;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface LiveMenuToastProviderProps {
  children: React.ReactNode;
  /**
   * Default position for toasts
   * @default 'top-right'
   */
  defaultPosition?: ToastPosition;
  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number;
  /**
   * Default duration in milliseconds
   * @default 5000
   */
  defaultDuration?: number;
}

export const LiveMenuToastProvider: React.FC<LiveMenuToastProviderProps> = ({
  children,
  defaultPosition = 'top-right',
  maxToasts = 5,
  defaultDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const toastIdCounter = useRef(0);

  const showToast = useCallback(
    (message: string | React.ReactNode, options?: ToastOptions): string => {
      const id = `toast-${++toastIdCounter.current}`;

      const newToast: ToastInstance = {
        id,
        message,
        options: {
          variant: 'default',
          duration: defaultDuration,
          position: defaultPosition,
          dismissible: true,
          showProgress: true,
          ...options,
        },
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Limit number of toasts
        return updated.slice(-maxToasts);
      });

      return id;
    },
    [defaultPosition, defaultDuration, maxToasts]
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const hideAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.options.position || defaultPosition;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastInstance[]>);

  // Position styles
  const positionStyles: Record<ToastPosition, string> = {
    'top-right': 'top-0 right-0 items-end',
    'top-left': 'top-0 left-0 items-start',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-0 right-0 items-end',
    'bottom-left': 'bottom-0 left-0 items-start',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, hideAllToasts }}>
      {children}

      {/* Toast Containers for each position */}
      {(Object.entries(toastsByPosition) as [ToastPosition, ToastInstance[]][]).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`
            fixed z-[9999] p-4
            flex flex-col gap-2
            pointer-events-none
            ${positionStyles[position]}
          `}
          aria-live="polite"
          aria-atomic="true"
        >
          {positionToasts.map((toast: ToastInstance) => (
            <LiveMenuToast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={hideToast}
              {...toast.options}
            />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

// Legacy alias
export const ToastProvider = LiveMenuToastProvider;

/**
 * Hook to access toast functions
 * @returns {ToastContextValue} Toast control functions
 * @example
 * ```tsx
 * const { showToast, hideToast } = useToast();
 * 
 * const handleClick = () => {
 *   const toastId = showToast('Hello!', { variant: 'success' });
 * };
 * ```
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a LiveMenuToastProvider');
  }
  return context;
};

// Standalone toast manager for use outside of React components
let standaloneToastContext: ToastContextValue | null = null;

export const setToastContext = (context: ToastContextValue) => {
  standaloneToastContext = context;
};

/**
 * Show a toast notification programmatically without using hooks
 * @param message - The message to display
 * @param options - Toast options
 * @returns {string} Toast ID for later reference
 * @example
 * ```tsx
 * import { showToast } from 'livemenu-ui';
 * 
 * showToast('Operation successful!', {
 *   variant: 'success',
 *   duration: 3000
 * });
 * ```
 */
export const showToast = (
  message: string | React.ReactNode,
  options?: ToastOptions
): string => {
  if (!standaloneToastContext) {
    throw new Error(
      'Toast system not initialized. Make sure LiveMenuToastProvider is mounted in your app.'
    );
  }
  return standaloneToastContext.showToast(message, options);
};

/**
 * Hide a specific toast by ID
 * @param id - Toast ID returned from showToast
 */
export const hideToast = (id: string): void => {
  if (!standaloneToastContext) {
    throw new Error(
      'Toast system not initialized. Make sure LiveMenuToastProvider is mounted in your app.'
    );
  }
  standaloneToastContext.hideToast(id);
};

/**
 * Hide all open toasts
 */
export const hideAllToasts = (): void => {
  if (!standaloneToastContext) {
    throw new Error(
      'Toast system not initialized. Make sure LiveMenuToastProvider is mounted in your app.'
    );
  }
  standaloneToastContext.hideAllToasts();
};

// Helper functions for common toast variants
/**
 * Show a success toast
 * @param message - The message to display
 * @param options - Additional toast options
 * @returns {string} Toast ID
 */
export const showSuccessToast = (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): string => {
  return showToast(message, { ...options, variant: 'success' });
};

/**
 * Show an error toast
 * @param message - The message to display
 * @param options - Additional toast options
 * @returns {string} Toast ID
 */
export const showErrorToast = (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): string => {
  return showToast(message, { ...options, variant: 'error' });
};

/**
 * Show a warning toast
 * @param message - The message to display
 * @param options - Additional toast options
 * @returns {string} Toast ID
 */
export const showWarningToast = (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): string => {
  return showToast(message, { ...options, variant: 'warning' });
};

/**
 * Show an info toast
 * @param message - The message to display
 * @param options - Additional toast options
 * @returns {string} Toast ID
 */
export const showInfoToast = (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): string => {
  return showToast(message, { ...options, variant: 'info' });
};

// Internal component to connect standalone functions to context
export const ToastContextConnector: React.FC = () => {
  const context = useToast();
  React.useEffect(() => {
    setToastContext(context);
  }, [context]);
  return null;
};

