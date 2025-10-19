import React from 'react';

export interface LiveMenuSwitchProps {
  /**
   * Whether the switch is checked/on
   */
  checked?: boolean;
  /**
   * Change handler
   */
  onChange?: (checked: boolean) => void;
  /**
   * Label text
   */
  label?: string | React.ReactNode;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Switch size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color variant when enabled
   */
  variant?: 'primary' | 'success' | 'danger';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuSwitch - Toggle switch component for binary choices
 * 
 * @example
 * ```tsx
 * <LiveMenuSwitch
 *   label="Enable notifications"
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 * />
 * ```
 */
export const LiveMenuSwitch: React.FC<LiveMenuSwitchProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: checked ? 'translate-x-4' : 'translate-x-0',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: checked ? 'translate-x-7' : 'translate-x-0',
    },
  };

  // Variant colors
  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    danger: 'bg-danger',
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleChange}
        disabled={disabled}
        className={`
          ${config.track}
          relative inline-flex items-center
          rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          dark:focus:ring-offset-dark-bg-primary
          ${
            checked
              ? variantClasses[variant]
              : 'bg-gray-300 dark:bg-dark-bg-tertiary'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${config.thumb}
            inline-block
            transform rounded-full
            bg-white dark:bg-dark-text-primary
            shadow-lg
            transition-transform duration-200 ease-in-out
            ${config.translate}
          `}
        />
      </button>

      {/* Label */}
      {label && (
        <label
          onClick={() => !disabled && handleChange()}
          className={`
            text-sm font-medium livemenu-text-primary
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {label}
        </label>
      )}
    </div>
  );
};

// Legacy export
export const Switch = LiveMenuSwitch;
export type SwitchProps = LiveMenuSwitchProps;

