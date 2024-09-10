import { z } from "zod";

export const createAttachmentSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  url: z.string().url("A URL deve ser válida"),
});

export type CreateAttachmentFormData = z.infer<typeof createAttachmentSchema>;
