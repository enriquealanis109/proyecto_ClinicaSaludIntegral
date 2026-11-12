import type { Request, Response } from "express";
import {
  createAppointment as createAppointmentInBd,
  findOverlappingAppointment,
} from "../models/appointment.model.js";
import { getPatientById } from "../models/patient.model.js";
import { getDoctorById } from "../models/doctor.model.js";

export async function createAppointment(req: Request, res: Response) {
  /* #swagger.tags = ['Appointments']
      #swagger.summary = 'Agenda una cita nueva'
      #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         patientId: 1,
         doctorId: 1,
         date: '2026-11-20T10:00:00',
         description: 'Dolor de cabeza'
       }
     } */
  try {
    const { patientId, doctorId, date } = req.body;

    const patient = await getPatientById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
    const doctor = await getDoctorById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
    const overlapping = await findOverlappingAppointment(doctorId, date);
    if (overlapping) {
      return res
        .status(409)
        .json({ error: "El médico ya tiene una cita en ese horario" });
    }
    const appointment = await createAppointmentInBd(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita" });
  }
}
