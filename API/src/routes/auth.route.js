import { Router } from "express";
import { signIn, signup, google } from "../controllers/auth.controller.js";


const router = Router();

router.post("/signup", signup);
// router.get("/confirmemail/:token", confirmEmail);
router.post("/signin", signIn);
router.post("/google", google);

export default router;
  