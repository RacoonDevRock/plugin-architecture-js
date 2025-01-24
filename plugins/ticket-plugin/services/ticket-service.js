export function createTicketService(context, userService) {
  const ticketsDB = context.database.tickets;

  return {
    async createTicket(data) {
      if (!userService) {
        throw new Error("El servicio de usuario no está disponible.");
      }

      const user = await userService.getUserById(data.userId);
      if (!user) {
        throw new Error(`Usuario con ID ${data.userId} no encontrado.`);
      }

      const ticket = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        userId: data.userId,
        status: "open",
        created_at: new Date(),
      };

      ticketsDB.push(ticket);
      return ticket;
    },

    async getAllTickets() {
      return ticketsDB;
    },

    async getTicketById(id) {
      return ticketsDB.find((t) => t.id === id) || null;
    },

    async updateTicket(id, data) {
      const ticketIndex = ticketsDB.findIndex((t) => t.id === id);

      if (ticketIndex === -1) {
        return null;
      }

      const existingTicket = ticketsDB[ticketIndex];

      if (data.status) {
        Ticket.validateStatus(data.status);
      }

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
        return false;
      }

      ticketsDB.splice(ticketIndex, 1);
      return true;
    },
  };
}
