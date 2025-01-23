import { createTicketPluginContext } from "./context/ticket-plugin-context.js";
import { ticketRoutes } from "./routes/ticket-routes.js";

export function init(app, config, context) {
  context.log("Iniciando Ticket Plugin");

  // Crear el contexto específico para el plug-in
  const pluginContext = createTicketPluginContext(context);

  // Registrar rutas con el contexto
  app.use("/tickets", ticketRoutes(pluginContext));
}
