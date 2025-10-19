import React, { useState, useRef, useEffect } from 'react';

export type DateRange = {
  startDate: Date;
  endDate: Date;
  label?: string;
};

export type PresetRange = 'last24h' | 'last7d' | 'last30d' | 'last3m' | 'last6m' | 'lastYear' | 'custom';

export interface LiveMenuDateRangeFilterProps {
  /**
   * Currently selected date range
   */
  value?: DateRange;
  /**
   * Callback when date range changes
   */
  onChange: (range: DateRange) => void;
  /**
   * Custom trigger element to open the filter
   */
  trigger: React.ReactElement;
  /**
   * Preset ranges to show
   * @default ['last24h', 'last7d', 'last30d', 'last3m', 'last6m', 'lastYear', 'custom']
   */
  presets?: PresetRange[];
  /**
   * Custom preset labels
   */
  presetLabels?: Partial<Record<PresetRange, string>>;
  /**
   * Whether to show the custom date range option
   * @default true
   */
  showCustom?: boolean;
  /**
   * Position of the dropdown
   * @default 'bottom-left'
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * Additional CSS classes for the dropdown
   */
  className?: string;
  /**
   * Format function for displaying the selected range in the trigger
   */
  formatDisplay?: (range: DateRange) => string;
  /**
   * Whether the filter is disabled
   */
  disabled?: boolean;
}

const defaultPresetLabels: Record<PresetRange, string> = {
  last24h: 'Last 24 hours',
  last7d: 'Last 7 days',
  last30d: 'Last 30 days',
  last3m: 'Last 3 months',
  last6m: 'Last 6 months',
  lastYear: 'Last year',
  custom: 'Custom range',
};

/**
 * Calculates preset date ranges
 */
const getPresetRange = (preset: PresetRange): DateRange | null => {
  const now = new Date();
  const endDate = new Date(now);
  let startDate = new Date(now);

  switch (preset) {
    case 'last24h':
      startDate.setHours(startDate.getHours() - 24);
      return { startDate, endDate, label: defaultPresetLabels.last24h };
    case 'last7d':
      startDate.setDate(startDate.getDate() - 7);
      return { startDate, endDate, label: defaultPresetLabels.last7d };
    case 'last30d':
      startDate.setDate(startDate.getDate() - 30);
      return { startDate, endDate, label: defaultPresetLabels.last30d };
    case 'last3m':
      startDate.setMonth(startDate.getMonth() - 3);
      return { startDate, endDate, label: defaultPresetLabels.last3m };
    case 'last6m':
      startDate.setMonth(startDate.getMonth() - 6);
      return { startDate, endDate, label: defaultPresetLabels.last6m };
    case 'lastYear':
      startDate.setFullYear(startDate.getFullYear() - 1);
      return { startDate, endDate, label: defaultPresetLabels.lastYear };
    case 'custom':
      return null;
    default:
      return null;
  }
};

/**
 * Format date to YYYY-MM-DD for input[type="date"]
 */
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format date range for display
 */
const defaultFormatDisplay = (range: DateRange): string => {
  if (range.label) return range.label;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
};

/**
 * LiveMenuDateRangeFilter - A date range filter component with preset ranges and custom date selection
 * 
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange | undefined>();
 * 
 * <LiveMenuDateRangeFilter
 *   value={dateRange}
 *   onChange={setDateRange}
 *   trigger={
 *     <button className="livemenu-btn livemenu-btn-outline livemenu-btn-md">
 *       {dateRange ? formatDisplay(dateRange) : 'Select date range'}
 *     </button>
 *   }
 * />
 * ```
 */
export const LiveMenuDateRangeFilter: React.FC<LiveMenuDateRangeFilterProps> = ({
  value,
  onChange,
  trigger,
  presets = ['last24h', 'last7d', 'last30d', 'last3m', 'last6m', 'lastYear', 'custom'],
  presetLabels = {},
  showCustom = true,
  position = 'bottom-left',
  className = '',
  formatDisplay = defaultFormatDisplay,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Merge preset labels
  const labels = { ...defaultPresetLabels, ...presetLabels };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomInput(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setShowCustomInput(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle preset selection
  const handlePresetSelect = (preset: PresetRange) => {
    if (preset === 'custom') {
      setShowCustomInput(true);
      // Initialize with current value if exists
      if (value) {
        setCustomStart(formatDateForInput(value.startDate));
        setCustomEnd(formatDateForInput(value.endDate));
      }
    } else {
      const range = getPresetRange(preset);
      if (range) {
        onChange(range);
        setIsOpen(false);
        setShowCustomInput(false);
      }
    }
  };

  // Handle custom range apply
  const handleApplyCustomRange = () => {
    if (customStart && customEnd) {
      const startDate = new Date(customStart);
      const endDate = new Date(customEnd);
      
      // Set time to start of day for start date and end of day for end date
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      if (startDate <= endDate) {
        onChange({
          startDate,
          endDate,
          label: 'Custom range',
        });
        setIsOpen(false);
        setShowCustomInput(false);
      }
    }
  };

  // Position classes
  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  // Handle trigger click
  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Clone trigger with click handler
  const triggerElement = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      handleTriggerClick();
      // Call original onClick if exists
      if (trigger.props.onClick) {
        trigger.props.onClick(e);
      }
    },
    disabled,
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {triggerElement}

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute z-50 ${positionClasses[position]}
            min-w-[280px]
            livemenu-surface-elevated
            rounded-md shadow-lg
            border border-gray-200 dark:border-gray-700
            ${className}
          `}
          role="menu"
        >
          {!showCustomInput ? (
            // Preset options
            <div className="py-1">
              {presets.filter(p => p !== 'custom' || showCustom).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`
                    w-full text-left px-4 py-2.5 text-sm
                    transition-colors
                    livemenu-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary
                    first:rounded-t-md last:rounded-b-md
                    ${preset === 'custom' ? 'border-t border-gray-200 dark:border-gray-700' : ''}
                  `}
                  role="menuitem"
                >
                  <div className="flex items-center justify-between">
                    <span>{labels[preset]}</span>
                    {preset === 'custom' && (
                      <svg className="w-4 h-4 livemenu-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Custom range inputs
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium livemenu-text-primary">Custom Range</h3>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Back to presets"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div>
                <label className="livemenu-label">Start Date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  max={customEnd || undefined}
                  className="livemenu-input w-full"
                />
              </div>

              <div>
                <label className="livemenu-label">End Date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  min={customStart || undefined}
                  className="livemenu-input w-full"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="livemenu-btn livemenu-btn-outline livemenu-btn-sm flex-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCustomRange}
                  disabled={!customStart || !customEnd}
                  className="livemenu-btn livemenu-btn-primary livemenu-btn-sm flex-1"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Legacy export
export const DateRangeFilter = LiveMenuDateRangeFilter;
export type DateRangeFilterProps = LiveMenuDateRangeFilterProps;

