import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { validatePlugin } from "./plugin-contract.js";

export default async function loadPlugins(pluginsPath, pluginConfig, globalContext) {
  const plugins = [];
  const pluginFolders = fs.readdirSync(pluginsPath);

  for (const folder of pluginFolders) {
    const pluginPath = path.join(pluginsPath, folder);
    const pluginConfigPath = path.join(pluginPath, "plugin.json");
    const pluginIndexPath = path.join(pluginPath, "index.js");

    if (fs.existsSync(pluginConfigPath) && fs.existsSync(pluginIndexPath)) {
      const config = JSON.parse(fs.readFileSync(pluginConfigPath, "utf-8"));
      const module = await import(pathToFileURL(pluginIndexPath).href);

      // Validar el contrato del plug-in
      try {
        validatePlugin(module, config);

        // Verificar si está habilitado en la configuración global
        if (pluginConfig.enabledPlugins[config.name]?.enabled) {
          const specificConfig = pluginConfig.enabledPlugins[config.name].config || {};

          plugins.push({
            ...config,
            init: module.init,
            config: specificConfig,
            context: globalContext, // Pasamos el contexto global directamente
          });
        } else {
          console.log(`El plug-in "${config.name}" está deshabilitado.`);
        }
      } catch (error) {
        console.error(`Error en el plug-in "${folder}": ${error.message}`);
      }
    }
  }

  return plugins;
}
