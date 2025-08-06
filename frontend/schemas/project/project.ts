import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  start_date: z.date({ required_error: "La fecha de inicio es requerida" }),
  end_date: z.date().optional(),
  client_id: z.string().min(1, "El cliente es requerido"),
  project_status_id: z.string().min(1, "El estado del proyecto es requerido"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
