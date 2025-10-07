import React from 'react';

export interface LiveMenuInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time';
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string | number;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Label text
   */
  label?: string | React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Icon or element displayed on the left side (prefix)
   */
  prefix?: React.ReactNode;
  /**
   * Icon or element displayed on the right side (suffix)
   */
  suffix?: React.ReactNode;
  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuInput - A flexible input component with label, icons, error states, and helper text
 * 
 * @example
 * ```tsx
 * <LiveMenuInput 
 *   label="Email" 
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   error="Invalid email format"
 * />
 * ```
 */
export const LiveMenuInput: React.FC<LiveMenuInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  prefix,
  suffix,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base input class
  const baseInputClass = error ? 'livemenu-input-error' : 'livemenu-input';
  
  // Full width class
  const fullWidthClass = fullWidth ? 'w-full' : '';
  
  // Padding adjustments for icons
  const iconPaddingClass = prefix ? 'pl-10' : suffix ? 'pr-10' : '';
  
  // Combine input classes
  const inputClasses = [
    baseInputClass,
    fullWidthClass,
    iconPaddingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label className={`livemenu-label ${required ? 'livemenu-label-required' : ''}`}>
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="livemenu-text-tertiary">
              {prefix}
            </span>
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? 'input-error' : helperText ? 'input-helper' : undefined
          }
          {...props}
        />
        
        {/* Suffix */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className={error ? 'text-danger' : 'livemenu-text-tertiary'}>
              {suffix}
            </span>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p 
          id="input-error" 
          className="mt-1 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p 
          id="input-helper" 
          className="mt-1 text-sm livemenu-text-secondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Legacy export for backwards compatibility
export const Input = LiveMenuInput;
export type InputProps = LiveMenuInputProps;

