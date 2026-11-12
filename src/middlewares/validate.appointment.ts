import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const appointmentSchema = z.object({
  patientId: z
    .number()
    .int()
    .positive("El patientId debe ser un numero positivo"),
  doctorId: z
    .number()
    .int()
    .positive("El doctorId debe ser un numero positivo"),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "La fecha de la cita no puede estar en el pasado",
  }),
  description: z.string().trim().optional(),
});

export const validateAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = appointmentSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Datos invalidos" });
    return;
  }
  req.body = result.data;
  next();
};

export const appointmentStatusSchema = z.object({
  status: z.enum(["COMPLETED", "CANCELED"]),
});

export const validateAppointmentStatus = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = appointmentStatusSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Estado invalido" });
    return;
  }
  req.body = result.data;
  next();
};

export type AppointmentInput = z.infer<typeof appointmentSchema>;
