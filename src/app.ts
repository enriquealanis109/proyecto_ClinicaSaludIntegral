import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";
import swaggerRouter from "./routes/swagger.router.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken } from "./middlewares/auth.middleware.js";
import { authorize } from "./middlewares/authorize.middleware.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/docs", swaggerRouter);
app.use("/api/auth", authRoutes);
app.use("/api", patientRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", reportRoutes);
app.get(
  "/api/specialties",
  verifyToken,
  authorize("RECEPTIONIST"),
  async (req, res) => {
    /* #swagger.tags = ['Specialties']
     #swagger.summary = 'Lista todas las especialidades' 
     #swagger.security = [{ "bearerAuth": [] }]*/
    const data = await prisma.specialty.findMany();
    res.json(data);
  },
);

export default app;
