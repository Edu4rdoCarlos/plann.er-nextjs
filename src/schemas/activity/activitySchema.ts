import { z } from "zod";

export const createActivitySchema = z.object({
  activityName: z.string().nonempty("O nome da atividade é obrigatório."),
  activityDate: z.date(),
  activityTime: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Horário inválido."),
});

export type CreateActivityFormData = z.infer<typeof createActivitySchema>;
