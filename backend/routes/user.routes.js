import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

// route- http://localhost:8002/api/v1/user/register
router.route("/register").post(registerUser);

// route- http://localhost:8002/api/v1/user/login
router.route("/login").post(loginUser);

//secured routes
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;