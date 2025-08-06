import { ApiResponseData } from '@/types/shared/api';
import { ExpenseCategory } from '../../expenses/types/expense';
import { PaymentMethodType } from '../../methodpayment/types/methodpayment';

// Estadísticas por categoría
export interface CategoryStats {
  category: ExpenseCategory;
  category_name: string;
  total_amount: number;
  expense_count: number;
  percentage: number;
  color?: string;
  icon?: string;
}

// Estadísticas por método de pago
export interface PaymentMethodStats {
  method_id: string;
  method_name: string;
  method_type: PaymentMethodType;
  total_amount: number;
  expense_count: number;
  percentage: number;
  color?: string;
  icon?: string;
}

// Estadísticas mensuales
export interface MonthlyStats {
  month: string; // formato: YYYY-MM
  month_name: string; // ej: "Enero 2024"
  total_amount: number;
  expense_count: number;
  categories: CategoryStats[];
  payment_methods: PaymentMethodStats[];
  daily_totals: DailyTotal[];
}

// Totales diarios
export interface DailyTotal {
  date: string; // formato: YYYY-MM-DD
  total_amount: number;
  expense_count: number;
}

// Estadísticas generales del dashboard
export interface DashboardStats {
  total_expenses: number;
  total_amount: number;
  current_month_amount: number;
  previous_month_amount: number;
  monthly_change_percentage: number;
  most_expensive_category: CategoryStats;
  most_used_payment_method: PaymentMethodStats;
  recent_expenses_count: number;
  average_daily_expense: number;
}