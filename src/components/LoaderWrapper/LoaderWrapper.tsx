import React, { useState, useEffect } from 'react';

export interface LiveMenuLoaderWrapperProps {
  /**
   * Whether the component is in a loading state
   */
  isLoading: boolean;

  /**
   * Error message to display when present
   * If truthy, error state is shown
   */
  errorMessage?: string | null;

  /**
   * Whether the loading/error state should cover the full screen
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Optional custom loader component
   */
  customLoader?: React.ReactNode;

  /**
   * Optional custom error component
   */
  customError?: React.ReactNode;

  /**
   * Children to render when not loading and no error
   */
  children: React.ReactNode;

  /**
   * Optional callback for retry action when error occurs
   */
  onRetry?: () => void;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Optional empty state component to show when data is empty
   */
  emptyComponent?: React.ReactNode;

  /**
   * Whether the current data state is empty
   * @default false
   */
  isEmpty?: boolean;

  /**
   * Minimum height for the container
   * @default '300px'
   */
  minHeight?: string;
}

/**
 * LiveMenuLoaderWrapper - A wrapper component that handles loading, error, and success states
 * 
 * @example
 * ```tsx
 * <LiveMenuLoaderWrapper 
 *   isLoading={loading} 
 *   errorMessage={error}
 *   onRetry={() => refetch()}
 * >
 *   <YourContent />
 * </LiveMenuLoaderWrapper>
 * ```
 */
export const LiveMenuLoaderWrapper: React.FC<LiveMenuLoaderWrapperProps> = ({
  isLoading,
  errorMessage,
  fullScreen = false,
  customLoader,
  customError,
  children,
  onRetry,
  transitionDuration = 300,
  className = '',
  emptyComponent,
  isEmpty = false,
  minHeight = '300px',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(isLoading || !!errorMessage);
  const [showOverlay, setShowOverlay] = useState<boolean>(isLoading || !!errorMessage);

  // Handle transitions when loading or error state changes
  useEffect(() => {
    if (isLoading || errorMessage) {
      setShowOverlay(true);
      setIsVisible(true);
    } else {
      // Delay hiding to allow transition
      const timer = setTimeout(() => {
        setShowOverlay(false);
        setIsVisible(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [isLoading, errorMessage, transitionDuration]);

  // Loading spinner icon
  const LoadingIcon = () => (
    <svg
      className="animate-spin h-12 w-12 text-livemenu"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Error icon
  const ErrorIcon = () => (
    <svg
      className="h-16 w-16 text-danger"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // Empty state icon
  const EmptyIcon = () => (
    <svg
      className="h-16 w-16 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  // Default loader component
  const DefaultLoader = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="relative flex items-center justify-center">
        <LoadingIcon />
      </div>
      <div className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
        Loading...
      </div>
    </div>
  );

  // Default error component
  const DefaultError = () => (
    <div className="flex flex-col gap-2 items-center justify-center h-full w-full text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-danger-50 dark:bg-danger/20 flex items-center justify-center mb-2">
        <ErrorIcon />
      </div>
      <p className="text-danger font-medium max-w-md">
        {errorMessage || 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <div className="mt-4">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-danger text-white rounded-md hover:bg-danger-600 active:bg-danger-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );

  // Default empty component
  const DefaultEmpty = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
      <EmptyIcon />
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
        No data available
      </p>
    </div>
  );

  // Container classes
  const containerClasses = `
    relative w-full h-full
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Overlay classes
  const overlayClasses = `
    bg-white dark:bg-gray-800 rounded-lg
    flex justify-center items-center
    transition-opacity duration-${transitionDuration}
    ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    ${fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10'}
  `.trim().replace(/\s+/g, ' ');

  // Show empty state if data is empty and we have an empty component
  if (!isLoading && !errorMessage && isEmpty) {
    return (
      <div className={containerClasses} style={{ minHeight }}>
        {emptyComponent || <DefaultEmpty />}
      </div>
    );
  }

  return (
    <div className={containerClasses} style={{ minHeight }}>
      {/* Render children when not loading and no error */}
      <div
        className={`w-full h-full transition-opacity duration-${transitionDuration} ${
          showOverlay ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {children}
      </div>

      {/* Loading/Error overlay */}
      {isVisible && (
        <div className={overlayClasses}>
          <div className="w-full h-full flex items-center justify-center">
            {isLoading && (customLoader || <DefaultLoader />)}
            {!isLoading && errorMessage && (customError || <DefaultError />)}
          </div>
        </div>
      )}
    </div>
  );
};

// Legacy alias
export const LoaderWrapper = LiveMenuLoaderWrapper;
export type LoaderWrapperProps = LiveMenuLoaderWrapperProps;

