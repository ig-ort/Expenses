import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';
import { ExpenseCategory } from '@/types/domains/categories/types/category';

// Re-export ExpenseCategory for convenience
export { ExpenseCategory };

// Tipo principal para gastos personales
export interface Expense extends BaseEntity {
  expense_id: string;
  amount: number;
  description?: string;
  expense_date: string; // formato: YYYY-MM-DD
  category: ExpenseCategory;
  category_id?: string; // Si usamos categorías dinámicas
  method_payment_id: string;
  method_payment_name?: string; // Para mostrar el nombre del método
  // Campos opcionales para funcionalidad avanzada
  is_recurring?: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tags?: string[];
  receipt_image?: string;
  location?: string;
}

// DTOs para crear y actualizar
export interface CreateExpenseDto {
  amount: number;
  description?: string;
  expense_date: string;
  category: ExpenseCategory;
  method_payment_id: string;
  tags?: string[];
  location?: string;
  is_recurring?: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}


// Solo declaraciones de tipo
export type ExpenseResponse = ApiResponseData<Expense>;
export type ExpenseListResponse = ApiResponsePaginatedData<Expense[]>;