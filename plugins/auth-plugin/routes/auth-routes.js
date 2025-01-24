import express from "express";
import { authController } from "../controllers/auth-controller.js";

export function authRoutes(context) {
  const router = express.Router();

  router.post("/register", authController.registerUser(context));
  router.post("/login", authController.loginUser(context));

  return router;
}
