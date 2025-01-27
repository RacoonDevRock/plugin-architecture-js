import express from "express";
import { authenticateToken } from "../../../core/middleware/authenticateToken.js";
import { ticketController } from "../controllers/ticket-controller.js";

export function ticketRoutes(context) {
  const router = express.Router();

  router.post("/", authenticateToken, ticketController.createTicket(context));
  router.get("/", authenticateToken, ticketController.getAllTickets(context));
  router.get("/:id", authenticateToken, ticketController.getTicketById(context));
  router.put("/:id", authenticateToken, ticketController.updateTicket(context));
  router.delete("/:id", authenticateToken, ticketController.deleteTicket(context));

  return router;
}
