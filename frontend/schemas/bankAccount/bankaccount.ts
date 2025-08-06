import { z } from "zod";

export const bankAccountSchema = z.object({
  bank_account_id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre debe tener al menos 3 caracteres." }),
  code: z.string().min(1, { message: "Nombre corto debe tener al menos 1 carácter." }),
  clabe: z.string().optional(),
  account_number: z.string().optional(),
  description: z.string().optional(),
  bank_id: z.string(),
});

export type BankAccountFormValues = z.infer<typeof bankAccountSchema>;