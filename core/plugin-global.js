export function createGlobalContext() {
  return {
    log: (message) => console.log(`[LOG]: ${message}`), // Servicio de logs
    database: {
      query: async (sql) => {
        console.log(`[DB]: Ejecutando SQL: ${sql}`);
        return []; // Simulación de consulta
      },
    },
    userService: {
      getUserById: (id) => ({ id, username: "mockUser" }), // Simulación de un servicio de usuarios
    },
  };
}
