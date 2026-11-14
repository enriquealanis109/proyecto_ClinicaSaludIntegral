import { Router } from "express";
import {
  getSpecialtyReport,
  getDailyCutoffReport,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateDailyCutoff } from "../middlewares/validate.report.js";

const router: Router = Router();

router.get(
  "/reports/appointments-by-specialty",
  verifyToken,
  authorize("MANAGEMENT"),
  getSpecialtyReport,
);
router.get(
  "/reports/daily-cutoff",
  verifyToken,
  authorize("MANAGEMENT"),
  validateDailyCutoff,
  getDailyCutoffReport,
);

export default router;
