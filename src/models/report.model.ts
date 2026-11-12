import prisma from "../config/prisma.js";

export function getAppointmentsBySpecialty() {
  return prisma.$queryRaw`SELECT s.name AS specialty, COUNT(a.id)::int AS total_appointments
    FROM appointments a 
    INNER JOIN doctors d ON d.id = a.doctor_id
    INNER JOIN specialties s ON s.id = d.specialty_id
    GROUP BY s.name
    ORDER BY total_appointments DESC`;
}
