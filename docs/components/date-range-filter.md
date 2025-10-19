# DateRangeFilter Component

A flexible date range filter component that allows users to select from preset date ranges or create custom date ranges. The component features a customizable trigger element and emits the selected date range.

## Features

- 📅 **Preset Ranges**: Quick selection with presets like "Last 24 hours", "Last 7 days", "Last 30 days", etc.
- 🎯 **Custom Range**: Allow users to pick custom start and end dates
- 🎨 **Custom Trigger**: Use any React element as the trigger
- 🎯 **Multiple Positions**: Position the dropdown in any corner
- 🎨 **Customizable Labels**: Override default preset labels
- ♿ **Accessible**: Keyboard navigation and ARIA attributes
- 🌙 **Dark Mode**: Full dark mode support

## Basic Usage

```tsx
import { LiveMenuDateRangeFilter, DateRange } from 'livemenu-ui';
import { useState } from 'react';

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <LiveMenuDateRangeFilter
      value={dateRange}
      onChange={setDateRange}
      trigger={
        <button className="livemenu-btn livemenu-btn-outline">
          {dateRange ? 
            `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}` : 
            'Select date range'
          }
        </button>
      }
    />
  );
}
```

## Examples

### With Button Component

```tsx
import { 
  LiveMenuDateRangeFilter, 
  LiveMenuButton,
  DateRange 
} from 'livemenu-ui';

function DateFilter() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

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
    <LiveMenuDateRangeFilter
      value={dateRange}
      onChange={setDateRange}
      trigger={
        <LiveMenuButton variant="outline">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            {formatDisplay(dateRange)}
          </div>
        </LiveMenuButton>
      }
    />
  );
}
```

### Limited Preset Options

```tsx
<LiveMenuDateRangeFilter
  onChange={(range) => console.log('Selected:', range)}
  presets={['last24h', 'last7d', 'last30d']}
  showCustom={false}
  trigger={<button>Quick Filters</button>}
/>
```

### Custom Preset Labels

```tsx
<LiveMenuDateRangeFilter
  onChange={(range) => console.log('Selected:', range)}
  presetLabels={{
    last24h: 'Past Day',
    last7d: 'Past Week',
    last30d: 'Past Month',
    last3m: 'Past Quarter',
    last6m: 'Past Half Year',
    lastYear: 'Past Year',
    custom: 'Pick Your Dates',
  }}
  trigger={<button>Filter by Date</button>}
/>
```

### Different Dropdown Positions

```tsx
// Bottom Left (default)
<LiveMenuDateRangeFilter
  onChange={setDateRange}
  position="bottom-left"
  trigger={<button>Bottom Left</button>}
/>

// Bottom Right
<LiveMenuDateRangeFilter
  onChange={setDateRange}
  position="bottom-right"
  trigger={<button>Bottom Right</button>}
/>

// Top Left
<LiveMenuDateRangeFilter
  onChange={setDateRange}
  position="top-left"
  trigger={<button>Top Left</button>}
/>

// Top Right
<LiveMenuDateRangeFilter
  onChange={setDateRange}
  position="top-right"
  trigger={<button>Top Right</button>}
/>
```

### Custom Format Display

```tsx
<LiveMenuDateRangeFilter
  value={dateRange}
  onChange={setDateRange}
  formatDisplay={(range) => {
    const start = range.startDate.toISOString().split('T')[0];
    const end = range.endDate.toISOString().split('T')[0];
    return `From ${start} to ${end}`;
  }}
  trigger={<button>Select Dates</button>}
/>
```

### In a Data Table

```tsx
function DataTable() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (dateRange) {
      const filtered = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [dateRange]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Data Table</h2>
        <LiveMenuDateRangeFilter
          value={dateRange}
          onChange={setDateRange}
          trigger={
            <LiveMenuButton variant="outline" size="sm">
              <FilterIcon />
              {dateRange ? dateRange.label : 'All Time'}
            </LiveMenuButton>
          }
        />
      </div>
      <Table data={filteredData} />
    </div>
  );
}
```

### Analytics Dashboard

```tsx
function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    label: 'Last 7 days'
  });

  const { data, isLoading } = useAnalytics({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Analytics</h1>
        <LiveMenuDateRangeFilter
          value={dateRange}
          onChange={setDateRange}
          trigger={
            <LiveMenuButton variant="primary">
              {dateRange.label || 'Custom Range'}
              <ChevronDownIcon />
            </LiveMenuButton>
          }
        />
      </div>
      
      {isLoading ? <Spinner /> : <AnalyticsCharts data={data} />}
    </div>
  );
}
```

## Props

### `LiveMenuDateRangeFilterProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange \| undefined` | `undefined` | Currently selected date range |
| `onChange` | `(range: DateRange) => void` | **Required** | Callback when date range changes |
| `trigger` | `React.ReactElement` | **Required** | Custom trigger element to open the filter |
| `presets` | `PresetRange[]` | All presets | Preset ranges to show |
| `presetLabels` | `Partial<Record<PresetRange, string>>` | Default labels | Custom preset labels |
| `showCustom` | `boolean` | `true` | Whether to show the custom date range option |
| `position` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Position of the dropdown |
| `className` | `string` | `''` | Additional CSS classes for the dropdown |
| `formatDisplay` | `(range: DateRange) => string` | Default formatter | Format function for displaying the selected range |
| `disabled` | `boolean` | `false` | Whether the filter is disabled |

### Type Definitions

#### `DateRange`

```typescript
type DateRange = {
  startDate: Date;
  endDate: Date;
  label?: string;
};
```

#### `PresetRange`

```typescript
type PresetRange = 
  | 'last24h'    // Last 24 hours
  | 'last7d'     // Last 7 days
  | 'last30d'    // Last 30 days
  | 'last3m'     // Last 3 months
  | 'last6m'     // Last 6 months
  | 'lastYear'   // Last year
  | 'custom';    // Custom range
```

## Default Preset Labels

```typescript
{
  last24h: 'Last 24 hours',
  last7d: 'Last 7 days',
  last30d: 'Last 30 days',
  last3m: 'Last 3 months',
  last6m: 'Last 6 months',
  lastYear: 'Last year',
  custom: 'Custom range',
}
```

## Styling

The DateRangeFilter component uses the LiveMenu design system classes:

- `livemenu-surface-elevated` - Dropdown background
- `livemenu-text-primary` - Primary text color
- `livemenu-text-secondary` - Secondary text color
- `livemenu-text-tertiary` - Tertiary text color
- `livemenu-input` - Input styling for date inputs
- `livemenu-label` - Label styling
- `livemenu-btn` - Button styling

### Custom Styling

You can add custom styles using the `className` prop:

```tsx
<LiveMenuDateRangeFilter
  className="shadow-2xl border-2 border-livemenu"
  onChange={setDateRange}
  trigger={<button>Filter</button>}
/>
```

## Accessibility

The component follows accessibility best practices:

- **Keyboard Navigation**: ESC key closes the dropdown
- **Click Outside**: Clicking outside closes the dropdown
- **ARIA Attributes**: Proper `role` and `aria-*` attributes
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: Semantic HTML and labels

## Date Range Calculation

The preset ranges are calculated from the current date/time:

- **Last 24 hours**: Now - 24 hours to now
- **Last 7 days**: Now - 7 days to now
- **Last 30 days**: Now - 30 days to now
- **Last 3 months**: Now - 3 months to now
- **Last 6 months**: Now - 6 months to now
- **Last year**: Now - 1 year to now

Custom ranges set:
- Start date: Beginning of the selected day (00:00:00)
- End date: End of the selected day (23:59:59)

## Best Practices

1. **Always provide a meaningful trigger**: Use clear text or icons to indicate the purpose
2. **Show current selection**: Display the selected range in the trigger element
3. **Handle edge cases**: Account for undefined or null values
4. **Format dates consistently**: Use a consistent date format throughout your app
5. **Consider timezone**: Be aware of timezone handling in your application
6. **Validate ranges**: Ensure start date is before end date
7. **Provide feedback**: Show loading states while fetching data for the new range

## Common Patterns

### Clear Selection

```tsx
function FilterWithClear() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="flex gap-2">
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
        <LiveMenuButton 
          variant="text" 
          onClick={() => setDateRange(undefined)}
        >
          Clear
        </LiveMenuButton>
      )}
    </div>
  );
}
```

### Multiple Filters

```tsx
function MultipleFilters() {
  const [dateRange1, setDateRange1] = useState<DateRange | undefined>();
  const [dateRange2, setDateRange2] = useState<DateRange | undefined>();

  return (
    <div className="flex gap-4">
      <div>
        <label className="livemenu-label">Start Period</label>
        <LiveMenuDateRangeFilter
          value={dateRange1}
          onChange={setDateRange1}
          trigger={<button>Select Start</button>}
        />
      </div>
      <div>
        <label className="livemenu-label">End Period</label>
        <LiveMenuDateRangeFilter
          value={dateRange2}
          onChange={setDateRange2}
          trigger={<button>Select End</button>}
        />
      </div>
    </div>
  );
}
```

### Save to URL Params

```tsx
function FilterWithURLSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dateRange = useMemo(() => {
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    if (start && end) {
      return {
        startDate: new Date(start),
        endDate: new Date(end),
      };
    }
    return undefined;
  }, [searchParams]);

  const handleChange = (range: DateRange) => {
    setSearchParams({
      start: range.startDate.toISOString(),
      end: range.endDate.toISOString(),
    });
  };

  return (
    <LiveMenuDateRangeFilter
      value={dateRange}
      onChange={handleChange}
      trigger={<button>Filter</button>}
    />
  );
}
```

## See Also

- [Dropdown Component](./dropdown.md) - For general dropdown patterns
- [Input Component](./input.md) - For date input fields
- [Button Component](./button.md) - For trigger elements
- [Theme System](./theme.md) - For dark mode support

