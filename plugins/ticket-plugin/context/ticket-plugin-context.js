import { createTicketService } from "../services/ticket-service.js";

export function createTicketPluginContext(globalContext) {
  return {
    ...globalContext,
    ticketService: createTicketService(globalContext), // Aquí se instancia el servicio
  };
}
