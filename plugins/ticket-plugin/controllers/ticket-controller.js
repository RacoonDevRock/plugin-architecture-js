export const ticketController = {
  createTicket: (context) => async (req, res) => {
    try {
      const { title, description, userId } = req.body;

      // Validar datos necesarios
      if (!userId) {
        return res
          .status(400)
          .json({ error: "El campo 'userId' es obligatorio." });
      }

      const ticket = await context.ticketService.createTicket({
        title,
        description,
        userId,
      });
      res.status(201).json({ message: "Ticket creado", ticket });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllTickets: (context) => async (req, res) => {
    try {
      const tickets = await context.ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTicketById: (context) => async (req, res) => {
    try {
      const ticket = await context.ticketService.getTicketById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado." });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTicket: (context) => async (req, res) => {
    try {
      const updatedTicket = await context.ticketService.updateTicket(
        req.params.id,
        req.body
      );
      if (!updatedTicket) {
        return res.status(404).json({ error: "Ticket no encontrado." });
      }
      res.json({ message: "Ticket actualizado", updatedTicket });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTicket: (context) => async (req, res) => {
    try {
      const deleted = await context.ticketService.deleteTicket(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Ticket no encontrado." });
      }
      res.json({ message: "Ticket eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
