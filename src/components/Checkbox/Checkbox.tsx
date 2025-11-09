import React from 'react';

export interface LiveMenuCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Label text
   */
  label?: string | React.ReactNode;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Checkbox size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuCheckbox - Checkbox component with label and states
 * 
 * @example
 * ```tsx
 * <LiveMenuCheckbox
 *   label="Accept terms and conditions"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 * ```
 */
export const LiveMenuCheckbox: React.FC<LiveMenuCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  helperText,
  size = 'md',
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const checkboxClasses = `
    ${sizeClasses[size]}
    rounded border-gray-300 dark:border-dark-border
    text-livemenu focus:ring-livemenu focus:ring-2 focus:ring-offset-2
    dark:bg-dark-bg-tertiary dark:focus:ring-offset-dark-bg-primary
    transition-colors cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-danger' : ''}
    ${className}
  `;

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={checkboxClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? 'checkbox-error' : helperText ? 'checkbox-helper' : undefined
            }
            {...props}
          />
        </div>

        {label && (
          <div className="flex-1">
            <label
              className={`
                text-sm font-medium livemenu-text-primary
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {label}
            </label>
            
            {helperText && !error && (
              <p
                id="checkbox-helper"
                className="mt-1 text-xs livemenu-text-tertiary"
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p
          id="checkbox-error"
          className="mt-1 text-sm text-danger ml-8"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Legacy export
export const Checkbox = LiveMenuCheckbox;
export type CheckboxProps = LiveMenuCheckboxProps;

