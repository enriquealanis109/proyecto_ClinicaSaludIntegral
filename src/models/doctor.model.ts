import prisma from "../config/prisma.js";

export async function getAllDoctors(specialtyName?: string) {
  return prisma.doctor.findMany({
    where: specialtyName
      ? { specialty: { name: { equals: specialtyName, mode: "insensitive" } } }
      : undefined,
    include: { specialty: true },
  });
}
export async function getDoctorById(id: number) {
  return prisma.doctor.findUnique({ where: { id } });
}
