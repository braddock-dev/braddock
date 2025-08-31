# Statistics Page

## Overview

The Statistics page provides comprehensive insights into appointment data and business performance metrics for administrators.

## Features

### 📊 Key Metrics Dashboard

- **Total Appointments**: Count of all appointments in the selected date range
- **Completed Appointments**: Number of successfully completed appointments
- **No-Show Appointments**: Count of appointments where customers didn't show up
- **Total Revenue**: Sum of all appointment revenues (requires price data in treatments)
- **Completion Rate**: Percentage of appointments that were completed
- **No-Show Rate**: Percentage of appointments with no-shows
- **Average Duration**: Mean appointment duration in minutes

### 📈 Interactive Charts

1. **Appointments by Day**: Bar chart showing daily appointment counts
2. **Popular Treatments**: Horizontal bar chart of most requested services
3. **Revenue Over Time**: Line chart tracking daily revenue (when price data available)
4. **Top Operators**: Ranking of operators by appointment count

### 🗓️ Date Range Selection

- Custom date range picker
- Quick preset options (last 30 days, last week, etc.)
- Real-time data filtering

## Components

### Core Components

- `StatisticsPageContent.tsx` - Main page component
- `StatisticsCard.tsx` - Individual metric cards
- `DateRangePicker.tsx` - Date range selection
- `AppointmentsChart.tsx` - Daily appointments visualization
- `TreatmentsChart.tsx` - Treatment popularity chart
- `RevenueChart.tsx` - Revenue tracking chart

### Supporting Files

- `loading.tsx` - Loading skeleton
- `error.tsx` - Error boundary
- `page.tsx` - Next.js page wrapper

## Data Sources

### Required Data

- **Appointments**: From `getAppointments()` action
- **Treatments**: From `getTreatmentsList()` action
- **Operators**: From `getOperators()` action

### Data Structure

```typescript
interface Appointment {
  id: string;
  state: AppointmentStatus;
  durationInMinutes: number;
  treatments: Treatment[];
  operatorId: string;
  // ... other fields
}

interface Treatment {
  id: string;
  name: string;
  price?: number; // Optional - needed for revenue calculations
  durationInMinutes: number;
}
```

## Usage

### Navigation

Access via: `/admin/statistics` or through the admin sidebar menu

### Date Filtering

1. Click the date range picker button
2. Select start and end dates
3. Click "Apply" to update statistics
4. Use "Reset" to return to default 30-day range

### Responsive Design

- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly interactions

## Technical Details

### State Management

- Uses React Query for data fetching
- Local state for date range selection
- Memoized calculations for performance

### Chart Implementation

- Custom CSS-based charts (no external dependencies)
- Responsive design with hover tooltips
- Smooth animations and transitions

### Performance Optimizations

- Memoized statistics calculations
- Efficient data processing with flatMap
- Lazy loading of chart components

## Future Enhancements

### Planned Features

- Export statistics to PDF/Excel
- More chart types (pie charts, heatmaps)
- Advanced filtering (by operator, treatment type)
- Historical trend analysis
- Real-time updates

### Data Improvements

- Price data integration for accurate revenue tracking
- Customer satisfaction metrics
- Operator performance analytics
- Treatment profitability analysis

## Troubleshooting

### Common Issues

1. **No data displayed**: Check if appointments exist in the selected date range
2. **Revenue shows €0.00**: Treatment prices need to be configured
3. **Charts not loading**: Verify data API endpoints are working
4. **Date picker not working**: Check browser compatibility

### Debug Information

- Check browser console for errors
- Verify API responses in Network tab
- Confirm data structure matches expected format

## Dependencies

- React Query for data fetching
- Day.js for date manipulation
- Lucide React for icons
- Tailwind CSS for styling
- Framer Motion for animations
