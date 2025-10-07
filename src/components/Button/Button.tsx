import React from 'react';

export interface LiveMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'dark' | 'success' | 'danger';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuButton - A versatile button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * <LiveMenuButton variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click Me
 * </LiveMenuButton>
 * ```
 */
export const LiveMenuButton: React.FC<LiveMenuButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base button class
  const baseClass = 'livemenu-btn';
  
  // Variant classes mapping
  const variantClasses: Record<NonNullable<LiveMenuButtonProps['variant']>, string> = {
    primary: 'livemenu-btn-primary',
    secondary: 'livemenu-btn-secondary',
    outline: 'livemenu-btn-outline',
    light: 'livemenu-btn-light',
    dark: 'livemenu-btn-dark',
    success: 'livemenu-btn-primary bg-success hover:bg-success-600 active:bg-success-700 focus:ring-success',
    danger: 'livemenu-btn-primary bg-danger hover:bg-danger-600 active:bg-danger-700 focus:ring-danger',
  };
  
  // Size classes mapping
  const sizeClasses: Record<NonNullable<LiveMenuButtonProps['size']>, string> = {
    sm: 'livemenu-btn-sm',
    md: 'livemenu-btn-md',
    lg: 'livemenu-btn-lg',
  };
  
  // Full width class
  const fullWidthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    fullWidthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Legacy export for backwards compatibility
export const Button = LiveMenuButton;
export type ButtonProps = LiveMenuButtonProps;

