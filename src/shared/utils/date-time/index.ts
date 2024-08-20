import { DateFormatter, DateTime } from '@oleksii-pavlov/date-time'

export const dateFormatter = new DateFormatter()

export function formatSmartDate(date: number) {
  const today = new DateTime().normalizeDate()
  const dateTime = new DateTime(date).normalizeDate()

  const isToday = today.getTimeInMilliseconds() === dateTime.getTimeInMilliseconds()
  if (isToday) return 'Today'

  const isYesterday = today.getDateTimeBefore({ days: 1 }).getTimeInMilliseconds() === dateTime.getTimeInMilliseconds()
  if (isYesterday) return 'Yesterday'

  const isSameYear = today.getTimeData().years === dateTime.getTimeData().years

  const segments: string[] = ['DD', 'MMM', isSameYear ? 'YYYY' : '']
  const formatter = dateFormatter.createFormatter(segments.join(' '))

  return formatter(date)
}
