import { z } from "zod";

export const expenseSchema = z.object({
  expense_id: z.string().optional(),
  amount: z.number()
    .min(0.01, { message: "El monto debe ser mayor o igual a 0.01" })
    .refine(val => {
      // Validación de decimal con 2 dígitos
      const decimalPart = val.toString().split('.')[1];
      return !decimalPart || decimalPart.length <= 2;
    }, { message: "El monto debe tener máximo 2 decimales" }),
  description: z.string().optional(),
  expense_date: z.
    string({
      required_error: "La fecha es requerida",
      invalid_type_error: "La fecha debe ser una cadena con formato YYYY-MM-DD",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "La fecha no es válida",
    }),
  is_installment: z.boolean({
    required_error: "Debe especificar si es a plazos"
  }).default(false),
  installments_count: z.number()
    .int()
    .min(1)
    .max(100)
    .default(0)
    .optional(),
  bank_account_id: z.string()
    .optional(),
  card_id: z.string()
    .optional(),
  method_payment_id: z.string({
    required_error: "El método de pago es requerido"
  })
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;