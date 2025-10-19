import React from 'react';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

export interface LiveMenuRadioProps {
  /**
   * Radio group name
   */
  name: string;
  /**
   * Radio options
   */
  options: RadioOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  /**
   * Label for the radio group
   */
  label?: string;
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Whether the radio group is required
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Radio size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Layout direction
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuRadio - Radio button group component
 * 
 * @example
 * ```tsx
 * <LiveMenuRadio
 *   name="plan"
 *   label="Select Plan"
 *   options={[
 *     { label: 'Free', value: 'free' },
 *     { label: 'Pro', value: 'pro' },
 *   ]}
 *   value={selectedPlan}
 *   onChange={setSelectedPlan}
 * />
 * ```
 */
export const LiveMenuRadio: React.FC<LiveMenuRadioProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  disabled = false,
  required = false,
  error,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const radioClasses = (isDisabled: boolean) => `
    ${sizeClasses[size]}
    border-gray-300 dark:border-dark-border
    text-primary focus:ring-primary focus:ring-2 focus:ring-offset-2
    dark:bg-dark-bg-tertiary dark:focus:ring-offset-dark-bg-primary
    transition-colors cursor-pointer
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${error ? 'border-danger' : ''}
  `;

  const containerClasses = direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3';

  return (
    <div className={className}>
      {/* Group Label */}
      {label && (
        <label className={`livemenu-label ${required ? 'livemenu-label-required' : ''}`}>
          {label}
        </label>
      )}

      {/* Radio Options */}
      <div
        className={containerClasses}
        role="radiogroup"
        aria-labelledby={label ? 'radio-group-label' : undefined}
        aria-invalid={error ? 'true' : 'false'}
      >
        {options.map((option) => {
          const isDisabled = disabled || option.disabled || false;
          const isSelected = value === option.value;

          return (
            <div key={option.value} className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => !isDisabled && onChange && onChange(e.target.value)}
                  disabled={isDisabled}
                  className={radioClasses(isDisabled)}
                />
              </div>

              <div className="flex-1">
                <label
                  className={`
                    text-sm font-medium livemenu-text-primary
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option.label}
                </label>

                {option.helperText && (
                  <p className="mt-1 text-xs livemenu-text-tertiary">
                    {option.helperText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Legacy export
export const Radio = LiveMenuRadio;
export type RadioProps = LiveMenuRadioProps;

