import type { Request, Response } from "express";
import { getAppointmentsBySpecialty } from "../models/report.model.js";

export async function getSpecialtyReport(req: Request, res: Response) {
  /* #swagger.tags = ['Reports']
     #swagger.summary = 'Total de citas agrupadas por especialidad'
     #swagger.security = [{ "bearerAuth": [] }] */
  try {
    const report = await getAppointmentsBySpecialty();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error al generar reporte" });
  }
}
