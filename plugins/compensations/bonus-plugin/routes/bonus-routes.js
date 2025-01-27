import express from "express";
import { authenticateToken } from "../../../../core/middleware/authenticateToken.js";
import { bonusController } from "../controllers/bonus-controller.js";

export function bonusRoutes(context) {
    const router = express.Router();

    router.post("/", bonusController.calculateBonus(context));
    router.get("/weights", bonusController.getWeights(context));
    router.post("/weights", authenticateToken, bonusController.setWeights(context));

    return router;
}
