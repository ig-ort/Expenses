import { z } from "zod";

export const bankSchema = z.object({
  bank_id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre debe tener al menos 3 caracteres." }),
  code: z.string().min(1, { message: "Nombre corto debe tener al menos 1 carácter." }),
  description: z.string().optional(),
});

export type BankFormValues = z.infer<typeof bankSchema>;