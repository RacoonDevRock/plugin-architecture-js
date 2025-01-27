import { createTicketService } from "../services/ticket-service.js";

export function createTicketPluginContext(globalContext) {
  const userService = globalContext.getService("userService");
  return {
    ...globalContext,
    ticketService: createTicketService(globalContext, userService), // Aquí se instancia el servicio
  };
}