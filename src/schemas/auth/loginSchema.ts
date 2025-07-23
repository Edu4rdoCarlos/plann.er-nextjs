import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email deve ter um formato válido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
});

export const codeSchema = z.object({
  code: z
    .string()
    .min(1, "Código é obrigatório")
    .length(6, "Código deve ter exatamente 6 dígitos")
    .regex(/^\d{6}$/, "Código deve conter apenas números"),
});

export const loginSchema = emailSchema.merge(codeSchema);

export type EmailFormData = z.infer<typeof emailSchema>;
export type CodeFormData = z.infer<typeof codeSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
