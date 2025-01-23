import express from "express";
import { ticketController } from "../controllers/ticket-controller.js";

export function ticketRoutes(context) {
  const router = express.Router();

  router.post("/", ticketController.createTicket(context));
  router.get("/", ticketController.getAllTickets(context));
  router.get("/:id", ticketController.getTicketById(context));
  router.put("/:id", ticketController.updateTicket(context));
  router.delete("/:id", ticketController.deleteTicket(context));

  return router;
}
