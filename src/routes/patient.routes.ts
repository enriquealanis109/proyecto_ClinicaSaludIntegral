import { Router } from "express";
import {
  createPatient,
  getPatients,
  getPatientId,
} from "../controllers/patient.controller.js";
import { validatePatient } from "../middlewares/validate.patient.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: Router = Router();

router.post(
  "/patients",
  verifyToken,
  authorize("RECEPTIONIST"),
  validatePatient,
  createPatient,
);
router.get("/patients", verifyToken, authorize("RECEPTIONIST"), getPatients);
router.get(
  "/patients/:id",
  verifyToken,
  authorize("RECEPTIONIST"),
  getPatientId,
);
export default router;
