import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { validatePlugin } from './plugin-contract.js';

export default async function loadPlugins(pluginsPath, pluginConfig, globalContext) {
  const plugins = [];

  function getPluginFolders(basePath) {
    const folders = [];
    const entries = fs.readdirSync(basePath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(basePath, entry.name);
      if (entry.isDirectory()) {
        folders.push(fullPath); // Agrega la carpeta
        folders.push(...getPluginFolders(fullPath)); // Busca recursivamente
      }
    }
    return folders;
  }

  const pluginFolders = getPluginFolders(pluginsPath);

  for (const folder of pluginFolders) {
    const pluginConfigPath = path.join(folder, 'plugin.json');
    const pluginIndexPath = path.join(folder, 'index.js');

    if (fs.existsSync(pluginConfigPath) && fs.existsSync(pluginIndexPath)) {
      const config = JSON.parse(fs.readFileSync(pluginConfigPath, 'utf-8'));
      const module = await import(pathToFileURL(pluginIndexPath).href);

      // Validar el contrato del plugin
      try {
        validatePlugin(module, config);

        // Verificar si está habilitado
        if (pluginConfig.enabledPlugins[config.name]?.enabled) {
          const specificConfig = pluginConfig.enabledPlugins[config.name].config || {};
          const context = globalContext; // Usa el contexto global directamente o crea uno específico
          plugins.push({ ...config, init: module.init, config: specificConfig, context });
        } else {
          console.log(`El plugin "${config.name}" está deshabilitado.`);
        }
      } catch (error) {
        console.error(`Error en el plugin "${config.name}": ${error.message}`);
      }
    }
  }

  return plugins;
}

