import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, parseISO } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const getWeekDays = (date: Date = new Date()) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  
  return eachDayOfInterval({ start, end });
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
};

export const isDateToday = (dateString: string): boolean => {
  return isToday(parseISO(dateString));
};

export const getDayName = (date: Date): string => {
  return format(date, 'EEE');
};

export const getDayNumber = (date: Date): string => {
  return format(date, 'd');
};