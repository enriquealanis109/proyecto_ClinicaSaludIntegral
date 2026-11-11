import { Router } from "express";
import {
  createPatient,
  getPatients,
  getPatientId,
} from "../controllers/patient.controller.js";
import { validatePatient } from "../middlewares/validate-patient.js";

const router: Router = Router();

router.post("/patients", validatePatient, createPatient);
router.get("/patients", getPatients);
router.get("/patients/:id", getPatientId);

export default router;
