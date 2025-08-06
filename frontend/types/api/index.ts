import { ExpenseCategory } from '../domains/expenses/types/expense';

// Tipo para crear gastos en la API (sin expense_id)
export interface CreateExpenseRequest {
  amount: number;
  description?: string;
  expense_date: string;
  category: ExpenseCategory;
  method_payment_id: string;
  tags?: string; // Como string separado por comas para la API
  location?: string;
  is_recurring?: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Tipo para actualizar gastos en la API
export interface UpdateExpenseRequest extends CreateExpenseRequest {
  expense_id: string;
}

// Tipo para filtros de búsqueda en la API
export interface ExpenseFiltersRequest {
  date_from?: string;
  date_to?: string;
  categories?: string; // Categorías separadas por comas
  payment_methods?: string; // IDs separados por comas
  min_amount?: string;
  max_amount?: string;
  search?: string;
}

// Respuesta de endpoints específicos
export interface ExpenseStatsResponse {
  total_count: number;
  total_amount: number;
  average_amount: number;
  categories: Record<string, number>;
  payment_methods: Record<string, number>;
}
