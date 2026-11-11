import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z.string().trim().email("El correo no tiene formato valido"),
  birthDate: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura"),
  phone: z.string().optional(),
});

export function validatePatient(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = patientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos invalidos",
    });
    return;
  }
  req.body = result.data;
  next();
}

export type PatientInput = z.infer<typeof patientSchema>;
