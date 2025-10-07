import React, { useEffect, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number; // in milliseconds, 0 = no auto-dismiss
  position?: ToastPosition;
  dismissible?: boolean;
  icon?: React.ReactNode;
  action?: ToastAction;
  showProgress?: boolean;
  onDismiss?: () => void;
}

export interface LiveMenuToastProps extends ToastOptions {
  id: string;
  message: string | React.ReactNode;
  onClose: (id: string) => void;
}

export const LiveMenuToast: React.FC<LiveMenuToastProps> = ({
  id,
  message,
  variant = 'default',
  duration = 5000,
  dismissible = true,
  icon,
  action,
  showProgress = true,
  onClose,
  onDismiss,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Auto-dismiss timer
  useEffect(() => {
    if (duration === 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;
      setProgress(Math.max(0, newProgress));
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
      if (onDismiss) onDismiss();
    }, 300); // Match animation duration
  };

  // Variant configurations
  const variantConfig = {
    success: {
      bgColor: 'bg-success-50 dark:bg-success-900/20',
      borderColor: 'border-success-400 dark:border-success-600',
      textColor: 'text-success-800 dark:text-success-200',
      iconColor: 'text-success-600 dark:text-success-400',
      progressColor: 'bg-success-500',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bgColor: 'bg-danger-50 dark:bg-danger-900/20',
      borderColor: 'border-danger-400 dark:border-danger-600',
      textColor: 'text-danger-800 dark:text-danger-200',
      iconColor: 'text-danger-600 dark:text-danger-400',
      progressColor: 'bg-danger-500',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
      borderColor: 'border-warning-400 dark:border-warning-600',
      textColor: 'text-warning-800 dark:text-warning-200',
      iconColor: 'text-warning-600 dark:text-warning-400',
      progressColor: 'bg-warning-500',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      bgColor: 'bg-info-50 dark:bg-info-900/20',
      borderColor: 'border-info-400 dark:border-info-600',
      textColor: 'text-info-800 dark:text-info-200',
      iconColor: 'text-info-600 dark:text-info-400',
      progressColor: 'bg-info-500',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    default: {
      bgColor: 'bg-white dark:bg-gray-800',
      borderColor: 'border-gray-300 dark:border-gray-600',
      textColor: 'text-gray-800 dark:text-gray-200',
      iconColor: 'text-gray-600 dark:text-gray-400',
      progressColor: 'bg-livemenu',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  };

  const config = variantConfig[variant];
  const displayIcon = icon !== undefined ? icon : config.icon;

  return (
    <div
      className={`
        relative w-full max-w-sm pointer-events-auto
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg shadow-lg overflow-hidden
        transition-all duration-300 ease-in-out
        ${isExiting ? 'animate-toast-exit' : 'animate-toast-enter'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          {displayIcon && (
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              {displayIcon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {typeof message === 'string' ? (
              <p className="text-sm font-medium">{message}</p>
            ) : (
              message
            )}

            {/* Action Button */}
            {action && (
              <button
                onClick={() => {
                  action.onClick();
                  handleClose();
                }}
                className={`
                  mt-2 text-sm font-semibold underline
                  hover:no-underline transition-all
                  ${config.iconColor}
                `}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Close Button */}
          {dismissible && (
            <button
              onClick={handleClose}
              className={`
                flex-shrink-0 rounded-md p-1
                hover:bg-black/5 dark:hover:bg-white/5
                transition-colors
                ${config.iconColor}
              `}
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && duration > 0 && (
        <div className="h-1 bg-black/10 dark:bg-white/10">
          <div
            className={`h-full ${config.progressColor} transition-all ease-linear`}
            style={{
              width: `${progress}%`,
              transitionDuration: '50ms',
            }}
          />
        </div>
      )}
    </div>
  );
};

// Legacy alias
export const Toast = LiveMenuToast;

