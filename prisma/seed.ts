import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

// Calcula una fecha a partir de hoy: daysFromNow(1, 10) = mañana a las 10:00
function daysFromNow(days: number, hour: number, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main() {
  // 1. Limpiar las tablas (primero las "hijas", luego las "mamás")
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialty.deleteMany();

  // 2. Especialidades
  const pediatria = await prisma.specialty.create({
    data: { name: "Pediatria" },
  });
  const cardiologia = await prisma.specialty.create({
    data: { name: "Cardiologia" },
  });
  const general = await prisma.specialty.create({
    data: { name: "Medicina General" },
  });

  // 3. Usuarios (todos con la contraseña 123456, encriptada)
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: { email: "recepcion@clinica.com", password, role: "RECEPTIONIST" },
  });
  await prisma.user.create({
    data: { email: "gerencia@clinica.com", password, role: "MANAGEMENT" },
  });
  const userGuadalupe = await prisma.user.create({
    data: { email: "guadalupe@clinica.com", password, role: "DOCTOR" },
  });
  const userRoberto = await prisma.user.create({
    data: { email: "roberto@clinica.com", password, role: "DOCTOR" },
  });

  // 4. Médicos (Guadalupe y Roberto vinculados con su cuenta; Irma sin cuenta)
  const guadalupe = await prisma.doctor.create({
    data: {
      name: "Guadalupe Villanueva",
      email: "guadalupe@clinica.com",
      specialtyId: pediatria.id,
      userId: userGuadalupe.id,
    },
  });
  const roberto = await prisma.doctor.create({
    data: {
      name: "Roberto Alanis",
      email: "roberto@clinica.com",
      specialtyId: cardiologia.id,
      userId: userRoberto.id,
    },
  });
  const irma = await prisma.doctor.create({
    data: {
      name: "Irma Padilla",
      email: "irma@clinica.com",
      specialtyId: general.id,
    },
  });

  // 5. Pacientes
  const ana = await prisma.patient.create({
    data: {
      name: "Ana López",
      email: "ana@gmail.com",
      birthDate: new Date("1990-04-12"),
    },
  });
  const carlos = await prisma.patient.create({
    data: {
      name: "Carlos Mendoza",
      email: "carlos@gmail.com",
      birthDate: new Date("1985-09-30"),
    },
  });
  const sofia = await prisma.patient.create({
    data: {
      name: "Sofía Ramírez",
      email: "sofia@gmail.com",
      birthDate: new Date("2015-01-20"),
    },
  });

  // 6. Citas
  await prisma.appointment.createMany({
    data: [
      // Futuras (para la agenda y la regla de 20 minutos)
      {
        patientId: ana.id,
        doctorId: guadalupe.id,
        date: daysFromNow(1, 10),
        description: "Revisión general",
      },
      {
        patientId: sofia.id,
        doctorId: guadalupe.id,
        date: daysFromNow(1, 11),
        description: "Vacunas",
      },
      {
        patientId: carlos.id,
        doctorId: roberto.id,
        date: daysFromNow(2, 9),
        description: "Chequeo del corazón",
      },
      { patientId: ana.id, doctorId: irma.id, date: daysFromNow(3, 12) },
      // De ayer, ya cerradas (para el corte diario)
      {
        patientId: carlos.id,
        doctorId: guadalupe.id,
        date: daysFromNow(-1, 9),
        status: "COMPLETED",
      },
      {
        patientId: sofia.id,
        doctorId: roberto.id,
        date: daysFromNow(-1, 10),
        status: "CANCELED",
      },
    ],
  });

  console.log("✅ Seed terminado");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
