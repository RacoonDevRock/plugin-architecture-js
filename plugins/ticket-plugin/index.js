export function init(app) {
  let tickets = [];

  app.post("/tickets", (req, res) => {
    const { title, description } = req.body;
    const ticket = { id: tickets.length + 1, title, description };
    tickets.push(ticket);
    res.json({ message: "Ticket creado", ticket });
  });

  app.get("/tickets", (req, res) => {
    res.json(tickets);
  });
}
