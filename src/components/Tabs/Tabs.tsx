import React, { useState, useCallback } from 'react';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Label to display on the tab
   */
  label: string;
  /**
   * Content to display when tab is active
   */
  content: React.ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;
  /**
   * Optional badge to display after the label
   */
  badge?: string | number;
}

export interface LiveMenuTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  /**
   * ID of the initially active tab
   */
  defaultActiveTab?: string;
  /**
   * Controlled active tab ID
   */
  activeTab?: string;
  /**
   * Callback when tab changes
   */
  onChange?: (tabId: string) => void;
  /**
   * Tab variant style
   */
  variant?: 'underline' | 'pills' | 'bordered';
  /**
   * Tab size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether tabs should take full width
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the tab list
   */
  tabListClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
}

/**
 * LiveMenuTabs - A flexible and accessible tabs component
 * 
 * @example
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Profile', content: <div>Profile content</div> },
 *   { id: 'tab2', label: 'Settings', content: <div>Settings content</div> },
 *   { id: 'tab3', label: 'Notifications', content: <div>Notifications content</div>, badge: 5 }
 * ];
 * 
 * <LiveMenuTabs tabs={tabs} defaultActiveTab="tab1" />
 * ```
 */
export const LiveMenuTabs: React.FC<LiveMenuTabsProps> = ({
  tabs,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = '',
  tabListClassName = '',
  contentClassName = '',
  ...props
}) => {
  // Internal state for uncontrolled mode
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    defaultActiveTab || tabs[0]?.id || ''
  );

  // Determine if component is controlled
  const isControlled = controlledActiveTab !== undefined;
  const activeTabId = isControlled ? controlledActiveTab : internalActiveTab;

  // Handle tab change
  const handleTabChange = useCallback((tabId: string) => {
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  }, [isControlled, onChange]);

  // Get active tab content
  const activeTabContent = tabs.find(tab => tab.id === activeTabId)?.content;

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  // Variant classes
  const getVariantClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = 'transition-all duration-200 font-medium';
    
    if (isDisabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed`;
    }

    switch (variant) {
      case 'underline':
        return `${baseClasses} border-b-2 ${
          isActive
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
        }`;
      case 'pills':
        return `${baseClasses} rounded-lg ${
          isActive
            ? 'bg-primary-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
        }`;
      case 'bordered':
        return `${baseClasses} border rounded-t-lg ${
          isActive
            ? 'border-primary-500 border-b-white dark:border-b-gray-900 bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400'
            : 'border-gray-300 dark:border-gray-700 border-b-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`;
      default:
        return baseClasses;
    }
  };

  // Container classes
  const containerClasses = [
    'livemenu-tabs',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Tab list classes
  const tabListClasses = [
    'livemenu-tabs-list',
    'flex',
    fullWidth ? 'flex-wrap' : 'flex-nowrap',
    'overflow-x-auto',
    'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent',
    fullWidth ? 'w-full' : 'w-auto',
    variant === 'underline' ? 'border-b border-gray-200 dark:border-gray-700' : '',
    variant === 'pills' ? 'gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg' : '',
    variant === 'bordered' ? 'gap-1' : '',
    tabListClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Content classes
  const contentClasses = [
    'livemenu-tabs-content',
    'mt-4',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} {...props}>
      {/* Tab List */}
      <div
        role="tablist"
        className={tabListClasses}
        aria-label="Tabs"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isDisabled = tab.disabled || false;

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleTabChange(tab.id)}
              className={[
                'livemenu-tab',
                getVariantClasses(isActive, isDisabled),
                sizeClasses[size],
                fullWidth ? 'flex-1' : 'flex-shrink-0',
                'whitespace-nowrap',
                'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="flex items-center justify-center gap-2">
                {tab.icon && <span className="livemenu-tab-icon">{tab.icon}</span>}
                <span className="livemenu-tab-label">{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="livemenu-tab-badge inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`panel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        className={contentClasses}
      >
        {activeTabContent}
      </div>
    </div>
  );
};

// Legacy export for backwards compatibility
export const Tabs = LiveMenuTabs;
export type TabsProps = LiveMenuTabsProps;
