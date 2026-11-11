import type { Request, Response } from "express";
import { getAllDoctors } from "../models/doctor.model.js";

export async function getDoctors(req: Request, res: Response) {
  const specialty =
    typeof req.query.specialty === "string" ? req.query.specialty : undefined;
  try {
    const doctors = await getAllDoctors(specialty);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener médicos" });
  }
}
