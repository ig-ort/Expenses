import * as z from "zod";

export const clientProjectNoteSchema = z.object({
  client_project_note_id: z.string().optional(),
  content: z.string().min(1, "El contenido es requerido"),
  // Una nota puede estar asociada a un proyecto o a un cliente, pero no a ambos
  project_id: z.string().nullable().optional(),
  client_id: z.string().nullable().optional(),
  parent_note_id: z.string().nullable().optional(),
  // Validación personalizada para asegurar que al menos uno de los campos esté presente y no sea null
}).refine(
  (data) => {
    const hasProject = data.project_id && data.project_id !== null;
    const hasClient = data.client_id && data.client_id !== null;  
    const hasParent = data.parent_note_id && data.parent_note_id !== null;
    return hasProject || hasClient || hasParent;
  },
  {
    message: "Debe seleccionar un proyecto, un cliente o una nota padre",
    path: ["association"], // Campo personalizado para el error
  }
);

export type NoteFormValues = z.infer<typeof clientProjectNoteSchema>;
