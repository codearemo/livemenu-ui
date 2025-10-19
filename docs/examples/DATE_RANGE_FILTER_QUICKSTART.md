# DateRangeFilter - Quick Start Guide

Get started with the DateRangeFilter component in under 5 minutes!

## Installation

If you haven't already installed the LiveMenu UI library:

```bash
npm install @codearemo/livemenu-ui
```

## Basic Setup

### 1. Import the Component

```tsx
import { 
  LiveMenuDateRangeFilter, 
  DateRange,
  LiveMenuButton 
} from '@codearemo/livemenu-ui';
import { useState } from 'react';
```

### 2. Create Your Component

```tsx
function MyDataTable() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div>
      <LiveMenuDateRangeFilter
        value={dateRange}
        onChange={setDateRange}
        trigger={
          <LiveMenuButton variant="outline">
            {dateRange ? dateRange.label : 'Select Date Range'}
          </LiveMenuButton>
        }
      />
      
      {/* Your data table here */}
      {dateRange && (
        <p>
          Filtering from {dateRange.startDate.toLocaleDateString()} 
          to {dateRange.endDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
```

### 3. That's It! 🎉

You now have a fully functional date range filter!

## Common Patterns

### Filter Data Based on Date Range

```tsx
function DataTable() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dateRange) {
      // Fetch or filter your data
      fetchData({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      }).then(setData);
    }
  }, [dateRange]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>My Data</h2>
        <LiveMenuDateRangeFilter
          value={dateRange}
          onChange={setDateRange}
          trigger={
            <LiveMenuButton variant="outline" size="sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {dateRange ? dateRange.label : 'All Time'}
            </LiveMenuButton>
          }
        />
      </div>
      <Table data={data} />
    </div>
  );
}
```

### Custom Trigger with Icons

```tsx
<LiveMenuDateRangeFilter
  value={dateRange}
  onChange={setDateRange}
  trigger={
    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{dateRange ? dateRange.label : 'Select dates'}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  }
/>
```

### Show Only Quick Filters

```tsx
<LiveMenuDateRangeFilter
  onChange={setDateRange}
  presets={['last24h', 'last7d', 'last30d']}
  showCustom={false}
  trigger={<button>Quick Filters</button>}
/>
```

### Clear Selection

```tsx
function FilterWithClear() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="flex gap-2 items-center">
      <LiveMenuDateRangeFilter
        value={dateRange}
        onChange={setDateRange}
        trigger={
          <LiveMenuButton variant="outline">
            {dateRange ? dateRange.label : 'Select Range'}
          </LiveMenuButton>
        }
      />
      {dateRange && (
        <button 
          onClick={() => setDateRange(undefined)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

## Available Presets

The component includes these preset ranges by default:

- **Last 24 hours** - `'last24h'`
- **Last 7 days** - `'last7d'`
- **Last 30 days** - `'last30d'`
- **Last 3 months** - `'last3m'`
- **Last 6 months** - `'last6m'`
- **Last year** - `'lastYear'`
- **Custom range** - `'custom'`

## Props Quick Reference

| Prop | Required | Default | Description |
|------|----------|---------|-------------|
| `trigger` | ✅ Yes | - | Button or element to trigger the filter |
| `onChange` | ✅ Yes | - | Callback when date range changes |
| `value` | No | `undefined` | Current selected date range |
| `presets` | No | All presets | Which preset options to show |
| `showCustom` | No | `true` | Show custom date picker option |
| `position` | No | `'bottom-left'` | Where dropdown appears |
| `disabled` | No | `false` | Disable the filter |

## Tips & Tricks

### 1. Format the Display

```tsx
const formatDisplay = (range?: DateRange): string => {
  if (!range) return 'Select dates';
  if (range.label) return range.label;
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  return `${range.startDate.toLocaleDateString('en-US', options)} - ${range.endDate.toLocaleDateString('en-US', options)}`;
};

// Use in trigger
<button>{formatDisplay(dateRange)}</button>
```

### 2. Set Default Value

```tsx
// Set default to last 7 days
const [dateRange, setDateRange] = useState<DateRange>({
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  endDate: new Date(),
  label: 'Last 7 days'
});
```

### 3. Handle API Calls

```tsx
useEffect(() => {
  if (dateRange) {
    // Format dates for your API
    const params = {
      start_date: dateRange.startDate.toISOString().split('T')[0], // YYYY-MM-DD
      end_date: dateRange.endDate.toISOString().split('T')[0],
    };
    
    fetchData(params);
  }
}, [dateRange]);
```

### 4. Validate Range

```tsx
const handleDateChange = (range: DateRange) => {
  // Ensure range isn't too large
  const maxDays = 90;
  const daysDiff = (range.endDate.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysDiff > maxDays) {
    alert(`Please select a range less than ${maxDays} days`);
    return;
  }
  
  setDateRange(range);
};
```

## Troubleshooting

### Dropdown is cut off
Use the `position` prop to change where the dropdown appears:
```tsx
<LiveMenuDateRangeFilter position="top-right" ... />
```

### Need different presets
Customize which presets are shown:
```tsx
<LiveMenuDateRangeFilter 
  presets={['last7d', 'last30d', 'custom']}
  ...
/>
```

### Custom labels
Override the default labels:
```tsx
<LiveMenuDateRangeFilter 
  presetLabels={{
    last7d: 'Past Week',
    last30d: 'Past Month',
  }}
  ...
/>
```

## Next Steps

- 📖 Read the [full documentation](/docs/components/date-range-filter.md)
- 🎨 Check out the [complete examples](/examples/date-range-filter-example.tsx)
- 🎯 Explore other [LiveMenu components](/docs/DOCUMENTATION_INDEX.md)

## Need Help?

- Check the full documentation at `/docs/components/date-range-filter.md`
- Look at working examples in `/examples/date-range-filter-example.tsx`
- Review the component source at `/src/components/DateRangeFilter/DateRangeFilter.tsx`

Happy filtering! 🎉

