import React from 'react';

export interface LiveMenuBadgeProps {
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Badge color variant
   */
  variant?: 'primary' | 'light' | 'dark' | 'success' | 'danger' | 'warning' | 'info';
  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show a dot indicator before the badge content
   */
  dot?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuBadge - A small label component for status indicators, counts, and labels
 * 
 * @example
 * ```tsx
 * <LiveMenuBadge variant="primary" size="md">
 *   New
 * </LiveMenuBadge>
 * 
 * <LiveMenuBadge variant="success" dot>
 *   Active
 * </LiveMenuBadge>
 * ```
 */
export const LiveMenuBadge: React.FC<LiveMenuBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  // Base badge class
  const baseClass = 'livemenu-badge';
  
  // Variant classes mapping
  const variantClasses: Record<NonNullable<LiveMenuBadgeProps['variant']>, string> = {
    primary: 'livemenu-badge-primary',
    light: 'bg-livemenu-light text-livemenu-dark hover:bg-livemenu-light-hover',
    dark: 'bg-livemenu-dark text-white hover:bg-livemenu-dark-hover',
    success: 'livemenu-badge-success',
    danger: 'livemenu-badge-danger',
    warning: 'livemenu-badge-warning',
    info: 'livemenu-badge-info',
  };
  
  // Size classes mapping
  const sizeClasses: Record<NonNullable<LiveMenuBadgeProps['size']>, string> = {
    sm: 'livemenu-badge-sm',
    md: 'livemenu-badge-md',
    lg: 'livemenu-badge-lg',
  };
  
  // Combine all classes
  const badgeClasses = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <span className={badgeClasses}>
      {dot && (
        <span 
          className="inline-block w-2 h-2 rounded-full bg-current mr-1.5"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

// Legacy export for backwards compatibility
export const Badge = LiveMenuBadge;
export type BadgeProps = LiveMenuBadgeProps;

