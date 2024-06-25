import { Router } from "express";
import { confirmEmail, signup } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", signup);
router.get("/confirmemail/:token", confirmEmail);

export default router;
