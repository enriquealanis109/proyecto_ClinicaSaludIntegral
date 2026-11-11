import { Router } from "express";
import { getDoctors } from "../controllers/doctor.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: Router = Router();

router.get("/doctors", verifyToken, authorize("RECEPTIONIST"), getDoctors);

export default router;
