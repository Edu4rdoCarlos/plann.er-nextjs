import { z } from "zod";

export const confirmTripSchema = z.object({
  name: z.string().min(1, "O nome completo é obrigatório."),
  email: z.string().email("O e-mail deve ser válido."),
});

export type ConfirmTripFormData = z.infer<typeof confirmTripSchema>;
