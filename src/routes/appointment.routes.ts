import { Router } from "express";
import {
  createAppointment,
  getDoctorAppointment,
} from "../controllers/appointment.controller.js";
import { validateAppointment } from "../middlewares/validate.appointment.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: Router = Router();

router.post(
  "/appointments",
  verifyToken,
  authorize("RECEPTIONIST"),
  validateAppointment,
  createAppointment,
);
router.get(
  "/doctors/:id/appointments",
  verifyToken,
  authorize("DOCTOR"),
  getDoctorAppointment,
);

export default router;
