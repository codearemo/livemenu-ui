import React, { useState, useRef, useEffect, useMemo } from 'react';

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
  value?: T | T[];
  /**
   * Change handler
   */
  onChange?: (value: T | T[], option?: DropdownOption<T>, meta?: { selectedValues: T[]; selectedOptions: DropdownOption<T>[] }) => void;
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
   * Enables multi-select mode
   */
  multiple?: boolean;
  /**
   * Enables client-side searching/filtering within the dropdown options
   */
  searchable?: boolean;
  /**
   * Placeholder text shown within the search input
   */
  searchPlaceholder?: string;
  /**
   * Message displayed when no results match the current search query
   */
  noResultsMessage?: React.ReactNode;
  /**
   * Custom option filtering function (defaults to case-insensitive substring match on labels)
   */
  filterOptions?: (options: DropdownOption<T>[], query: string) => DropdownOption<T>[];
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
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search…',
  noResultsMessage = 'No results found',
  filterOptions,
  className = '',
}: LiveMenuDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMultiple = multiple || Array.isArray(value);

  const selectedValues = useMemo<T[]>(() => {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null) {
      return [];
    }
    return isMultiple ? [value] : [value];
  }, [value, isMultiple]);

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedValues.some((selected) => selected === opt.value)),
    [options, selectedValues]
  );

  const selectedOption = !isMultiple
    ? options.find((opt) => opt.value === value)
    : undefined;

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

  const handleToggleOption = (option: DropdownOption<T>) => {
    if (!onChange) {
      return;
    }

    if (isMultiple) {
      const exists = selectedValues.some((selected) => selected === option.value);
      const newValues = exists
        ? selectedValues.filter((selected) => selected !== option.value)
        : [...selectedValues, option.value];
      const nextOptions = options.filter((opt) =>
        newValues.some((selected) => selected === opt.value)
      );
      onChange(newValues as unknown as T | T[], option, {
        selectedValues: newValues,
        selectedOptions: nextOptions,
      });
    } else {
      onChange(option.value, option, {
        selectedValues: [option.value],
        selectedOptions: [option],
      });
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      return;
    }
    if (searchable) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen, searchable]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }

    if (filterOptions) {
      return filterOptions(options, searchQuery);
    }

    const query = searchQuery.trim().toLowerCase();
    return options.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(query);
      if (labelMatch) return true;
      if (typeof option.value === 'string') {
        return option.value.toLowerCase().includes(query);
      }
      return false;
    });
  }, [filterOptions, options, searchQuery, searchable]);

  const renderSelectedContent = () => {
    if (isMultiple) {
      if (!selectedOptions.length) {
        return placeholder;
      }
      if (selectedOptions.length <= 2) {
        return selectedOptions.map((opt) => opt.label).join(', ');
      }
      return `${selectedOptions[0].label}, +${selectedOptions.length - 1} more`;
    }

    if (selectedOption) {
      return (
        <>
          {selectedOption.prefix || selectedOption.icon}
          {selectedOption.label}
          {selectedOption.suffix}
        </>
      );
    }
    return placeholder;
  };

  const baseClass = error ? 'livemenu-input-error' : 'livemenu-input';
  const fullWidthClass = fullWidth ? 'w-full' : '';
  const iconPaddingClass = prefix ? 'pl-10' : suffix ? 'pr-10' : '';

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
          <div 
            className="absolute inset-y-0 left-0 pl-3 flex items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
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
          <span
            className={`${selectedOption || selectedOptions.length ? 'livemenu-text-primary' : 'livemenu-text-tertiary'} flex items-center gap-2`}
          >
            {renderSelectedContent()}
          </span>
          <div className="flex items-center gap-2">
            {suffix && (
              <span 
                className="livemenu-text-tertiary"
                onClick={(e) => e.stopPropagation()}
              >
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
              absolute z-50 mt-2 min-w-full
              livemenu-surface-elevated
              rounded-md shadow-lg
              max-h-60 overflow-auto
            "
            role="listbox"
            aria-multiselectable={isMultiple || undefined}
          >
            {searchable && (
              <div
                className="
                  sticky top-0 z-10 bg-white dark:bg-gray-800
                  px-3 pt-3 pb-2 border-b border-gray-100 dark:border-gray-700
                "
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="livemenu-input w-full"
                  aria-label="Search options"
                />
              </div>
            )}
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => !option.disabled && handleToggleOption(option)}
                disabled={option.disabled}
                className={`
                  w-full text-left px-4 py-3 text-sm
                  transition-colors
                  flex items-center gap-2
                  whitespace-nowrap
                  ${selectedValues.some((selected) => selected === option.value)
                    ? 'bg-livemenu-light dark:bg-livemenu/10 text-livemenu font-medium'
                    : 'livemenu-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  first:rounded-t-md last:rounded-b-md
                `}
                role="option"
                aria-selected={selectedValues.some((selected) => selected === option.value)}
              >
                {isMultiple && (
                  <span
                    className={`
                      inline-flex h-4 w-4 items-center justify-center rounded border
                      ${selectedValues.some((selected) => selected === option.value)
                        ? 'border-livemenu bg-livemenu text-white'
                        : 'border-gray-300 dark:border-gray-600'}
                    `}
                  >
                    {selectedValues.some((selected) => selected === option.value) && (
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  {option.prefix || option.icon}
                  {option.label}
                  {option.suffix}
                </span>
                {!isMultiple && selectedValues.some((selected) => selected === option.value) && (
                  <svg className="w-4 h-4 ml-auto text-livemenu" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {noResultsMessage}
              </div>
            )}
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

