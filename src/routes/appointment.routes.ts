import { Router } from "express";
import {
  createAppointment,
  getDoctorAppointment,
  changeAppointmentStatus,
} from "../controllers/appointment.controller.js";
import {
  validateAppointment,
  validateAppointmentStatus,
} from "../middlewares/validate.appointment.js";
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
router.patch(
  "/appointments/:id/status",
  verifyToken,
  authorize("DOCTOR"),
  validateAppointmentStatus,
  changeAppointmentStatus,
);

export default router;
