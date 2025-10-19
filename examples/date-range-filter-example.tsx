import React, { useState } from 'react';
import { 
  LiveMenuDateRangeFilter, 
  DateRange,
  LiveMenuButton,
  LiveMenuCard,
} from '../src';

/**
 * Example demonstrating the DateRangeFilter component usage
 */
export const DateRangeFilterExample = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateRange2, setDateRange2] = useState<DateRange | undefined>();

  const formatDisplay = (range?: DateRange): string => {
    if (!range) return 'Select date range';
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

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6 livemenu-text-primary">
        DateRangeFilter Examples
      </h1>

      {/* Example 1: Basic usage with button trigger */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Basic Usage with Button Trigger
        </h2>
        <div className="space-y-4">
          <LiveMenuDateRangeFilter
            value={dateRange}
            onChange={setDateRange}
            trigger={
              <LiveMenuButton variant="outline" size="md">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDisplay(dateRange)}
                </div>
              </LiveMenuButton>
            }
          />
          
          {dateRange && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-sm livemenu-text-secondary">Selected Range:</p>
              <p className="text-sm font-mono livemenu-text-primary">
                Start: {dateRange.startDate.toISOString()}
              </p>
              <p className="text-sm font-mono livemenu-text-primary">
                End: {dateRange.endDate.toISOString()}
              </p>
            </div>
          )}
        </div>
      </LiveMenuCard>

      {/* Example 2: Custom trigger element */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Custom Trigger Element
        </h2>
        <div className="space-y-4">
          <LiveMenuDateRangeFilter
            value={dateRange2}
            onChange={setDateRange2}
            position="bottom-right"
            trigger={
              <button className="px-4 py-2 border-2 border-livemenu text-livemenu rounded-lg hover:bg-livemenu hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="font-medium">{formatDisplay(dateRange2)}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            }
          />

          {dateRange2 && (
            <div className="p-4 bg-livemenu-light dark:bg-livemenu/10 rounded-md">
              <p className="text-sm livemenu-text-secondary">Selected Range:</p>
              <p className="text-sm font-medium livemenu-text-primary">
                {formatDisplay(dateRange2)}
              </p>
            </div>
          )}
        </div>
      </LiveMenuCard>

      {/* Example 3: Limited presets */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Limited Preset Options
        </h2>
        <div className="space-y-4">
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Selected range:', range)}
            presets={['last24h', 'last7d', 'last30d']}
            showCustom={false}
            trigger={
              <LiveMenuButton variant="primary" size="md">
                Quick Filters
              </LiveMenuButton>
            }
          />
        </div>
      </LiveMenuCard>

      {/* Example 4: Custom preset labels */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Custom Preset Labels
        </h2>
        <div className="space-y-4">
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Selected range:', range)}
            presetLabels={{
              last24h: 'Past Day',
              last7d: 'Past Week',
              last30d: 'Past Month',
              custom: 'Pick Your Dates',
            }}
            trigger={
              <LiveMenuButton variant="secondary" size="md">
                Filter by Date
              </LiveMenuButton>
            }
          />
        </div>
      </LiveMenuCard>

      {/* Example 5: Different positions */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Dropdown Positions
        </h2>
        <div className="flex flex-wrap gap-4">
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Bottom Left:', range)}
            position="bottom-left"
            trigger={
              <LiveMenuButton variant="outline" size="sm">
                Bottom Left
              </LiveMenuButton>
            }
          />
          
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Bottom Right:', range)}
            position="bottom-right"
            trigger={
              <LiveMenuButton variant="outline" size="sm">
                Bottom Right
              </LiveMenuButton>
            }
          />
          
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Top Left:', range)}
            position="top-left"
            trigger={
              <LiveMenuButton variant="outline" size="sm">
                Top Left
              </LiveMenuButton>
            }
          />
          
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Top Right:', range)}
            position="top-right"
            trigger={
              <LiveMenuButton variant="outline" size="sm">
                Top Right
              </LiveMenuButton>
            }
          />
        </div>
      </LiveMenuCard>

      {/* Example 6: Disabled state */}
      <LiveMenuCard>
        <h2 className="text-xl font-semibold mb-4 livemenu-text-primary">
          Disabled State
        </h2>
        <div className="space-y-4">
          <LiveMenuDateRangeFilter
            onChange={(range) => console.log('Selected range:', range)}
            disabled
            trigger={
              <LiveMenuButton variant="outline" size="md">
                Disabled Filter
              </LiveMenuButton>
            }
          />
        </div>
      </LiveMenuCard>
    </div>
  );
};

export default DateRangeFilterExample;

