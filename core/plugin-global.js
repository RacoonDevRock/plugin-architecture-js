export function createGlobalContext() {
  return {
    log: (message) => console.log(`[LOG]: ${message}`),
    database: {
      tickets: [], // Simulación de almacenamiento en memoria para tickets
    },
  };
}
