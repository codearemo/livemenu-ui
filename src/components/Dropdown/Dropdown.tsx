import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface LiveMenuDropdownProps {
  /**
   * Dropdown options
   */
  options: DropdownOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
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
export const LiveMenuDropdown: React.FC<LiveMenuDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  required = false,
  error,
  fullWidth = false,
  className = '',
}) => {
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

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const baseClass = error ? 'livemenu-input-error' : 'livemenu-input';
  const fullWidthClass = fullWidth ? 'w-full' : '';

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
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            ${baseClass} ${fullWidthClass} ${className}
            flex items-center justify-between
            cursor-pointer
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? 'livemenu-text-primary' : 'livemenu-text-tertiary'}>
            {selectedOption ? (
              <span className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
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
            {options.map((option) => (
              <button
                key={option.value}
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
                {option.icon}
                {option.label}
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
export type DropdownProps = LiveMenuDropdownProps;

