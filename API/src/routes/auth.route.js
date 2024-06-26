import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
// import { confirmEmail } from "../controllers/auth.controller.js";
import { validation, signUp } from "../middlewares/validation.js";
const router = Router();

router.post("/signup", validation(signUp), signup);
// router.get("/confirmemail/:token", confirmEmail);

export default router;
