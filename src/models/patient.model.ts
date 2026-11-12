import prisma from "../config/prisma.js";
import type { PatientInput } from "../middlewares/validate.patient.js";

export async function createPatient(data: PatientInput) {
  return prisma.patient.create({ data });
}

export async function getAllPatients() {
  return prisma.patient.findMany();
}

export async function getPatientById(id: number) {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        include: { doctor: { include: { specialty: true } } },
        orderBy: { date: "desc" },
      },
    },
  });
}
