import config from "./config";
export const apiUrl = config.API_URL || "";

export const dateFilter = [
  { label: 'Today', value: 'today' },
  // { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7Days' },
  // { label: 'Last Week', value: 'lastWeek' },
  { label: 'Last 30 Days', value: 'last30Days' },
  // { label: 'This Month', value: 'thisMonth' },
  // { label: 'Last Month', value: 'lastMonth' },
  // { label: 'Last 60 Days', value: 'last60Days' },
  { label: 'Last 3 Months', value: 'last90Days' },
  { label: 'Custom Date', value: 'customDate' },
  { label: 'All', value: 'all' }
]


export const monthsForGraph = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}