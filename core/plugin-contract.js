export function validatePlugin(plugin, config) {
  const requiredMethods = ["init"]; // Métodos que deben existir en el plug-in
  const requiredProperties = ["name", "version", "description"]; // Propiedades requeridas en plugin.json

  // Validar métodos
  for (const method of requiredMethods) {
    if (typeof plugin[method] !== "function") {
      throw new Error(
        `El plug-in "${config.name}" no implementa el método requerido: ${method}`
      );
    }
  }

  // Validar propiedades
  for (const property of requiredProperties) {
    if (!config[property]) {
      throw new Error(
        `El archivo plugin.json del plug-in no contiene la propiedad requerida: ${property}`
      );
    }
  }
}
