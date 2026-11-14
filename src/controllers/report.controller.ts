import type { Request, Response } from "express";
import {
  getAppointmentsBySpecialty,
  getDailyCutoff,
} from "../models/report.model.js";

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

export async function getDailyCutoffReport(req: Request, res: Response) {
  /* #swagger.tags = ['Reports']
     #swagger.summary = 'Citas completadas y canceladas en un día'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['date'] = {
       in: 'query',
       description: 'Día del corte, por ejemplo: 2026-11-20',
       required: true,
       type: 'string'
     } */
  try {
    const report = await getDailyCutoff(String(req.query.date));
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error al generar el corte diario" });
  }
}
