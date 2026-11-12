import { Router } from "express";
import { getSpecialtyReport } from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: Router = Router();

router.get(
  "/reports/appointments-by-specialty",
  verifyToken,
  authorize("MANAGEMENT"),
  getSpecialtyReport,
);

export default router;
