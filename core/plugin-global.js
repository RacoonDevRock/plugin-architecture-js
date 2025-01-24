export function createGlobalContext() {
  const services = {};

  return {
    database: {
      tickets: [], // Base de datos simulada para tickets
      users: [], // Base de datos simulada para usuarios
    },
    registerService(name, service) {
      if (services[name]) {
        throw new Error(`El servicio "${name}" ya está registrado.`);
      }
      services[name] = service;
    },
    getService(name) {
      if (!services[name]) {
        throw new Error(`El servicio "${name}" no está registrado.`);
      }
      return services[name];
    },
  };
}