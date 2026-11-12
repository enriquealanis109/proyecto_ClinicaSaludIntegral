import prisma from "../config/prisma.js";
import type { AppointmentInput } from "../middlewares/validate.appointment.js";

export async function createAppointment(data: AppointmentInput) {
  return prisma.appointment.create({
    data,
    include: { patient: true, doctor: true },
  });
}

export async function findOverlappingAppointment(doctorId: number, date: Date) {
  //copia la hora de la cita -20
  const start = new Date(date);
  start.setMinutes(start.getMinutes() - 20);
  //copia la hora de la cita +20
  const end = new Date(date);
  end.setMinutes(end.getMinutes() + 20);

  return prisma.appointment.findFirst({
    where: {
      doctorId,
      status: { not: "CANCELED" },
      date: { gt: start, lt: end },
    },
  });
}

export async function getDoctorAgenda(
  doctorId: number,
  from?: Date,
  to?: Date,
) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      date: { gte: from, lte: to },
    },
    include: { patient: true },
    orderBy: { date: "asc" },
  });
}
