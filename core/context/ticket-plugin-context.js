export function createPluginContext(pluginName, globalContext) {
  if (pluginName === "ticket-plugin") {
    return {
      ...globalContext,
      ticketService: {
        createTicket: (data) => {
          console.log(`Creando ticket con datos: ${JSON.stringify(data)}`);
          return { id: Date.now(), ...data }; // Simulación de creación de ticket
        },
      },
    };
  }

  return globalContext;
}
