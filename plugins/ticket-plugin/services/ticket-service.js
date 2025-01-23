import { Ticket } from "../models/ticket.js";

export function createTicketService(context) {
  const ticketsDB = context.database.tickets; // Array simulado en memoria

  return {
    async createTicket(data) {
      // Crear un nuevo objeto Ticket
      const newTicket = new Ticket(data);
      ticketsDB.push({ id: Date.now(), ...newTicket }); // Generar ID único basado en tiempo
      return newTicket;
    },

    async getAllTickets() {
      return ticketsDB; // Devuelve todos los tickets
    },

    async getTicketById(id) {
      const ticket = ticketsDB.find((t) => t.id === id);
      return ticket || null; // Devuelve el ticket o null si no existe
    },

    async updateTicket(id, data) {
      const ticketIndex = ticketsDB.findIndex((t) => t.id === id);

      if (ticketIndex === -1) {
        return null; // Si no se encuentra, retorna null
      }

      const existingTicket = ticketsDB[ticketIndex];

      // Validar el estado si se está actualizando
      if (data.status) {
        Ticket.validateStatus(data.status);
      }

      // Actualizar el ticket existente
      const updatedTicket = {
        ...existingTicket,
        ...data,
        updated_at: new Date(),
      };

      ticketsDB[ticketIndex] = updatedTicket;
      return updatedTicket;
    },

    async deleteTicket(id) {
      const ticketIndex = ticketsDB.findIndex((t) => t.id === id);

      if (ticketIndex === -1) {
        return false; // Si no se encuentra, retorna false
      }

      ticketsDB.splice(ticketIndex, 1); // Elimina el ticket
      return true;
    },
  };
}
