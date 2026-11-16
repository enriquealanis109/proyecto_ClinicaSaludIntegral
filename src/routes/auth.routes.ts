import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post("/register", verifyToken, authorize("MANAGEMENT"), register);
router.post("/login", login);

export default router;
