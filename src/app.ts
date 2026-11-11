import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";
import swaggerRouter from "./routes/swagger.router.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/docs", swaggerRouter);
app.use("/api", patientRoutes);
app.use("/api", doctorRoutes);

app.get("/api/specialties", async (req, res) => {
  /* #swagger.tags = ['Specialties']
     #swagger.summary = 'Lista todas las especialidades' */
  const data = await prisma.specialty.findMany();
  res.json(data);
});

export default app;
