import React from 'react';

export interface LiveMenuTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Textarea value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Label for the textarea
   */
  label?: string | React.ReactNode;
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  /**
   * Whether the textarea is required
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Number of rows
   */
  rows?: number;
  /**
   * Textarea size (affects padding and text size)
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether textarea should take full width
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuTextarea - Multi-line text input component
 * 
 * @example
 * ```tsx
 * <LiveMenuTextarea
 *   label="Message"
 *   placeholder="Enter your message..."
 *   rows={5}
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 * />
 * ```
 */
export const LiveMenuTextarea: React.FC<LiveMenuTextareaProps> = ({
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  label,
  disabled = false,
  required = false,
  error,
  helperText,
  rows = 4,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base class
  const baseClass = 'livemenu-textarea';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Full width
  const fullWidthClass = fullWidth ? 'w-full' : '';

  // Error state
  const errorClass = error ? 'border-danger focus:ring-danger focus:border-danger dark:border-danger' : '';

  // Combine classes
  const textareaClasses = [
    baseClass,
    sizeClasses[size],
    fullWidthClass,
    errorClass,
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

      {/* Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? 'textarea-error' : helperText ? 'textarea-helper' : undefined
        }
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p
          id="textarea-error"
          className="mt-1 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p
          id="textarea-helper"
          className="mt-1 text-sm livemenu-text-secondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Legacy export
export const Textarea = LiveMenuTextarea;
export type TextareaProps = LiveMenuTextareaProps;

