import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption<T = null> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
  /**
   * Element displayed before the label (prefix)
   */
  prefix?: React.ReactNode;
  /**
   * Element displayed after the label (suffix)
   */
  suffix?: React.ReactNode;
}

export interface LiveMenuDropdownProps<T = null> {
  /**
   * Dropdown options
   */
  options: DropdownOption<T>[];
  /**
   * Currently selected value
   */
  value?: T;
  /**
   * Change handler
   */
  onChange?: (value: T) => void;
  /**
   * Placeholder text when nothing selected
   */
  placeholder?: string;
  /**
   * Label for the dropdown
   */
  label?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Whether the dropdown is required
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether dropdown should take full width
   */
  fullWidth?: boolean;
  /**
   * Element displayed on the left side of the dropdown button (prefix)
   */
  prefix?: React.ReactNode;
  /**
   * Element displayed on the right side of the dropdown button before the arrow (suffix)
   */
  suffix?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuDropdown - Dropdown/select component with custom styling
 * 
 * @example
 * ```tsx
 * <LiveMenuDropdown
 *   label="Select Country"
 *   options={[
 *     { label: 'USA', value: 'us' },
 *     { label: 'Canada', value: 'ca' },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export const LiveMenuDropdown = <T = null,>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  required = false,
  error,
  fullWidth = false,
  prefix,
  suffix,
  className = '',
}: LiveMenuDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (optionValue: T) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const baseClass = error ? 'livemenu-input-error' : 'livemenu-input';
  const fullWidthClass = fullWidth ? 'w-full' : '';
  const iconPaddingClass = prefix ? 'pl-10' : '';

  return (
    <div className={fullWidth ? 'w-full' : ''} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className={`livemenu-label ${required ? 'livemenu-label-required' : ''}`}>
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <span className="livemenu-text-tertiary">
              {prefix}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            ${baseClass} ${fullWidthClass} ${iconPaddingClass} ${className}
            flex items-center justify-between
            cursor-pointer
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`${selectedOption ? 'livemenu-text-primary' : 'livemenu-text-tertiary'} flex items-center gap-2`}>
            {selectedOption ? (
              <>
                {selectedOption.prefix || selectedOption.icon}
                {selectedOption.label}
                {selectedOption.suffix}
              </>
            ) : (
              placeholder
            )}
          </span>
          <div className="flex items-center gap-2">
            {suffix && (
              <span className="livemenu-text-tertiary">
                {suffix}
              </span>
            )}
            <svg
              className={`w-5 h-5 livemenu-text-tertiary transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="
              absolute z-50 mt-2 w-full
              livemenu-surface-elevated
              rounded-md shadow-lg
              max-h-60 overflow-auto
            "
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={`
                  w-full text-left px-4 py-3 text-sm
                  transition-colors
                  flex items-center gap-2
                  ${
                    option.value === value
                      ? 'bg-livemenu-light dark:bg-livemenu/10 text-livemenu font-medium'
                      : 'livemenu-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
                  }
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  first:rounded-t-md last:rounded-b-md
                `}
                role="option"
                aria-selected={option.value === value}
              >
                {option.prefix || option.icon}
                {option.label}
                {option.suffix}
                {option.value === value && (
                  <svg className="w-4 h-4 ml-auto text-livemenu" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Legacy export
export const Dropdown = LiveMenuDropdown;
export type DropdownProps<T = null> = LiveMenuDropdownProps<T>;

