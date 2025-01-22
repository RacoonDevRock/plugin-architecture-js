import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export default async function loadPlugins(pluginsPath) {
  const plugins = [];
  const pluginFolders = fs.readdirSync(pluginsPath);

  for (const folder of pluginFolders) {
    const pluginPath = path.join(pluginsPath, folder);
    const pluginConfigPath = path.join(pluginPath, "plugin.json");
    const pluginIndexPath = path.join(pluginPath, "index.js");

    if (fs.existsSync(pluginConfigPath) && fs.existsSync(pluginIndexPath)) {
      const config = JSON.parse(fs.readFileSync(pluginConfigPath, "utf-8"));
      const module = await import(pathToFileURL(pluginIndexPath).href);

      if (typeof module.init === "function") {
        plugins.push({ ...config, init: module.init });
      } else {
        console.warn(`El plug-in en ${folder} no tiene un método init.`);
      }
    }
  }

  return plugins;
}
