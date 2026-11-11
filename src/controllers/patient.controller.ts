import type { Request, Response } from "express";
import {
  createPatient as createPatientInDb,
  getAllPatients,
  getPatientById,
} from "../models/patient.model.js";

export async function createPatient(req: Request, res: Response) {
  try {
    const patient = await createPatientInDb(req.body);
    res.status(201).json(patient);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El correo ya esta registrado" });
    }
    res.status(500).json({ error: "Error al crear paciente" });
  }
}

export async function getPatients(req: Request, res: Response) {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
}

export async function getPatientId(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "El id debe ser un número" });
  }
  try {
    const patient = await getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el paciente" });
  }
}
