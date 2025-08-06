import { z } from "zod";

export const cardSchema = z.object({
  card_id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre debe tener al menos 3 caracteres." }),
  last_four_digits: z.string(),
  expiration_date: z.string().optional(),
  credit_limit: z.string().optional(),
  cutoff_day: z.string().optional(),
  payment_day: z.string().optional(),
  payment_due_days: z.string().optional(),
  bank_account_id: z.string(),
  card_type_id: z.string(),
});

export type CardFormValues = z.infer<typeof cardSchema>;