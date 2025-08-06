import { ExpenseCategory } from '../domains/expenses/types/expense';
import { PaymentMethodType } from '../domains/methodpayment/types/methodpayment';

// Formulario para crear/editar gastos
export interface CreateExpenseForm {
  amount: string; // Como string para el formulario, se convierte a number
  description?: string;
  expense_date: string; // formato: YYYY-MM-DD
  category: ExpenseCategory;
  method_payment_id: string;
  tags?: string[];
  receipt_image?: File;
  location?: string;
  is_recurring?: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface EditExpenseForm extends CreateExpenseForm {
  expense_id: string;
}

// Formulario de filtros
export interface ExpenseFiltersForm {
  date_from?: string;
  date_to?: string;
  categories?: ExpenseCategory[];
  payment_methods?: string[];
  min_amount?: string;
  max_amount?: string;
  search?: string;
}

// Formulario de configuración de categoría personalizada
export interface CreateCategoryForm {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

// Formulario de configuración de método de pago personalizado
export interface CreatePaymentMethodForm {
  name: string;
  type: PaymentMethodType;
  description?: string;
  icon?: string;
  color?: string;
}

// Estados de validación
export interface FormValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}
