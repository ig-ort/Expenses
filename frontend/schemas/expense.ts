import * as z from "zod";
import { ExpenseCategory } from "@/types/domains/expenses/types/expense";

export const expenseSchema = z.object({
  amount: z.string().min(1, "El monto es requerido"),
  description: z.string().optional(),
  expense_date: z.string().min(1, "La fecha es requerida"),
  category: z.nativeEnum(ExpenseCategory),
  method_payment_id: z.string().min(1, "El método de pago es requerido"),
  tags: z.array(z.string()).optional(),
  location: z.string().optional(),
  is_recurring: z.boolean().default(false),
  recurring_frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  // Campos adicionales requeridos por la API de Laravel
  is_installment: z.boolean().default(false),
  installments_count: z.number().min(1).max(100).optional(),
  bank_account_id: z.string().optional(),
  card_id: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
