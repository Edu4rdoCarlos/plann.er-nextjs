import { z } from "zod";

export const InviteMembersSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("O e-mail deve ser válido"),
});

export type InviteMembersFormData = z.infer<typeof InviteMembersSchema>;
