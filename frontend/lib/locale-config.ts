// lib/locale-config.ts

export const LOCALE_CONFIG = {
  // Configuración para México
  locale: 'es-MX',
  currency: 'MXN',
  currencySymbol: '$',
  currencyName: 'Peso Mexicano',
  
  // Formato de números
  numberFormat: {
    style: 'currency' as const,
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  
  // Formato de fechas
  dateFormat: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,
  
  // Timezone
  timeZone: 'America/Mexico_City',
};

// Función para formatear moneda
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(LOCALE_CONFIG.locale, LOCALE_CONFIG.numberFormat).format(amount);
};

// Función para formatear fecha
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE_CONFIG.locale, LOCALE_CONFIG.dateFormat).format(dateObj);
};

// Función para formatear fecha relativa
export const formatRelativeDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const rtf = new Intl.RelativeTimeFormat(LOCALE_CONFIG.locale, { numeric: 'auto' });
  
  const now = new Date();
  const diffInMs = dateObj.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  
  if (Math.abs(diffInDays) < 1) {
    return 'Hoy';
  } else if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, 'day');
  } else if (Math.abs(diffInDays) < 30) {
    const diffInWeeks = Math.round(diffInDays / 7);
    return rtf.format(diffInWeeks, 'week');
  } else {
    const diffInMonths = Math.round(diffInDays / 30);
    return rtf.format(diffInMonths, 'month');
  }
};
