import React from 'react';

export interface LiveMenuSpinnerProps {
  /**
   * Spinner size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Spinner color - uses Tailwind border color classes
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuSpinner - A loading spinner component
 * 
 * @example
 * ```tsx
 * <LiveMenuSpinner size="md" />
 * <LiveMenuSpinner size="sm" color="border-white" />
 * ```
 */
export const LiveMenuSpinner: React.FC<LiveMenuSpinnerProps> = ({
  size = 'md',
  color = 'border-primary',
  className = '',
}) => {
  // Size classes mapping
  const sizeClasses: Record<NonNullable<LiveMenuSpinnerProps['size']>, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
  };

  const spinnerClasses = [
    'inline-block',
    'animate-spin',
    'rounded-full',
    'border-solid',
    color,
    'border-r-transparent',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Legacy export for backwards compatibility
export const Spinner = LiveMenuSpinner;
export type SpinnerProps = LiveMenuSpinnerProps;

